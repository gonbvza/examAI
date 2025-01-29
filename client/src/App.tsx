import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

// Import components
import Landing from './components/landingPage/Landing'

function App() {

  return (
    <>
	  <BrowserRouter>
      <Routes>
        <Route path="landing" Component={Landing}/>
        <Route path="/main" Component={""}/>
      </Routes>
	  </BrowserRouter>
   </>
  )
}

export default App
