import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {
  IndustrialPot,
  HeaveDustCleaner,
  Chimney,
  TransparentTube,
  RailroadSleeper,
  Railroad,
  SendMinecart,
  HotBlastStove,
  Tank,
  Pipe1,
  Pipe2,
  BlastFurnaceShaft,
  BlastFurnaceLargeModel,
  BlastFurnaceConveyorBelt,
} from './components/Models';
import CameraController from '@/components/CameraControls.js';

export default function IndexPage() {
  return (
    <Canvas
      style={{ width: '1000px', height: '800px', border: '1px solid red' }}
      camera={{ fov: 100, near: 0.1, far: 1000, position: [0, 10, 80] }}
      shadows={true}
    >
      <ambientLight />
      {/* <CameraController /> */}

      <OrbitControls />

      <pointLight position={[0, 10, 180]} />

      <Suspense fallback={null}>
        <IndustrialPot />
        <HeaveDustCleaner />
        <Chimney />
        <TransparentTube />
        <RailroadSleeper />
        <Railroad />
        <SendMinecart />
        <HotBlastStove />
        <Tank />
        <Pipe1 />
        <Pipe2 />
        <BlastFurnaceShaft />
        <BlastFurnaceLargeModel />
        <BlastFurnaceConveyorBelt />
      </Suspense>
    </Canvas>
  );
}
