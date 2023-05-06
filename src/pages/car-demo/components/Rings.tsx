import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color } from 'three';

export function Rings() {
  const itemsRef = useRef<any[]>([]);

  useFrame((state, delta) => {
    let elapsed = state.clock.getElapsedTime();
    itemsRef.current.forEach((mesh, idx) => {
      let z = (idx - 7) * 3.5 + ((elapsed * 0.4) % 3.5) * 2;
      mesh.position.set(0, 0, -z);

      const dist = Math.abs(z);
      mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);

      const colorScale = (dist > 2 ? 1 - (Math.min(dist, 12) - 2) / 10 : 1) / 2;
      mesh.material.emissive = (
        idx % 2 === 1 ? new Color(6, 0.15, 0.7) : new Color(0.1, 0.7, 3)
      ).multiplyScalar(colorScale);
    });
  });

  return (
    <>
      {new Array(14).fill(undefined).map((item, idx) => (
        <mesh
          castShadow
          receiveShadow
          position={[0, 0, 0]}
          key={idx}
          ref={(el) => (itemsRef.current[idx] = el)}
        >
          {/* [环半径,管半径, size] */}
          <torusGeometry args={[3.35, 0.05, 16, 100]} />
          <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]} />
        </mesh>
      ))}
    </>
  );
}
