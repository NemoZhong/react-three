import { useEffect, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

const PI = Math.PI;

const lerp = (x: number, { minX, maxX, minY, maxY }: any) => {
  var slope = (maxY - minY) / (maxX - minX);
  return (x - minX) * slope + minY;
};

interface Iprops {
  moveX: number;
  maxX: number;
}
const Models: React.FC<Iprops> = (props) => {
  const { moveX, maxX } = props;
  const rotateY = lerp(moveX, {
    minX: 0,
    maxX: maxX,
    minY: 0,
    maxY: 2 * Math.PI,
  });

  return (
    <Suspense fallback={null}>
      <Canvas shadows flat={true}>
        <group rotation-y={rotateY}>
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
      objModel.scale.set(0.5, 0.5, 0.5);
      objModel.position.set(0, 0.3, 0);
      objModel.rotation.set(PI / 2, PI, PI);
    }
  }, [objModel]);

  return <primitive object={objModel} />;
};
