import Logo from "../logo/Logo";

const UnloggedNavbar = () => {
  return (
    <div className="gray-border">
      <div className="bg-white flex items-center max-w-[80%] mx-auto h-20 px-4 justify-between">
        <div className="flex gap-6">
          <div className="shrink-0">
            <Logo />
          </div>

          <div className="flex flex-1 justify-center gap-6 text-lg paragraph-gray">
            <button className="hover:text-[#6366f1] cursor-pointer">
              Pricing
            </button>
            <button className="hover:text-[#6366f1] cursor-pointer">FAQ</button>
            <button className="hover:text-[#6366f1] cursor-pointer">
              Contact
            </button>
          </div>
        </div>

        <div className="shrink-0 items-center flex gap-4 text-lg paragraph-gray">
          <button className="hover:text-[#6366f1] cursor-pointer">Login</button>
          <button className="text-white purple-bg px-4 py-1 rounded-md cursor-pointer transition duration-500 duration-500 ease-in-out hover:scale-105 hover:shadow-xl">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnloggedNavbar;
