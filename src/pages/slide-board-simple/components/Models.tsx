import { useEffect, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { isMobile } from '@/utils';

const PI = Math.PI;

const lerp = (x: number, { minX, maxX, minY, maxY }: any) => {
  var slope = (maxY - minY) / (maxX - minX);
  return (x - minX) * slope + minY;
};

interface Iprops {
  moveX: number;
  maxX: number;
  initialPos?: number;
}
const Models: React.FC<Iprops> = (props) => {
  const { moveX, maxX, initialPos } = props;

  const rotateY = lerp(moveX, {
    minX: 0,
    maxX: maxX,
    minY: 0,
    maxY: 2 * Math.PI,
  });

  return (
    <Suspense fallback={null}>
      <Canvas shadows flat={true}>
        <group rotation-y={initialPos + rotateY}>
          <Board />
        </group>
        <spotLight
          color={[1, 1, 1]}
          position={[30, 70, 20]}
          intensity={0.7}
          distance={1000}
        />
      </Canvas>
    </Suspense>
  );
};

export default Models;

const Board = () => {
  const objModel = useLoader(OBJLoader, '/models/board.obj', (loader: any) => {
    const objMaterial = useLoader(MTLLoader, '/models/board.mtl');
    loader.setMaterials(objMaterial);
  });
  useEffect(() => {
    if (objModel) {
      objModel.scale.set(0.6, 0.6, 0.6);
      objModel.position.set(0, 0, 0.4);
      objModel.rotation.set(PI / 2, PI, isMobile() ? PI * 1.04 : PI * 0.84);
    }
  }, [objModel]);

  return <primitive object={objModel} />;
};
