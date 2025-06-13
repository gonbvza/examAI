import UnloggedNavbar from "./UnloggedNavbar";
import LoggedNavbar from "./LoggedNavbar";

interface NavbarProps {
  name: string;
  setUsernameNavbar: (username: string) => void;
}

const Navbar = ({ name, setUsernameNavbar }: NavbarProps) => {
  return <UnloggedNavbar />;
};

export default Navbar;

