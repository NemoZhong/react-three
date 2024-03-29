/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/aliyun_models/energy_fan.glb
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Model(props) {
  const { nodes, materials } = useGLTF('/aliyun_models/energy_fan.glb');
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Fan.geometry} material={nodes.Fan.material} />
    </group>
  );
}

useGLTF.preload('/energy_fan.glb');
