import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
// import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import moment from "moment";
import {
  ArrowClockwise,
  CartPlus,
  Printer,
  Receipt,
  XLg,
} from "react-bootstrap-icons";
import Card from "../../components/Card";
import axios from 'axios';
import swal from 'sweetalert';

function Dashboard() {
  // Produk
  const [item, setItem] = useState([]);

  // Faktur
  const [no_faktur, setNoFaktur] = useState("0001");
  const [tanggal_faktur, setTanggalFaktur] = useState(
    moment().format("YYYY-MM-D")
  );

  // Form Scanner
  const [kode_produk, setKodeProduk] = useState("");
  const [nama_produk, setNamaProduk] = useState("");
  const [harga_produk, setHargaProduk] = useState(0);
  const [jumlah_produk, setJumlahProduk] = useState(0);

  // Cart
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Mengambil data dari API
    axios.get('http://127.0.0.1:8000/api/products')
      .then(response => {
        // Mengatur data pengguna ke dalam state
        setItem(response.data['data']);
      })
      .catch(error => {
      });

    document.getElementById("kode_produk").focus();
  }, []);


  const handleAddCart = () => {
    document.getElementById("handleaddcart").disabled = true;

    setTimeout(function() {
      const data = item.find(
        (value) => value.code.toLowerCase() === kode_produk.toLowerCase()
      );
  
      if (data) {
        const existingCartItem = cart.find(
          (value) => value.kode_produk.toLowerCase() === kode_produk.toLowerCase()
        );
  
        if (existingCartItem) {
          setCart(
            cart.map((value) =>
              value.kode_produk.toLowerCase() === kode_produk.toLowerCase()
                ? {
                    ...value,
                    jumlah_produk:
                      parseInt(value.jumlah_produk) + parseInt(jumlah_produk),
                    total_harga:
                      value.total_harga +
                      parseInt(harga_produk) * parseInt(jumlah_produk),
                  }
                : value
            )
          );
        } else {
          // Add the new item to the cart
          const data_cart = {
            kode_produk,
            nama_produk,
            harga_produk,
            jumlah_produk: parseInt(jumlah_produk), // Ensure it's a number
            total_harga: parseInt(harga_produk) * parseInt(jumlah_produk),
          };
          setCart([...cart, data_cart]);
        }
      }
      else {
        swal("Opps", "Produk wajib diisi!", "warning");
      }
  
      document.getElementById("handleaddcart").disabled = false;
    }, 1000)
  };

  const handleDeleteCart = (id) => {
    const find_cart = cart.filter((v) => v.kode_produk !== id);

    setCart(find_cart);
  };

  const handleReset = () => {
    setKodeProduk("");
    document.getElementById("kode_produk").value = "";
    document.getElementById("kode_produk").focus();
    setNamaProduk("");
    setHargaProduk(0);
    setJumlahProduk(0);
  };

  const LoopCart = () => {
    return cart.map((value, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>
            <strong>{value.nama_produk}</strong>
          </td>
          <td>
            <strong>
              RP.{" "}
              {parseInt(value.harga_produk)
                .toLocaleString()
                .replaceAll(",", ".")}
            </strong>
          </td>
          <td>
            <strong>{value.jumlah_produk}</strong>
          </td>
          <td>
            <strong>
              RP.{" "}
              {parseInt(value.total_harga)
                .toLocaleString()
                .replaceAll(",", ".")}
            </strong>
          </td>
          <td>
            <div>
              <button
                type="reset"
                className="btn btn-danger"
                onClick={() => handleDeleteCart(value.kode_produk)}
              >
                <div className="d-flex align-items-center gap-2">
                  <XLg height={24} />
                </div>
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <Navigation />
      <div className="container mt-4">
        <div className="row">
          <div className="col-xl-2 mb-3">
            {/* Faktur */}
            <Card>
              <Card.header css="bg-dark text-light">
                <div className="d-flex align-items-center justify-content-between">
                  Faktur
                  <Receipt />
                </div>
              </Card.header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <input
                    type="text"
                    className="form-control"
                    name="no_faktur"
                    value={no_faktur}
                    disabled
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <input
                    type="date"
                    className="form-control"
                    name="no_faktur"
                    value={tanggal_faktur}
                    disabled
                  />
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
          <div className="col-xl-10">
            {/* Scanner  */}
            <form className="row align-items-end" autoComplete="off">
              {/* Kode Produk */}
              <div className="col-lg-4 mb-3">
                <div>
                  <label htmlFor="kode_produk" className="form-label">
                    Kode Produk
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="kode_produk"
                    id="kode_produk"
                    onChange={(e) => {
                      const cariItem = item.filter(
                        (value) =>
                          value.code.toLocaleLowerCase() ===
                          e.target.value.toLocaleLowerCase()
                      );

                      setKodeProduk(
                        cariItem.length > 0 ? cariItem[0].code : ""
                      );
                      setNamaProduk(
                        cariItem.length > 0 ? cariItem[0].name : ""
                      );
                      setHargaProduk(
                        cariItem.length > 0 ? cariItem[0].price : 0
                      );
                      setJumlahProduk(cariItem.length > 0 ? 1 : 0);
                    }}
                  />
                </div>
              </div>
              {/* Nama Produk */}
              <div className="col-lg-2 mb-3">
                <div>
                  <label htmlFor="nama_produk" className="form-label">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="nama_produk"
                    id="nama_produk"
                    disabled
                    value={nama_produk}
                    onChange={(e) => setNamaProduk(e.target.value)}
                  />
                </div>
              </div>
              {/* Harga Produk */}
              <div className="col-lg-2 mb-3">
                <div>
                  <label htmlFor="harga_produk" className="form-label">
                    Harga Produk
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="harga_produk"
                    id="harga_produk"
                    disabled
                    value={parseInt(harga_produk).toLocaleString().replaceAll(",", ".")}
                    onChange={(e) => setHargaProduk(e.target.value)}
                  />
                </div>
              </div>
              {/* Jumlah Produk */}
              <div className="col-lg-2 mb-3">
                <div>
                  <label htmlFor="jumlah_produk" className="form-label">
                    Jumlah Produk
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="jumlah_produk"
                    id="jumlah_produk"
                    value={jumlah_produk}
                    onChange={(e) => setJumlahProduk(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-2 mb-3 d-flex align-items-center gap-2">
                <div>
                  {/* Add Cart */}
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleAddCart}
                    id="handleaddcart"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <CartPlus height={24} />
                    </div>
                  </button>
                </div>
                <div>
                  {/* Reset */}
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleReset}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <ArrowClockwise height={24} />
                    </div>
                  </button>
                </div>
              </div>
            </form>

            {/* Table Cart */}
            <div className="table-responsive">
              <table className="table table-success border-0 text-center">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama Produk</th>
                    <th scope="col">Harga Produk</th>
                    <th scope="col">Jumlah Produk</th>
                    <th scope="col">Total Harga</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.length > 0 ? (
                    <LoopCart />
                  ) : (
                    <tr>
                      <td colSpan={6}>-_- Keranjang Kosong -_-</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div className="card rounded-0 border-success border-2">
              <div className="card-body d-flex align-items-center justify-content-end">
                <table>
                  <tbody>
                    <tr>
                      <td>Total Jumlah Barang</td>
                      <td width={30} className="text-center">
                        :
                      </td>
                      <td>
                        <strong>
                          {cart.length > 0
                            ? cart
                                .reduce((accumulator, currentValue) => {
                                  return (
                                    accumulator + currentValue.jumlah_produk
                                  );
                                }, 0)
                                .toLocaleString()
                                .replaceAll(",", ".")
                            : "0"}
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Total Pembayaran</td>
                      <td width={30} className="text-center">
                        :
                      </td>
                      <td>
                        <strong className="text-success">
                          RP.{" "}
                          {cart.length > 0
                            ? cart
                                .reduce((accumulator, currentValue) => {
                                  return accumulator + currentValue.total_harga;
                                }, 0)
                                .toLocaleString()
                                .replaceAll(",", ".")
                            : "0"}
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Print */}
            <div className="d-flex align-items-center justify-content-end mt-3">
              <div className="d-flex align-items-center justify-content-end">
                <div className="d-flex align-items-center gap-2">
                  <button
                    type="reset"
                    className="btn btn-danger"
                    onClick={() => {
                      setCart([]);
                      document.getElementById("kode_produk").value = "";
                      document.getElementById("kode_produk").focus();
                    }}
                  >
                    <strong className="d-flex align-items-center gap-2">
                      <ArrowClockwise height={24} /> Batalkan
                    </strong>
                  </button>
                  <button type="reset" className="btn btn-success">
                    <strong className="d-flex align-items-center gap-2">
                      <Printer height={24} /> Print Struk Pembayaran
                    </strong>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
