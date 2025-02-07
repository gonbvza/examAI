import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

// Import components
import Landing from './components/landingPage/Landing'
import Sign from './components/Sign/Sign'
import LogIn from './components/LogIn/LogIn'
import Main from './components/main/Main'
import Question from './components/Question/Question'
import Dashboard from './components/Dashboard/Dashboard'
import Summary from './components/Summary/Summary'




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
        
        {/* URI ID passing has to be implemented */}
        <Route path="/question/:questionId" Component={Question}/>
        <Route path="/summary/:summaryId" Component={Summary}/>

        {/* URI ID passing has to be implemented */}
        <Route path="/dashboard" Component={Dashboard}/>
      </Routes>
	  </BrowserRouter>
   </>
  )
}

export default App
