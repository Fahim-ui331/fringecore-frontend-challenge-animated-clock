import React from 'react';

function Clock() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    let animationFrameId;
    const animate = () => {
      setTime(new Date());
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const seconds = time.getSeconds() + (time.getMilliseconds() / 1000);
  const minutes = time.getMinutes() + (seconds / 60);
  const hours = time.getHours() % 12 + (minutes / 60);

  const secAngle = (seconds / 60) * 360 - 90;
  const minAngle = (minutes / 60) * 360 - 90;
  const hourAngle = (hours / 12) * 360 - 90;

  const hourHandLength = 20; 
  const minHandLength = 30; 
  const secHandLength = 40; 

  const clockNumbers = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const x = 50 + 40 * Math.cos(angle);
    const y = 50 + 40 * Math.sin(angle);
    return { number: i === 0 ? 12 : i, x, y };
  });

  return (
    <svg viewBox="0 0 100 100" className="clock">
      {/* Clock Dial */}
      <circle cx="50" cy="50" r="48" fill="white" stroke="lightgray" strokeWidth="2" />
      
      {/* Clock Numbers */}
      {clockNumbers.map(({ number, x, y }) => (
        <text
          key={number}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="8"
          fill="#333"
        >
          {number}
        </text>
      ))}

      {/* Hour Hand (Yellow) */}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2={50 - hourHandLength}
        stroke="#FAAB00"
        strokeWidth={4}
        strokeLinecap="round"
        style={{
          transformOrigin: "50% 50% 0",
          transform: `rotate(${hourAngle}deg)`,
          transition: "transform 0.1s linear",
        }}
      />
      
      {/* Minute Hand (Red) */}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2={50 - minHandLength}
        stroke="#FF2D00"
        strokeWidth={6}
        strokeLinecap="round"
        style={{
          transformOrigin: "50% 50% 0",
          transform: `rotate(${minAngle}deg)`,
          transition: "transform 0.1s linear",
        }}
      />
      
      {/* Second Hand (Blue) */}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2={50 - secHandLength}
        stroke="#0050FF"
        strokeWidth={3}
        strokeLinecap="round"
        style={{
          transformOrigin: "50% 50% 0",
          transform: `rotate(${secAngle}deg)`,
          transition: "transform 0.1s linear",
        }}
      />
      
      {/* Center Circle */}
      <circle cx="50" cy="50" r="5" fill="#FAAB00" />
    </svg>
  );
}

function App() {
  return (
    <div className="container">
      <div className="row">
        <Clock />
        <Clock />
        <Clock />
        <Clock />
        <Clock />
        <Clock />
        <Clock />
        <Clock />
      </div>
      <div className="row">
        <Clock />
        <Clock />
        <Clock />
        <Clock />
        <Clock />
        <Clock />
        <Clock />
        <Clock />
      </div>
      <div className="row">
        <Clock />
        <Clock />
        <Clock />
        <Clock />
        <Clock />
        <Clock />
        <Clock />
        <Clock />
      </div>
    </div>
  );
}

export default App;