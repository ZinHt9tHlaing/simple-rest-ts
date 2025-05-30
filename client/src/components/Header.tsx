import { useSelector } from "react-redux";
import { Link } from "react-router";
import type { RootState } from "../store/store";

const Header = () => {
  const useInfo = useSelector((state: RootState) => state.auth.useInfo);

  return (
    <nav className="mb-10 mt-3 flex justify-between items-center">
      <Link to={"/"}>
        <h1 className="text-3xl font-bold">ShareNote</h1>
      </Link>
      <div className="space-x-3">
        {useInfo ? (
          <button
            type="button"
            className="text-red-600 bg-white font-semibold cursor-pointer py-1 px-2 rounded border-2 border-red-600 active:scale-90 duration-200"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to={"/login"}>
              <button
                type="button"
                className="text-white bg-black cursor-pointer py-1 px-2 rounded border-2 border-black active:scale-90 duration-200"
              >
                Login
              </button>
            </Link>
            <Link to={"/register"}>
              <button
                type="button"
                className="text-black bg-white cursor-pointer py-1 px-2 rounded border-2 border-black active:scale-90 duration-200"
              >
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
