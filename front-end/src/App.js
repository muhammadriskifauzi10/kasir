import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./views/pages/Dashboard";
import Produk from "./views/pages/Produk";
import Kategori from "./views/pages/Kategori";
import Laporan from "./views/pages/Laporan";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/kategori" element={<Kategori />} />
          <Route path="/laporan" element={<Laporan />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
