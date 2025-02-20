import React from 'react'
import UnloggedNavbar from './UnloggedNavbar.tsx'
import LoggedNavbar from './LoggedNavbar'

const Navbar = ({name}: {name: string}) => {
  if(name == "") {
    return (
      <UnloggedNavbar/>
    )
  } else {
    return (
      <LoggedNavbar name={name}/>
    )
  }
}

export default Navbar