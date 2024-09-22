import React, { useRef, useState, useEffect } from 'react';

export function MyComponent() {
  const [count, setCount] = useState(0);
  const previousCountRef = useRef(count);

  useEffect(() => {
    previousCountRef.current = count; // Update the ref with the latest count value after every render
  });

  const previousCount = previousCountRef.current;

  return (
    <div>
      <p>Current count: {count}</p>
      <p>Previous count: {previousCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
