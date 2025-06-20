import Logo from "../logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCog,
  faSignOutAlt,
  faUserCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 bg-white min-h-screen shadow-xl border-r border-gray-100">
      <div className="p-8 border-b border-gray-100">
        <Logo />
      </div>

      <nav className="flex-1 px-6 py-8">
        <ul className="space-y-3">
          <li>
            <a
              href="/dashboard"
              className="group flex items-center px-4 py-3.5 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 transition-all duration-300 hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all duration-300 mr-4">
                <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
              </div>
              <span className="font-medium">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="/create"
              className="group flex items-center px-4 py-3.5 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 hover:text-green-700 transition-all duration-300 hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-green-100 group-hover:text-green-600 transition-all duration-300 mr-4">
                <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
              </div>
              <span className="font-medium">Create</span>
            </a>
          </li>
          <li>
            <a
              href="/settings"
              className="group flex items-center px-4 py-3.5 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 hover:text-gray-800 transition-all duration-300 hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-gray-200 group-hover:text-gray-700 transition-all duration-300 mr-4">
                <FontAwesomeIcon icon={faCog} className="w-5 h-5" />
              </div>
              <span className="font-medium">Settings</span>
            </a>
          </li>
        </ul>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <button
            className="cursor-pointer group flex items-center w-full px-4 py-3.5 text-red-600 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 transition-all duration-300 hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => {
              console.log("Logout clicked");
            }}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 group-hover:bg-red-100 group-hover:text-red-600 transition-all duration-300 mr-4">
              <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
            </div>
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </nav>

      <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-slate-50">
        <div className="flex items-center p-3 rounded-xl bg-white shadow-sm border border-gray-100">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 mr-3">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="w-6 h-6 text-white"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Username</p>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
