import { useState, useEffect, Suspense } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { lerp } from '@/utils';

import './index.less';

const PI = Math.PI;
const finalistColor = {
  0: '#f89eab',
  '-400': '#ceb7ff',
  '-800': '#9dd1fc',
  '-1200': '#affdff',
};

const iconSet = {
  cross: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  left: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  ),
  right: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  ),
  insta: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  ),
  twit: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
    </svg>
  ),
};

const App = () => {
  const [animRot, setAnimRot] = useState(0);
  const [isStat, setStat] = useState(false);
  const [active, setActive] = useState(0);
  const [{ trans }, setTrans] = useSpring(() => ({
    trans: 0,
  }));
  const [{ rot2 }, set2] = useSpring(() => ({
    rot2: 0,
    onChange: ({ value }) => {
      setAnimRot(value.rot2);
      handleActive(value.rot2);
    },
  }));
  const [{ rot3 }, set3] = useSpring(() => ({
    rot3: 0,
    config: { mass: 0.5 },
  }));

  const handleActive = (rot2) => {
    if (rot2 >= -200) {
      setActive(0);
    } else if (rot2 < -200 && rot2 > -600) {
      if (active !== 1) setActive(1);
    } else if (rot2 <= -600 && rot2 > -1000) {
      if (active !== 2) setActive(2);
    } else if (rot2 <= -1000) {
      if (active !== 3) setActive(3);
    }
  };

  const [pos, setPos] = useState(0);
  const bind = useDrag(
    ({ down, movement: [x, y], direction: [xDir], velocity }) => {
      const trigger = velocity[0] > 0.2;
      const dir = xDir < 0 ? -1 : 1;

      if (!isStat) {
        if (trigger && !down) {
          const newPosition = pos + dir * 400;
          if (newPosition !== 400 && newPosition !== -1600) {
            set2({ rot2: newPosition });
            set3({ rot3: newPosition });
            setPos(newPosition);
          } else {
            set2({ rot2: pos });
            set3({ rot3: pos });
          }
        } else {
          set2({ rot2: down ? x + pos : pos });
        }
      }
    },
  );
  const move = (dir) => {
    if (!isStat) {
      const newPosition = pos + dir * 400;
      if (newPosition <= 0 && newPosition >= -1200) {
        set2({ rot2: newPosition });
        set3({ rot3: newPosition });
        setPos(newPosition);
      }
    }
  };
  const handleStat = (bool) => {
    setStat(bool);
    if (!isStat) {
      setTrans({ trans: -196 });
    } else {
      setTrans({ trans: 0 });
    }
  };

  return (
    <div className="App" {...bind()}>
      <animated.div
        style={{
          transform: rot3.interpolate((x) => `translateX(${x}px)`),
        }}
        id="textContainer"
      >
        <div id="text">
          <div id="firstName">TOM</div>
        </div>
        <div id="text">
          <div id="firstName">TONY</div>
        </div>
        <div id="text">
          <div id="firstName">DANNY</div>
        </div>
        <div id="text">
          <div id="firstName">BUCKY</div>
        </div>
      </animated.div>
      <animated.div
        style={{
          top: '20vh',
          transform: rot2.interpolate((x) => `translateX(${x}px)`),
        }}
        id="textContainer"
      >
        <div id="text">
          <div id="lastName">ASTA</div>
        </div>
        <div id="text">
          <div id="lastName">HAWK</div>
        </div>
        <div id="text">
          <div id="lastName">WAY</div>
        </div>
        <div id="text">
          <div id="lastName">LASEK</div>
        </div>
      </animated.div>
      <animated.div
        id="colorWave"
        style={{
          transform: trans
            .interpolate([0, -196], [15, 0])
            .interpolate((x) => `translateY(${x}vh)`),
        }}
      >
        <animated.div id="finalistcontainer">
          <div
            id="finalist"
            style={{ color: finalistColor[pos], opacity: isStat ? 0 : 1 }}
          >
            FINALIST
          </div>
        </animated.div>
        <animated.div
          style={{
            display: 'flex',
            transform: rot2.interpolate((x) => `translateX(${x}px)`),
          }}
        >
          <PlayerInfo trans={trans} />
        </animated.div>
        <animated.div
          id="infoContainer"
          style={{
            opacity: trans.interpolate([0, -196], [0, 1]),
          }}
        >
          <animated.button
            id="cross"
            style={{
              opacity: trans.interpolate([0, -196], [0, 1]),
            }}
            onClick={() => {
              handleStat(false);
            }}
          >
            {iconSet.cross}
          </animated.button>
          <div id="info">AGE</div>
          <div id="data">21</div>
          <div id="info">COUNTRY</div>
          <div id="data">UNITED STATES</div>
          <div id="info">HIGHEST RANK</div>
          <div id="data">WINNER</div>
          <div id="info">STANCE</div>
          <div id="data">REGULAR</div>
          <div id="info">SOCIAL LINKS</div>
          <div id="data">
            <div id="socials">{iconSet.insta}</div>
            <div id="socials">{iconSet.twit}</div>
          </div>
        </animated.div>
      </animated.div>
      <animated.div
        style={{
          transform: trans.interpolate((x) => `translate(${x}px)`),
        }}
      >
        <Models anim={animRot} />
      </animated.div>
      <animated.button
        id="profile"
        onClick={() => {
          handleStat(true);
        }}
        style={{
          opacity: trans.interpolate([0, -196], [1, 0]),
        }}
      >
        VIEW STATS
      </animated.button>
      <animated.button
        id="left"
        style={{
          opacity: trans.interpolate([0, -196], [1, 0]),
        }}
        onClick={() => {
          move(1);
        }}
        // disabled={active === 0}
      >
        {iconSet.left}
      </animated.button>
      <animated.button
        id="right"
        style={{
          opacity: trans.interpolate([0, -196], [1, 0]),
        }}
        onClick={() => {
          move(-1);
        }}
        // disabled={active === 3}
      >
        {iconSet.right}
      </animated.button>
    </div>
  );
};

