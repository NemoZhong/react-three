import React from 'react';
import { animated, SpringValue, useSpring, config } from '@react-spring/web';
import styles from '../index.less';

const data = [
  { title: 'CCC' },
  { title: 'AAA' },
  { title: 'BBB' },
  { title: 'CCC' },
  { title: 'AAA' },
];

export default ({
  mouseMoveX,
  isFinished,
}: {
  mouseMoveX: SpringValue<number>;
  isFinished: boolean;
}) => {
  const [style] = useSpring(
    () => ({
      config: config.stiff,
      scale: [isFinished ? 1 : 2.4, isFinished ? 0.6 : 0.4],
      width: 80,
      transformOrigin: '0 50% 0',
    }),
    [isFinished],
  );
  return (
    <animated.div
      style={{
        display: 'flex',
        transform: mouseMoveX.interpolate((x) => `translateX(${x}px)`),
      }}
    >
      {data.map(({ title }, idx) => (
        <div className={`${styles.content} ${styles.title}`} key={idx}>
          <animated.div
            // @ts-ignore
            style={{
              ...style,
              // backgroundColor: isFinished ? '#fff' : '#000',
              borderRadius: '16px',
            }}
          >
            {title}
          </animated.div>
        </div>
      ))}
    </animated.div>
  );
};
