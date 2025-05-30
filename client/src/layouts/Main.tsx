import { Outlet } from "react-router";
import { HeaderComponent } from "../components";
import { Bounce, ToastContainer } from "react-toastify";

const Main = () => {
  return (
    <section className="px-3 max-w-4xl mx-auto">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <HeaderComponent />
      <Outlet />
    </section>
  );
};

export default Main;
