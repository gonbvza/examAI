import React from 'react'
import UnloggedNavbar from './UnloggedNavbar.tsx'
import LoggedNavbar from './LoggedNavbar'

const Navbar = ({name, setUsernameNavbar}: {name: string, setUsernameNavbar: React.Dispatch<React.SetStateAction<string>>}) => {
  if(name == "") {
    return (
      <UnloggedNavbar/>
    )
  } else {
    return (
      <LoggedNavbar name={name} setUsernameNavbar={setUsernameNavbar}/>
    )
  }
}

export default Navbar