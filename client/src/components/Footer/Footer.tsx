import Logo from "../logo/Logo";

const Footer = () => {
  return (
    <footer className="mt-auto bg-gray-100 text-gray-700 py-2">
      <div className="max-w-7xl mt-4 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-6">
          <div className="text-lg font-semibold text-gray-800">
            <a href="/">
              <Logo />
            </a>
          </div>

          <nav>
            <ul className="flex flex-col md:flex-row gap-4 text-sm">
              <li>
                <a href="/privacy" className="hover:text-[#6366F1] transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-[#6366F1] transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#6366F1] transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-2 mb-4 pt-4 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} examAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
