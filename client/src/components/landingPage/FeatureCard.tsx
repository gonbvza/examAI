import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: any;
  title: any;
  description: any;
}) => (
  <div className="p-6 bg-[#F9FAFB] rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 w-full max-w-sm border border-gray-100 hover:border-indigo-200">
    <FontAwesomeIcon
      icon={icon}
      className="relative top-[-1px] text-[#6366F1]"
                size="2x"
    />

    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="font-bold text-[#4B5563] text-base">{description}</p>
  </div>
);

export default FeatureCard;