const PlayerInfo = ({ trans }) => {
  return (
    <animated.div
      style={{
        display: 'flex',
      }}
    >
      <div id="colorWaveDiv" style={{ backgroundColor: '#403d3d' }}>
        <div id="container">
          <animated.div
            id="containerName"
            style={{
              opacity: trans.interpolate([0, -196], [1, 0]),
            }}
          >
            TOM ASTA
          </animated.div>
        </div>
      </div>
      <div id="colorWaveDiv" style={{ backgroundColor: '#603c5a' }}>
        <div id="container">
          <animated.div
            id="containerName"
            style={{
              opacity: trans.interpolate([0, -196], [1, 0]),
            }}
          >
            TONY HAWK
          </animated.div>
        </div>
      </div>
      <div id="colorWaveDiv" style={{ backgroundColor: '#1e2f3c' }}>
        <div id="container">
          <animated.div
            id="containerName"
            style={{
              opacity: trans.interpolate([0, -196], [1, 0]),
            }}
          >
            DANNY WAY
          </animated.div>
        </div>
      </div>
      <div id="colorWaveDiv" style={{ backgroundColor: '#2d4242' }}>
        <div id="container">
          <animated.div
            id="containerName"
            style={{
              opacity: trans.interpolate([0, -196], [1, 0]),
            }}
          >
            BUCKY LASEK
          </animated.div>
        </div>
      </div>
    </animated.div>
  );
};

export default App;

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

const Models = (props) => {
  const { anim } = props;
  const rotateY = lerp(anim, {
    minX: 0,
    maxX: 1200,
    minY: 0,
    maxY: 2 * Math.PI,
  });

  return (
    <div id="world" className="worldContainer">
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
    </div>
  );
};
