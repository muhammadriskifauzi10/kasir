import React from "react";
import Navigation from "../../components/Navigation";
import { Plus } from "react-bootstrap-icons";

function Laporan() {
  return (
    <>
      <Navigation />
      <div className="container mt-4">
        <div className="row">
          <div className="col-xl-12">
            {/* Table Laporan */}
            <div className="table-responsive mt-4">
              <table className="table table-success border-0 text-center">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Laporan</th>
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

export default Laporan;
