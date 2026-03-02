import ScrollToTop from "../utils/ScrollToTop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MiniCartPopup from "../components/MiniCartPopup";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>

      <ScrollToTop />
      <Navbar />
      <MiniCartPopup />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;