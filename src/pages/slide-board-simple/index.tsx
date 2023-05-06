import { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import Models from './components/Models';

import styles from './index.less';

const deviceWidth = window.innerWidth;
const rotatePart = 3;

const App = () => {
  const [springX, setSpringX] = useState(0);
  const [active, setActive] = useState(0);

  const [, setSpMove] = useSpring(() => ({
    mouseMoveX: 0,
    onChange: ({ value }) => {
      setSpringX(value.mouseMoveX);
      setActive(Math.abs((value.mouseMoveX / deviceWidth) % rotatePart));
    },
  }));

  const [pos, setPos] = useState(0);
  const bind = useDrag(
    ({ down, movement: [x, y], direction: [xDir], velocity }) => {
      const trigger = velocity[0] > 0.2;
      const dir = xDir < 0 ? -1 : 1;

      if (trigger && !down) {
        const newPosition = pos + dir * deviceWidth;
        setSpMove({ mouseMoveX: newPosition });
        setPos(newPosition);
      } else {
        setSpMove({ mouseMoveX: down ? x + pos : pos });
      }
    },
  );

  return (
    <div className={styles.app} {...bind()}>
      <div className={styles.modelsContainer}>
        <Models moveX={springX} maxX={deviceWidth * rotatePart} />
      </div>
    </div>
  );
};

export default App;
