'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_scroll;
  varying vec2 vUv;

  // Simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_resolution.x / u_resolution.y;

    float t = u_time * 0.08;
    float scroll = u_scroll * 0.001;

    // Mouse influence — smooth radial warp
    vec2 mouse = u_mouse * 2.0 - 1.0;
    mouse.x *= u_resolution.x / u_resolution.y;
    float mouseDist = length(p - mouse);
    float mouseWarp = exp(-mouseDist * mouseDist * 2.0) * 0.15;

    // Domain warping for liquid feel
    vec2 q = vec2(fbm(p + t * 0.4), fbm(p + vec2(5.2, 1.3) + t * 0.3));
    vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.15),
                  fbm(p + 4.0 * q + vec2(8.3, 2.8) + t * 0.12));
    float f = fbm(p + 3.5 * r + scroll);

    // Color palette — deep luxury
    vec3 color = vec3(0.02, 0.02, 0.04); // base
    color = mix(color, vec3(0.04, 0.02, 0.08), clamp(f * f * 2.0, 0.0, 1.0));
    color = mix(color, vec3(0.02, 0.04, 0.12), clamp(length(q) * 0.5, 0.0, 1.0));
    color = mix(color, vec3(0.06, 0.03, 0.14), clamp(length(r.x), 0.0, 1.0));

    // Glass caustic highlights
    float caustic = smoothstep(0.3, 0.8, snoise(p * 3.0 + t * 0.5 + f * 2.0));
    color += vec3(0.15, 0.12, 0.35) * caustic * 0.12;

    // Chromatic veins
    float vein = smoothstep(0.45, 0.5, snoise(p * 5.0 + r * 3.0 + t * 0.2));
    color += vec3(0.388, 0.4, 0.945) * vein * 0.04;

    // Cyan accent veins
    float vein2 = smoothstep(0.5, 0.55, snoise(p * 4.0 - q * 2.0 + t * 0.25));
    color += vec3(0.024, 0.714, 0.831) * vein2 * 0.03;

    // Mouse glow — glass refraction
    float glow = exp(-mouseDist * mouseDist * 3.0) * 0.12;
    color += vec3(0.39, 0.36, 0.96) * glow;
    color += vec3(0.6, 0.4, 1.0) * mouseWarp * 0.3;

    // Subtle highlight shimmer
    float shimmer = snoise(p * 8.0 + t * 2.0) * 0.5 + 0.5;
    color += vec3(0.08, 0.06, 0.15) * shimmer * caustic * 0.08;

    // Vignette
    float vig = 1.0 - pow(length(uv - 0.5) * 1.2, 2.0);
    color *= max(vig, 0.3);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function GlassPlane() {
    const meshRef = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();

    const uniforms = useMemo(() => ({
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_scroll: { value: 0 },
    }), []);

    useFrame(({ clock }) => {
        uniforms.u_time.value = clock.getElapsedTime();
        uniforms.u_resolution.value.set(window.innerWidth * viewport.dpr, window.innerHeight * viewport.dpr);
    });

    // Mouse tracking
    useMemo(() => {
        if (typeof window === 'undefined') return;
        const handler = (e: MouseEvent) => {
            uniforms.u_mouse.value.set(
                e.clientX / window.innerWidth,
                1.0 - e.clientY / window.innerHeight
            );
        };
        const scrollHandler = () => {
            uniforms.u_scroll.value = window.scrollY;
        };
        window.addEventListener('mousemove', handler);
        window.addEventListener('scroll', scrollHandler);
        return () => {
            window.removeEventListener('mousemove', handler);
            window.removeEventListener('scroll', scrollHandler);
        };
    }, [uniforms]);

    return (
        <mesh ref={meshRef} frustumCulled={false}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                depthWrite={false}
                depthTest={false}
            />
        </mesh>
    );
}

export default function GlassBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 1] }}
                gl={{ alpha: false, antialias: false, powerPreference: 'high-performance' }}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            >
                <GlassPlane />
            </Canvas>
        </div>
    );
}
