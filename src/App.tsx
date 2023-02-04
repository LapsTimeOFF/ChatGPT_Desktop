import { useState } from 'react'
import './App.scss'

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {
  const [count, setCount] = useState(0)

  return (
    <p>Yay</p>
  );
}

export default App
