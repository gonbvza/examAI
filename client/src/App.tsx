import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

// Import components
import Landing from './components/landingPage/Landing'
import Sign from './components/Sign/Sign'
import LogIn from './components/LogIn/LogIn'
import Main from './components/main/Main'

function App() {

  return (
    <>
	  <BrowserRouter>
      <Routes>
        <Route path="landing" Component={Landing}/>
        <Route path="" Component={Landing}/>
        <Route path="/main" Component={Main}/>
        <Route path="/signUp" Component={Sign}/>
        <Route path="/logIn" Component={LogIn}/>
      </Routes>
	  </BrowserRouter>
   </>
  )
}

export default App
