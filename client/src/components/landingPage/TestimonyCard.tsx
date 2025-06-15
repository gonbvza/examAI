import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface TestimonyCardProps {
  study: string;
  title: string;
  description: string;
}

const TestimonyCard = ({ study, title, description }: TestimonyCardProps) => (
  <div className="group flex flex-col items-start p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 w-full max-w-sm border border-gray-100 hover:border-indigo-200">
    <div className="flex items-center gap-4 mb-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-300">
          <FontAwesomeIcon
            icon={faUser}
            className="text-indigo-600 text-lg"
          />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-1 text-left">
          {title}
        </h3>
        <p className="text-sm text-indigo-600 font-medium">
          {study}
        </p>
      </div>
    </div>

    <blockquote className="text-gray-700 leading-relaxed">
      "{description}"
    </blockquote>
  </div>
);

export default TestimonyCard;
