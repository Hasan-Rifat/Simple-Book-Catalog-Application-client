import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

export default function MainLayout() {
  return (
    <div>
      <Header />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
