import React, { useRef, useState } from 'react';
import THREE from 'three';
import { MeshProps, useFrame } from '@react-three/fiber';

const Box: React.FC<MeshProps> = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>(null!);

  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 2, 3]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
};

export default Box;
