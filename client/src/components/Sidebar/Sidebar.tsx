import Logo from "../logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCog,
  faSignOutAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-56 bg-white min-h-screen shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <Logo />
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <ul className="space-y-2">
          <li>
            <a
              href="/dashboard"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-[#6366f1] transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faHome} className="w-5 h-5 mr-3" />
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/settings"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-[#6366f1] transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faCog} className="w-5 h-5 mr-3" />
              Settings
            </a>
          </li>
        </ul>
        <button
          className="cursor-pointer flex items-center w-full px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
          onClick={() => {
            console.log("Logout clicked");
          }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 mr-3" />
          Log Out
        </button>
      </nav>

      {/* TODO: Change this to show the username */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="w-8 h-8 mr-3 text-gray-400"
          />
          <span className="text-gray-700 font-medium">Username</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
