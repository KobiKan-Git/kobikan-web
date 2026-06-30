import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Network({ count = 150 }) {
  const group = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, vel];
  }, [count]);

  const maxDistance = 2.5;

  useFrame((state, delta) => {
    if (!group.current || !linesRef.current || !pointsRef.current) return;

    // Slow rotation of the entire network
    group.current.rotation.y += delta * 0.05;
    group.current.rotation.x += delta * 0.02;

    const positionsAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const pos = positionsAttr.array as Float32Array;

    // Update positions
    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      // Bounce off invisible boundaries
      if (Math.abs(pos[i * 3]) > 7.5) velocities[i * 3] *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 7.5) velocities[i * 3 + 1] *= -1;
      if (Math.abs(pos[i * 3 + 2]) > 7.5) velocities[i * 3 + 2] *= -1;
    }
    positionsAttr.needsUpdate = true;

    // Update lines connecting close points
    const linePositions = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistance * maxDistance) {
          linePositions.push(
            pos[i * 3],
            pos[i * 3 + 1],
            pos[i * 3 + 2],
            pos[j * 3],
            pos[j * 3 + 1],
            pos[j * 3 + 2],
          );
        }
      }
    }

    linesRef.current.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3),
    );
  });

  return (
    <group ref={group}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#ff3333" transparent opacity={0.8} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#ff3333" transparent opacity={0.15} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export function TechnicalBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Network count={120} />
      </Canvas>
    </div>
  );
}
