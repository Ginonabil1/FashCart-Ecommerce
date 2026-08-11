import { Outlet } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => (
  <>
    <Navbar />
    <main className="container page-shell">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default App;
