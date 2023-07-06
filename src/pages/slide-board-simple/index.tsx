import React, { useState } from 'react';
import { useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import Models from './components/Models';
import Title from './components/Title';
import Content from './components/Content';

import styles from './index.less';

const deviceWidth = window.innerWidth;
const rotatePart = 3;

const initialPos = -deviceWidth;

const App = () => {
  const [springX, setSpringX] = useState(initialPos);
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(initialPos);
  const [direction, setDir] = useState(0);

  const [isFinished, setIsFinished] = useState(true);

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
      const idx = Math.abs(currentIdx);
      if (Number.isInteger(currentIdx) && idx < 3) {
        setActive(idx);
      }
    },
    onRest: ({ finished }: { finished: boolean }) => {
      setIsFinished(finished);
    },
  }));

  const bind = useDrag(
    ({ down, movement: [x, y], direction: [xDir], velocity }) => {
      const trigger = velocity[0] > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!isFinished) return;

      setDir(dir);
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
      <div className={styles.contentWrapper}>
        <Title mouseMoveX={mouseMoveX} isFinished={isFinished} />
        <Content
          isFinished={isFinished}
          active={active}
          direction={direction}
        />
      </div>
    </div>
  );
};

export default App;
