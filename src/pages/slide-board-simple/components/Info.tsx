import React from 'react';
import { animated } from '@react-spring/web';
import styles from '../index.less';

const data = [
  { title: '333' },
  { title: '111' },
  { title: '222' },
  { title: '333' },
  { title: '111' },
];

export default ({ mouseMoveX }) => {
  return (
    <animated.div
      style={{
        display: 'flex',
        transform: mouseMoveX.interpolate((x) => `translateX(${x}px)`),
      }}
    >
      {data.map(({ title }, idx) => (
        <div
          style={{
            backgroundColor: '#fff',
            width: '100vw',
            height: '70vh',
          }}
          key={idx}
        >
          <animated.div className={styles.text}>{title}</animated.div>
        </div>
      ))}
    </animated.div>
  );
};
