import React from "react";
import Navigation from "../../components/Navigation";
import { Plus } from "react-bootstrap-icons";
import Card from "../../components/Card";

function Produk() {
  return (
    <>
      <Navigation />
      <div className="container mt-4">
        <div className="row">
          <div className="col-xl-12">
            <button
              type="button"
              className="btn btn-primary d-flex align-items-center gap-2"
            >
              <Plus /> Produk
            </button>
            {/* Table Produk */}
            <div className="table-responsive mt-4">
              <table className="table table-success border-0 text-center">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Kategori</th>
                    <th scope="col">Kode Produk</th>
                    <th scope="col">Nama Produk</th>
                    <th scope="col">Harga Produk</th>
                    <th scope="col">Jumlah Produk</th>
                    <th scope="col">Harga</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Produk;
