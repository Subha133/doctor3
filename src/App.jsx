import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingWhatsApp from "./components/common/FloatingWhatsApp";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
