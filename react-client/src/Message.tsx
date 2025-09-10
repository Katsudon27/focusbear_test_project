import React, { useState } from 'react';

export function Message() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Hello, user!</p>
      <p>Button clicked: {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}