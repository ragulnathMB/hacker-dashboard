import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import GitTracker from './Components/GitTracker/GitTracker'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <GitTracker/>
    <SignUp/>
      <Login/>
    </>
  )
}

export default App
