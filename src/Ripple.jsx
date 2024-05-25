// src/components/Ripple.js
import React from "react";

const Ripple = React.memo(({ size, color, opacity, numCircles, delay }) => {
  const MAIN_CIRCLE_SIZE = size || 210;
  const MAIN_CIRCLE_OPACITY = opacity || 0.24;
  const NUM_CIRCLES = numCircles || 8;
  const ANIMATION_DELAY = delay || 0.06;

  return (
    <div className="absolute left-1/2 top-1/2 h-full w-full overflow-visible">
      {Array.from({ length: NUM_CIRCLES }, (_, i) => (
        <div
          key={i}
          className={`absolute -translate-x-1/2 -translate-y-1/2 animate-ripple rounded-full ${color}`}
          style={
            {
              width: MAIN_CIRCLE_SIZE + i * 70,
              height: MAIN_CIRCLE_SIZE + i * 70,
              opacity: MAIN_CIRCLE_OPACITY - i * 0.03,
              animationDelay: `${i * ANIMATION_DELAY}s`,
            } 
          }
        ></div>
      ))}
    </div>
  );
});

export default Ripple;
