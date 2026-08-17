"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * Procedural frigate — modern patrol / naval vessel.
 * Length ~120 units on the x-axis. Deliberately stylised realism (clean
 * primitives + PBR materials); not a photoreal model, but sits convincingly
 * in a maritime scene.
 */
export function Frigate({
  position = [0, 0, 0] as [number, number, number]
}: {
  position?: [number, number, number];
}) {
  const group = useRef<THREE.Group | null>(null);

  // Materials — created once
  const materials = useMemo(() => {
    const hull = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#7a8390"),
      metalness: 0.35,
      roughness: 0.55
    });
    const hullDark = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#3a4250"),
      metalness: 0.4,
      roughness: 0.5
    });
    const deck = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#4a5261"),
      metalness: 0.25,
      roughness: 0.7
    });
    const superstructure = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#c9ccd0"),
      metalness: 0.3,
      roughness: 0.55
    });
    const waterlineRed = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#8f1f22"),
      metalness: 0.3,
      roughness: 0.6
    });
    const bridgeGlass = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0e1a2c"),
      metalness: 0.8,
      roughness: 0.15
    });
    const detail = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#5a6371"),
      metalness: 0.5,
      roughness: 0.4
    });
    const accent = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#c42127"),
      emissive: new THREE.Color("#c42127"),
      emissiveIntensity: 0.4,
      metalness: 0.2,
      roughness: 0.6
    });
    return {
      hull,
      hullDark,
      deck,
      superstructure,
      waterlineRed,
      bridgeGlass,
      detail,
      accent
    };
  }, []);

  // Hull geometry — extruded curved shape
  const hullGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Side profile: bow at right (+x)
    shape.moveTo(-55, -6); // stern lower
    shape.lineTo(-55, 8); // stern upper
    shape.lineTo(-20, 10); // deck
    shape.lineTo(45, 10); // deck forward
    shape.quadraticCurveTo(60, 9, 62, 4); // bow curve top
    shape.quadraticCurveTo(63, -2, 58, -6); // bow curve bottom
    shape.lineTo(-55, -6); // back to stern

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 16,
      bevelEnabled: true,
      bevelThickness: 1.8,
      bevelSize: 1.5,
      bevelOffset: 0,
      bevelSegments: 4,
      steps: 1,
      curveSegments: 24
    };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Center on z so hull sits centered on origin, and taper (narrow the bow horizontally)
    geo.translate(0, 0, -8);
    // Manual bow taper: pinch vertices near the bow (+x) on z axis
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // taper factor: from 1 at x<20 down to 0.4 at x=62
      let taper = 1;
      if (x > 20) {
        const t = Math.min(1, (x - 20) / 42);
        taper = 1 - t * 0.6;
      }
      // slight stern taper too
      if (x < -35) {
        const t = Math.min(1, (-x - 35) / 20);
        taper = 1 - t * 0.15;
      }
      pos.setZ(i, z * taper);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Waterline stripe — thin extruded band that matches hull footprint
  const waterlineGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-55, -6);
    shape.lineTo(-55, -4);
    shape.lineTo(45, -4);
    shape.quadraticCurveTo(60, -4.5, 62, -6);
    shape.lineTo(58, -6);
    shape.quadraticCurveTo(63, -5, 45, -6);
    shape.lineTo(-55, -6);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 16.4,
      bevelEnabled: false,
      steps: 1,
      curveSegments: 24
    });
    geo.translate(0, 0, -8.2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      let taper = 1;
      if (x > 20) {
        const t = Math.min(1, (x - 20) / 42);
        taper = 1 - t * 0.6;
      }
      pos.setZ(i, z * taper);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Gentle continuous motion: pitch/roll/heave/yaw and slow forward drift
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.z = Math.sin(t * 0.35) * 0.02; // roll
    group.current.rotation.x = Math.sin(t * 0.5 + 1) * 0.012; // pitch
    group.current.rotation.y = Math.sin(t * 0.15) * 0.02; // gentle yaw
    group.current.position.y = position[1] + Math.sin(t * 0.7) * 0.15; // heave
  });

  return (
    <group ref={group} position={position} rotation={[0, -Math.PI / 2, 0]}>
      {/* --- HULL --- */}
      <mesh geometry={hullGeometry} material={materials.hull} castShadow receiveShadow />

      {/* Waterline red stripe */}
      <mesh geometry={waterlineGeo} material={materials.waterlineRed} />

      {/* Bottom hull (below waterline red) — slightly darker */}
      <mesh position={[0, -8, 0]}>
        <boxGeometry args={[110, 4, 12]} />
        <meshStandardMaterial color="#2a2f3a" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* --- DECK (flat plate on top of hull) --- */}
      <mesh position={[-3, 10.5, 0]} material={materials.deck}>
        <boxGeometry args={[100, 0.5, 15.2]} />
      </mesh>

      {/* --- MAIN SUPERSTRUCTURE (bridge tower forward-of-center) --- */}
      <group position={[8, 11, 0]}>
        {/* Base block */}
        <mesh material={materials.superstructure} castShadow>
          <boxGeometry args={[24, 6, 13]} />
        </mesh>
        {/* Second tier */}
        <mesh position={[-2, 5, 0]} material={materials.superstructure} castShadow>
          <boxGeometry args={[18, 4, 11]} />
        </mesh>
        {/* Bridge (top) with dark glass windows */}
        <mesh position={[-2, 9, 0]} material={materials.superstructure} castShadow>
          <boxGeometry args={[12, 3, 8]} />
        </mesh>
        <mesh position={[-2, 9, 0]}>
          <boxGeometry args={[12.05, 1.6, 8.05]} />
          <primitive object={materials.bridgeGlass} attach="material" />
        </mesh>
        {/* Bridge wings */}
        <mesh position={[-2, 8.5, 5]} material={materials.superstructure}>
          <boxGeometry args={[2, 2, 2]} />
        </mesh>
        <mesh position={[-2, 8.5, -5]} material={materials.superstructure}>
          <boxGeometry args={[2, 2, 2]} />
        </mesh>
      </group>

      {/* --- MAIN MAST + RADAR --- */}
      <group position={[0, 22, 0]}>
        <mesh material={materials.detail} castShadow>
          <cylinderGeometry args={[0.35, 0.5, 12, 8]} />
        </mesh>
        {/* Cross-arm */}
        <mesh position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 6, 6]} />
          <primitive object={materials.detail} attach="material" />
        </mesh>
        {/* Radar dish (top) */}
        <mesh position={[0, 6.5, 0]} material={materials.superstructure} castShadow>
          <boxGeometry args={[4, 0.6, 1.5]} />
        </mesh>
        {/* Radar dome */}
        <mesh position={[0, 4.2, 0]} material={materials.superstructure} castShadow>
          <sphereGeometry args={[1.2, 12, 8]} />
        </mesh>
        {/* Red nav light */}
        <mesh position={[0, 6.9, 0]} material={materials.accent}>
          <sphereGeometry args={[0.25, 8, 6]} />
        </mesh>
      </group>

      {/* --- FUNNEL / EXHAUST STACK (mid-aft) --- */}
      <group position={[-15, 14, 0]}>
        <mesh material={materials.superstructure} castShadow>
          <boxGeometry args={[7, 6, 8]} />
        </mesh>
        <mesh position={[0, 3.5, 0]} material={materials.detail} castShadow>
          <cylinderGeometry args={[1.6, 1.8, 3, 12]} />
        </mesh>
      </group>

      {/* --- AFT SUPERSTRUCTURE (helicopter hangar) --- */}
      <group position={[-32, 12, 0]}>
        <mesh material={materials.superstructure} castShadow>
          <boxGeometry args={[16, 4, 12]} />
        </mesh>
      </group>

      {/* --- AFT DECK / HELIPAD --- */}
      <mesh position={[-46, 11, 0]}>
        <boxGeometry args={[16, 0.4, 12]} />
        <meshStandardMaterial color="#3a4048" roughness={0.85} metalness={0.15} />
      </mesh>
      {/* Helipad H marking */}
      <mesh position={[-46, 11.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.6, 32]} />
        <meshStandardMaterial color="#c9ccd0" roughness={0.6} />
      </mesh>

      {/* --- FORWARD DECK EQUIPMENT (gun turret) --- */}
      <group position={[26, 11.4, 0]}>
        <mesh material={materials.superstructure} castShadow>
          <cylinderGeometry args={[2.2, 2.6, 1.8, 16]} />
        </mesh>
        <mesh position={[0, 1.2, 0]} material={materials.superstructure} castShadow>
          <boxGeometry args={[3.6, 1.6, 4]} />
        </mesh>
        <mesh position={[3, 1.6, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.detail}>
          <cylinderGeometry args={[0.25, 0.25, 5, 10]} />
        </mesh>
      </group>

      {/* --- SECONDARY MAST (aft, lower) --- */}
      <group position={[-32, 18, 0]}>
        <mesh material={materials.detail}>
          <cylinderGeometry args={[0.28, 0.4, 6, 8]} />
        </mesh>
        <mesh position={[0, 3, 0]} material={materials.superstructure}>
          <boxGeometry args={[2.5, 0.5, 1]} />
        </mesh>
      </group>

      {/* --- RAILINGS (thin lines on deck edges) --- */}
      {[6, -6].map((z) => (
        <mesh key={z} position={[0, 11.4, z]} material={materials.detail}>
          <boxGeometry args={[95, 0.1, 0.1]} />
        </mesh>
      ))}
    </group>
  );
}
