import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";

const Logo = () => {
  return (
    <div
      className="flex flex-row items-center gap-[8px] w-fit h-fit p-2 text-2xl font-bold"
      id="logo"
    >
      <div className="purple-bg px-2 py-1 rounded-md">
        <FontAwesomeIcon
          icon={faBookOpenReader}
          className="relative top-[-1px] size-2x text-white"
        />
      </div>
      <p>ExamAI</p>
    </div>
  );
};

export default Logo;
