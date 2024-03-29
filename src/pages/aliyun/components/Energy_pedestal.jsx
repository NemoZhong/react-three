/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/aliyun_models/energy_pedestal.glb
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Model(props) {
  const { nodes, materials } = useGLTF('/aliyun_models/energy_pedestal.glb');
  return (
    <group {...props} dispose={null}>
      <group position={[-0.38, 0.24, -0.35]}>
        <mesh
          geometry={nodes.Energy_Pedestal_1.geometry}
          material={nodes.Energy_Pedestal_1.material}
        />
        <mesh
          geometry={nodes.Energy_Pedestal_2.geometry}
          material={nodes.Energy_Pedestal_2.material}
        />
        <mesh
          geometry={nodes.Energy_Pedestal_3.geometry}
          material={nodes.Energy_Pedestal_3.material}
        />
        <mesh
          geometry={nodes.Energy_Pedestal_4.geometry}
          material={nodes.Energy_Pedestal_4.material}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/energy_pedestal.glb');
