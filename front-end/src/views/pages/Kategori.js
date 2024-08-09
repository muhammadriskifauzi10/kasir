import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../../components/Navigation";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Pen, Plus, Send, Trash } from "react-bootstrap-icons";
import swal from 'sweetalert';
import classNames from 'classnames';
import DataTable from 'react-data-table-component';
import moment, { max } from 'moment'

export const API_URL = process.env.REACT_APP_API_URL;

function Kategori() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ category: '', jumlah: '' });
  const [errors, setErrors] = useState([]);
  const [minDate, setMinDate] = useState(moment().format('YYYY-MM-DD'));
  const [maxDate, setMaxDate] = useState(moment().format('YYYY-MM-DD'));

  const handleClose = () => {
    setShow(false);
    setForm({ category: '' });
    setErrors([]);
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  // simpan data
  const handleSubmitModalCategory = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('category', form.category);

    axios.post(`${API_URL}/api/category`, formData)
      .then((response) => {
        if (response.data.status === 201) {
          swal("Berhasil", "Kategori berhasil ditambahkan!", "success");

          setForm({ category: '' });
          setErrors([]);

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          setErrors(response.data.data);
        }
      })
      .catch((error) => {
        swal("Oops", "Terjadi kesalahan!", "error");
        console.log(error);
      });
  };

  useEffect(() => {
    getUser()
  }, [minDate, maxDate])

  // get data category
  async function getUser() {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/category/datatable`, {
        minDate: minDate, // Sesuaikan dengan struktur request body API Anda
        maxDate: maxDate,
      });
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // loop old data
  // const DataKategori = () => {
  //   return data.map((value, key) => (
  //     <tr key={key}>
  //       <td>{key + 1}</td>
  //       <td>{value.name}</td>
  //       <td>
  //         <div className="d-flex justify-content-center align-items-center gap-2">
  //           <Button variant="primary" style={{ width: "90px" }}>Edit</Button>
  //           <Button variant="danger" style={{ width: "90px" }}>Hapus</Button>
  //         </div>
  //       </td>
  //     </tr>
  //   ))
  // }

  const handleEdit = (id) => {
    console.log(`Edit item with id ${id}`);
    // Tambahkan logika untuk mengedit item
  };

  const handleDelete = (id) => {
    console.log(`Delete item with id ${id}`);
    // Tambahkan logika untuk menghapus item
  };

  const columns = [
    {
      name: 'No',
      selector: (row, i) => i + 1,
      sortable: true,
    },
    {
      name: 'Tanggal Dibuat',
      selector: row => moment(row.created_at).format('YYYY-MM-DD'),
      sortable: true,
    },
    {
      name: 'Nama Kategori',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: '',
      cell: row => (
        <div className="d-flex align-items-center justify-content-center gap-2">
          <Button type="button" variant="warning" className="d-flex align-items-center justify-content-center gap-1 text-light" onClick={() => handleEdit(row.id)} style={{ width: '95px' }}>
            <Pen /> Edit
          </Button>
          <Button type="button" variant="danger" className="d-flex align-items-center justify-content-center gap-1" onClick={() => handleDelete(row.id)} style={{ width: '95px' }}>
            <Trash /> Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Navigation />
      <div className="container mt-4">
        <div className="row">
          <div className="col-xl-12">
            <div className="d-flex align-items-center justify-content-end">
              <Button type="button" variant="primary" className="d-flex align-items-center justify-content-center gap-1" onClick={handleShow}>
                <Plus /> Kategori
              </Button>
            </div>
            {/* Table Kategori */}
            {/* loop old data */}
            {/* <div className="table-responsive mt-4">
              <table className="table border-0 text-center">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama Kategori</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={3}>Loading...</td>
                    </tr>
                  ) : (
                    data.length > 0 ? <DataKategori /> : (
                      <tr>
                        <td colSpan={3}>Data Kosong</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div> */}
            <h3 className="m-0 mb-4">Daftar Kategori</h3>
            <div className="row mb-3">
              <div className="col-lg-6">
                <label className="form-label">Min</label>
                <input type="date" className="form-control" name="min" value={minDate} onChange={(e) => setMinDate(e.target.value)} />
              </div>
              <div className="col-lg-6">
                <label className="form-label">Min</label>
                <input type="date" className="form-control" name="min" value={maxDate} onChange={(e) => setMaxDate(e.target.value)} />
              </div>
            </div>
            <DataTable
              columns={columns}
              data={data}
              progressPending={loading} 
              pagination
            />
          </div>
        </div>
      </div>

      {/* Modal Kategori */}
      <Modal show={show} onHide={handleClose} centered>
        <form onSubmit={handleSubmitModalCategory} autoComplete="off">
          <Modal.Header closeButton>
            <Modal.Title>Tambah Kategori</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <input
                type="text"
                name="category"
                className={classNames('form-control', { 'is-invalid': errors.category })}
                id="category"
                value={form.category}
                onChange={handleChange}
              />
              {errors.category && (
                <div className="invalid-feedback">
                  {errors.category[0]}
                </div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary" className="d-flex align-items-center justify-content-center gap-1" style={{ width: '95px' }}>
              <Send /> Simpan
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default Kategori;
