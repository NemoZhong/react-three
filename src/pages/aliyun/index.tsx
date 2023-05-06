import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { to, animated, useSpring } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Model as EnergyBrainSpinner } from './components/Energy_brain_spinner';
import { Model as EnergyFan } from './components/Energy_fan';
import { Model as EnergyPedestal } from './components/Energy_pedestal';
import { Model as EnergyProd } from './components/Energy_prod';
import { Model as EnergyTrack } from './components/Energy_track';

export default function IndexPage() {
  return (
    <Suspense fallback={null}>
      <Canvas style={{ height: '1000px' }}>
        <ModelObj />
      </Canvas>
    </Suspense>
  );
}

const ModelObj = () => {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <Suspense fallback={null}>
        <EnergyBrainSpinner />
        <EnergyFan />
        <EnergyPedestal />
        <EnergyProd />
        <EnergyTrack />
      </Suspense>
    </>
  );
};
