import UnloggedNavbar from './UnloggedNavbar'
import LoggedNavbar from './LoggedNavbar'

interface NavbarProps {
  name: string;
  setUsernameNavbar: (username: string) => void;
}

const Navbar = ({ name, setUsernameNavbar }: NavbarProps) => {
  if (name === "") {
    return <UnloggedNavbar />
  } else {
    return <LoggedNavbar name={name} setUsernameNavbar={setUsernameNavbar} />
  }
}

export default Navbar