import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface BillingCardProps {
  planName: string;
  price: number;
  period: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  onButtonClick?: () => void;
}

const BillingCard = ({
  planName,
  price,
  period,
  features,
  buttonText,
  isPopular = false,
  onButtonClick,
}: BillingCardProps) => (
  <div
    className={`flex flex-col justify-between relative p-6 bg-white rounded-xl shadow-sm border-2 transition-all duration-300 hover:shadow-lg w-full max-w-sm ${
      isPopular
        ? "border-indigo-500 ring-2 ring-indigo-100"
        : "border-gray-100 hover:border-indigo-200"
    }`}
  >
    <div>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-900 mb-4">{planName}</h3>

      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-gray-900">{price}$</span>
          <span className="text-gray-500 ml-1">/{period}</span>
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-green-600 text-sm"
              />
            </div>
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>

    <button
      onClick={onButtonClick}
      className={` cursor-pointer w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
        isPopular
          ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
          : "bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50"
      }`}
    >
      {buttonText}
    </button>
  </div>
);

export default BillingCard;
