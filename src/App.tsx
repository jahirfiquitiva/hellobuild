import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { Login } from '@/pages';

import '@/styles/global.scss';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Login />
    </>
  );
}

export default App;
