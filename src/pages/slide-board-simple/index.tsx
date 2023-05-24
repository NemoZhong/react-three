import React, { useState } from 'react';
import { useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import Models from './components/Models';
import Info from './components/Info';

import styles from './index.less';

const deviceWidth = window.innerWidth;
const rotatePart = 3;

const initialPos = -deviceWidth;

const App = () => {
  const [springX, setSpringX] = useState(initialPos);
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(initialPos);

  const [isFinished, setIsFinished] = useState<any>(true);

  const [{ mouseMoveX }, setSpMove] = useSpring(() => ({
    mouseMoveX: initialPos,
    onChange: ({ value }) => {
      setSpringX(value.mouseMoveX);
      // +1 为偏移量
      const currentIdx = value.mouseMoveX / deviceWidth + 1;
      if (currentIdx === -3) {
        // 变成初始位置的transform
        setPos(initialPos);
        setSpMove({ mouseMoveX: initialPos, immediate: true });
      }
      if (currentIdx === 1) {
        // 变成2的transform
        setPos(-deviceWidth * rotatePart);
        setSpMove({
          mouseMoveX: -deviceWidth * rotatePart,
          immediate: true,
        });
      }
      setActive(Math.abs(currentIdx));
    },
    onRest: ({ finished }) => {
      setIsFinished(finished);
    },
  }));

  const bind = useDrag(
    ({ down, movement: [x, y], direction: [xDir], velocity }) => {
      const trigger = velocity[0] > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!isFinished) return;

      if (trigger && !down) {
        const newPosition = pos + dir * deviceWidth;
        setSpMove({ mouseMoveX: newPosition });
        setPos(newPosition);
        setIsFinished(false);
      } else {
        setSpMove({ mouseMoveX: down ? x + pos : pos });
      }
    },
  );

  return (
    <div className={styles.app} {...bind()}>
      <div className={styles.modelsWrapper}>
        <Models
          initialPos={initialPos}
          moveX={springX}
          maxX={deviceWidth * rotatePart}
        />
      </div>
      <div style={{ position: 'absolute' }}>
        <Info mouseMoveX={mouseMoveX} />
      </div>
    </div>
  );
};

export default App;
