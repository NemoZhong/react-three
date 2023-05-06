import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

const generateModels = (key: string) => {
  const objModel = useLoader(OBJLoader, `/models/${key}.obj`, (loader: any) => {
    const objMaterial = useLoader(MTLLoader, `/models/${key}.mtl`);
    loader.setMaterials(objMaterial);
  });
  return <primitive object={objModel} />;
};

export const IndustrialPot = () => generateModels('industrial_pot');

export const HeaveDustCleaner = () => generateModels('重力除尘器');

export const Chimney = () => generateModels('烟囱');

export const TransparentTube = () => generateModels('透明管子');

export const RailroadSleeper = () => generateModels('铁轨枕木');

export const Railroad = () => generateModels('铁轨铁');
export const SendMinecart = () => generateModels('送矿车');
export const HotBlastStove = () => generateModels('热风炉');
export const Tank = () => generateModels('料罐');
export const Pipe1 = () => generateModels('管子01');
export const Pipe2 = () => generateModels('管子02');
export const BlastFurnaceShaft = () => generateModels('高炉炉身');
export const BlastFurnaceLargeModel = () => generateModels('高炉大模型');
export const BlastFurnaceConveyorBelt = () => generateModels('高炉传送带');
