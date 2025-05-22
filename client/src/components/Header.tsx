import { Link } from "react-router";

const Header = () => {
  return (
    <nav className="mb-10 mt-3 flex justify-between items-center">
      <h1 className="text-3xl font-bold">ShareNote</h1>
      <div className="space-x-3">
        <Link to={"/login"}>
          <button
            type="button"
            className="text-white bg-black cursor-pointer py-1 px-2 rounded border-2 border-black active:scale-90 duration-200"
          >
            Login
          </button>
        </Link>
        <Link to={"/Register"}>
          <button
            type="button"
            className="text-black bg-white cursor-pointer py-1 px-2 rounded border-2 border-black active:scale-90 duration-200"
          >
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
