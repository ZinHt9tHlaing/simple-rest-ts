import { Outlet } from "react-router";
import { HeaderComponent } from "../components";

const Main = () => {
  return (
    <section className="px-3 max-w-4xl mx-auto">
      <HeaderComponent />
      <Outlet />
    </section>
  );
};

export default Main;
