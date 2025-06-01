import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import type { RootState } from "../store/store";
import { useLogoutMutation } from "../store/slices/endpoints/authApi";
import { clearUserInfo } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout({});
      dispatch(clearUserInfo());
      navigate("/");
      toast.info("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="mb-10 mt-3 flex justify-between items-center">
      <Link to={"/"}>
        <h1 className="text-3xl font-bold">ShareNote</h1>
      </Link>
      <div className="space-x-3">
        {userInfo ? (
          <button
            type="button"
            disabled={isLoading}
            onClick={logoutHandler}
            className="text-red-600 disabled:cursor-not-allowed w-[75px] bg-white font-semibold cursor-pointer py-1 px-2 rounded border-2 border-red-600 active:scale-90 duration-200"
          >
            {isLoading ? (
              <div className="w-4 h-4 mx-auto border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              "Logout"
            )}
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
