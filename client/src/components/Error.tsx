import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section className="w-full h-screen bg-gray-800 text-white flex justify-center items-center">
      <div className="text-center">
        <h1 className="font-bold text-5xl mb-3">404 Not Found</h1>
        <p className="w-96 mb-5 text-gray-400">
          Oops! The recipe you're looking for might have been whisked away or
          doesn't exist anymore. Maybe try searching again or check out our
          homepage for some delicious ideas!
        </p>
        <button
          type="button"
          onClick={handleGoBack}
          className="border-2 border-white font-medium px-4 py-1 active:scale-95 hover:font-bold hover:bg-gray-200 hover:text-black duration-200"
        >
          Go Back
        </button>
      </div>
    </section>
  );
};

export default ErrorPage;
