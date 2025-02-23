import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'

// Import components
import Landing from './components/landingPage/Landing'
import Sign from './components/Sign/Sign'
import LogIn from './components/LogIn/LogIn'
import Main from './components/main/Main'
import Question from './components/Question/Question'
import Dashboard from './components/Dashboard/Dashboard'
import Summary from './components/Summary/Summary'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer/Footer'

import { verifyLogIn } from './helpers/verifyUser.ts'

function App() {
  const [username, setUsername] = useState("")



  useEffect(() => {
    const getUser = async () => {
      var user:string = await verifyLogIn()
      setUsername(user)
    };

    getUser();
  }, []);

  return (
    <>

	  <BrowserRouter>
      <Navbar name={username} setUsernameNavbar={setUsername}/>
      <Routes>
        <Route path="landing" Component={Landing}/>
        <Route path="" Component={Landing}/>
        <Route path="/main" Component={Main}/>
        <Route path="/signUp" element={<Sign setUsernameNavBar={setUsername}/>}/>
        <Route path="/logIn" element={<LogIn setUsernameNavBar={setUsername}/>}/>
        
        {/* URI ID passing has to be implemented */}
        <Route path="/question/:questionId" Component={Question}/>
        <Route path="/summary/:summaryId" Component={Summary}/>

        {/* URI ID passing has to be implemented */}
        <Route path="/dashboard" Component={Dashboard}/>
      </Routes>
      <Footer/>
	  </BrowserRouter>
   </>
  )
}

export default App
