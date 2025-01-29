import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

// Import components
import Landing from './components/landingPage/Landing'
import Sign from './components/Sign/Sign'

function App() {

  return (
    <>
	  <BrowserRouter>
      <Routes>
        <Route path="landing" Component={Landing}/>
        <Route path="" Component={Landing}/>
        <Route path="/main" Component={""}/>
        <Route path="/signUp" Component={Sign}/>
      </Routes>
	  </BrowserRouter>
   </>
  )
}

export default App
