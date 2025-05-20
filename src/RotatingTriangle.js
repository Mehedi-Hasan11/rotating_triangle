import React, { useEffect, useRef, useState } from 'react';

const RotatingTriangle = () => {
  const triangleRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const [isGreen, setIsGreen] = useState(false);
  const animationRef = useRef(null);
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 'm') {
        setIsGreen(true);
      }
    };
    
    const handleKeyUp = (event) => {
      if (event.key.toLowerCase() === 'm') {
        setIsGreen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  
  useEffect(() => {
    const triangle = triangleRef.current;
    
    const animate = () => {
      // Calculate elapsed time
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      
      // Update rotation (30 degrees per second)
      const angle = elapsed * 30;
      
      // Update color
      const redIntensity = Math.min(255, Math.floor((elapsed / 30) * 255));
      triangle.setAttribute('fill', isGreen ? 'rgb(0, 255, 0)' : `rgb(${redIntensity}, 0, 0)`);
      
      // Apply rotation transform around the center
      triangle.setAttribute('transform', `rotate(${angle}, 150, 150)`);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isGreen]);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <svg width="300" height="300" style={{ border: '1px solid #ddd' }}>
        <polygon 
          ref={triangleRef}
          points="150,50 100,200 200,200" 
          fill="rgb(0, 0, 0)"
          stroke="black"
          strokeWidth="1"
        />
      </svg>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '18px', fontWeight: '500' }}>Press 'M' (first letter of Mehedi) to turn the triangle green</p>
        <p style={{ marginTop: '10px' }}>Current color: {isGreen ? 'Green' : 'Transitioning from black to red'}</p>
      </div>
    </div>
  );
};

export default RotatingTriangle;