import React from "react";
import Navigation from "../../components/Navigation";
import { Plus } from "react-bootstrap-icons";

function Kategori() {
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
              <Plus /> Kategori
            </button>
            {/* Table Kategori */}
            <div className="table-responsive mt-4">
              <table className="table table-success border-0 text-center">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama Kategori</th>
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

export default Kategori;
