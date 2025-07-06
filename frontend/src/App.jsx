import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";           // create this file if not present
import Snippets from "./pages/Snippets";   // optional if using a snippets page
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/snippets" element={<Snippets />} />
        </Routes>
      </BrowserRouter>
    </>

  );
};

export default App;
