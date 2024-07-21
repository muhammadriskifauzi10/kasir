import { BoxArrowRight } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const link = useLocation();
  return (
    <Navbar expand="lg" className="bg-primary navbar-dark">
      <Container>
        <Link to="/" className="navbar-brand">Kasir</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Link
              to="/produk"
              className={
                link.pathname === "/produk" ? "nav-link active" : "nav-link"
              }
            >
              Produk
            </Link>
            <Link
              to="/kategori"
              className={
                link.pathname === "/kategori" ? "nav-link active" : "nav-link"
              }
            >
              Kategori
            </Link>
            <Link
              to="/laporan"
              className={
                link.pathname === "/laporan" ? "nav-link active" : "nav-link"
              }
            >
              Laporan
            </Link>
            <form className="nav-link">
              <button
                type="submit"
                className="btn btn-sm btn-danger"
              >
                <strong className="d-flex align-items-center gap-2">
                  Keluar
                  <BoxArrowRight />
                </strong>
              </button>
            </form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
