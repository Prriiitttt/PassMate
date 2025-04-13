import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <div className="flex-grow overflow-x-hidden [background:radial-gradient(125%_125%_at_50%_10%,#0f172a_40%,#334155_100%)]">
      <Manager/>
      </div>
      <Footer/>
    </div>

      
    </>
  )
}

export default App
