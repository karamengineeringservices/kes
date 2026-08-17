"use client";

import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { Canvas, extend, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Frigate } from "./frigate";

// Register Water so it can be used as a JSX element
extend({ Water });

/**
 * Ocean — a large water plane using Three.js's classic Water shader with
 * a distortion normal map for realistic surface animation and reflections.
 */
function Ocean() {
  const ref = useRef<any>(null);
  const { scene } = useThree();
  // Load the classic waternormals texture bundled with Three.js
  const waterNormals = useLoader(THREE.TextureLoader, "/waternormals.jpg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  const geom = useMemo(() => new THREE.PlaneGeometry(4000, 4000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(0.3, 0.6, 0.5),
      sunColor: 0xffe6c4,
      waterColor: 0x0a1a2e,
      distortionScale: 3.2,
      fog: scene.fog !== undefined
    }),
    [scene.fog, waterNormals]
  );

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.material.uniforms["time"].value += delta * 0.6;
    }
  });

  // @ts-expect-error - three.js Water is registered via extend()
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} position={[0, 0, 0]} />;
}

/**
 * Camera keyframes for scroll-driven cinematic. positions & lookAts in world space.
 * Ship sits at origin. Path: wide → close bow → side 3q → aerial follow → wide.
 */
const keyframes = [
  {
    pos: new THREE.Vector3(180, 60, 220),
    look: new THREE.Vector3(0, 12, 0)
  },
  {
    pos: new THREE.Vector3(140, 20, 90),
    look: new THREE.Vector3(20, 15, 0)
  },
  {
    pos: new THREE.Vector3(110, 25, -130),
    look: new THREE.Vector3(-10, 12, 0)
  },
  {
    pos: new THREE.Vector3(-160, 90, 60),
    look: new THREE.Vector3(-20, 5, 0)
  },
  {
    pos: new THREE.Vector3(220, 70, 260),
    look: new THREE.Vector3(0, 10, 0)
  }
];

function CameraRig({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const smoothedProg = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY.current = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    // Smooth toward scroll target
    smoothedProg.current += (scrollRef.current - smoothedProg.current) * 0.08;
    const p = smoothedProg.current;

    // Segment interpolation
    const segCount = keyframes.length - 1;
    const seg = Math.min(segCount - 1, Math.floor(p * segCount));
    const localT = Math.max(0, Math.min(1, p * segCount - seg));
    // Smoothstep for eased transitions between keyframes
    const t = localT * localT * (3 - 2 * localT);

    const a = keyframes[seg];
    const b = keyframes[seg + 1];

    const posTarget = new THREE.Vector3().lerpVectors(a.pos, b.pos, t);
    const lookTarget = new THREE.Vector3().lerpVectors(a.look, b.look, t);

    // Subtle mouse parallax on top
    posTarget.x += mouseX.current * 3;
    posTarget.y += mouseY.current * 2;

    camera.position.lerp(posTarget, 0.12);
    camera.lookAt(lookTarget);
  });
  return null;
}

function SceneContents({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      {/* Ambient + hemisphere for base fill */}
      <hemisphereLight args={["#a9c4d8", "#2a2f3a", 0.55]} />
      {/* Sun */}
      <directionalLight
        position={[80, 120, 60]}
        intensity={2.4}
        color="#fff2d8"
        castShadow={false}
      />
      {/* Cool fill from behind for rim */}
      <directionalLight position={[-60, 40, -80]} intensity={0.5} color="#5c7fa0" />

      {/* Sky — blue-hour maritime */}
      <Sky
        distance={45000}
        sunPosition={[80, 25, 60]}
        inclination={0.49}
        azimuth={0.25}
        turbidity={4}
        rayleigh={2.5}
        mieCoefficient={0.006}
        mieDirectionalG={0.7}
      />

      {/* Ocean water */}
      <Ocean />

      {/* Fog for atmospheric perspective */}
      <fog attach="fog" args={["#8ea8c2", 260, 720]} />

      {/* The frigate — origin */}
      <Frigate position={[0, 3.5, 0]} />

      {/* Camera scroll rig */}
      <CameraRig scrollRef={scrollRef} />
    </>
  );
}

/**
 * OceanScene — root component. Renders full-viewport Canvas with cinematic ocean scene.
 * scrollProgress prop is 0..1 controlling camera keyframe interpolation.
 */
export function OceanScene({ scrollProgress }: { scrollProgress: number }) {
  // Use a ref so we don't rerender the Canvas on every scroll tick.
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [180, 60, 220], fov: 40, near: 0.5, far: 5000 }}
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.9,
        powerPreference: "high-performance"
      }}
    >
      <SceneContents scrollRef={scrollRef} />
    </Canvas>
  );
}
