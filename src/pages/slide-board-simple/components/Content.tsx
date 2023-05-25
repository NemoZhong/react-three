import React, { useState } from 'react';
import { useTrail, a } from '@react-spring/web';

import styles from '../index.less';

const Trail: React.FC<{
  isFinished: boolean;
  direction: number;
  children?: React.ReactNode;
}> = ({ isFinished, direction, children }) => {
  const items = React.Children.toArray(children);

  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: isFinished ? 1 : 0,
    x: isFinished ? 0 : direction > 0 ? 40 : -40,
    height: isFinished ? 30 : 0,
    from: { opacity: 0, x: 40, height: 0 },
  });
  return (
    <div className={styles.content}>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className={styles.trailsText} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};

export default function Content({
  isFinished,
  active,
  direction,
}: {
  isFinished: boolean;
  active: number;
  direction: number;
}) {
  const textAry = [
    [
      '111',
      'Beneath the blue sky and surrounded by lush.',
      `With its cobblestone streets, colorful houses, and picturesque
        landscape, it's easy to get lost in the beauty of this idyllic place.`,
    ],
    [
      '222',
      'this village has something for everyone.',
      `From hiking trails to cozy cafes, from ancient ruins to modern amenities, there's never a dull moment in this charming paradise. `,
    ],
    [
      '333',
      'bring your sense of wonder',
      `ome explore all that this magical village has to offer`,
    ],
  ];

  return (
    <Trail isFinished={isFinished} direction={direction}>
      <span>{textAry[active]?.[0]}</span>
      <span>{textAry[active]?.[1]}</span>
      <span>{textAry[active]?.[2]}</span>
    </Trail>
  );
}
