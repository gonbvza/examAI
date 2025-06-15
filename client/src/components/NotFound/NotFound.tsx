
const NotFound = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div>
      <div className="title-section px-[150px] py-[150px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-[16px] text-center">
          <h1 className="text-9xl font-bold text-[#6366F1] mb-8">
            404
          </h1>
          
          <h2 className="text-5xl font-bold mb-4">
            Page Not Found
          </h2>
          
          <p className="text-xl font-semibold text-[#4B5563] max-w-[64%] text-center mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="start-button purple-bg rounded-lg cursor-pointer transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl">
            <button 
              onClick={handleGoHome}
              className="px-[30px] py-[10px] text-white text-lg font-semibold cursor-pointer"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
