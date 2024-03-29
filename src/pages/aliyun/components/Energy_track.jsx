/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/aliyun_models/energy_track.glb
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Model(props) {
  const { nodes, materials } = useGLTF('/aliyun_models/energy_track.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Energy_Track.geometry}
        material={nodes.Energy_Track.material}
        position={[-0.71, 0.23, -0.36]}
      />
    </group>
  );
}

useGLTF.preload('/energy_track.glb');
