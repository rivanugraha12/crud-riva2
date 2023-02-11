import React, { useState, useEffect } from 'react'
import Navigasi from '../components/Navigasi'
import Link from 'next/link'
import Router from 'next/router'


export async function getServerSideProps(ctx){

    const reqAnggota = await fetch(`${process.env.PUBLIC_URL}/api/pengawas`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const resAnggota = await reqAnggota.json()
    const data = resAnggota.code === 200 ? resAnggota.data : []
    return {
        props: {
            data
        }
    }
}

const Pengawas = ({ data }) => {

    const [fields, setFields] = useState({
        bpo: '',
        nama: '',
        jenisKelamin: 'L',
        alamat: '',
        nohp: ''
    }) 

    const handlerChange = (e) => {
        e.preventDefault()
        const name = e.target.name
        setFields({
            ...fields,
            [name]: e.target.value
        })
    }

    const handlerSubmit = async(e) => {
        e.preventDefault()
        const reqTambahAnggota = await fetch('/api/pengawas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })
        const resTambahAnggota = await reqTambahAnggota.json()
        if(resTambahAnggota.code === 200) return alert(resTambahAnggota.message),Router.push('/pengawas')
        return alert(resTambahAnggota.message)
    }

    const handlerDelete = async(e, bpo) => {
        e.preventDefault()
        const status = confirm(`Yakin ingin menghapus data pengawas dengan BPO : ${bpo} ?`)
        const reqDeleteAnggota = await fetch(`/api/pengawas/${bpo}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        })
        const resDeleteAnggota = await reqDeleteAnggota.json()
        if(resDeleteAnggota.code !== 200){
            alert(resDeleteAnggota.message)
        }else{
            alert(resDeleteAnggota.message)
            Router.push('/pengawas')
        }
    }

    return (
        <>
            <Navigasi/>
            <div className="container mt-5">
            <button type="button" className="btn btn-success mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                [+] Tambah Pengawas
            </button>

            <div className="modal modal-lg fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Tambah Data Pengawas</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    
                    <div className="mb-3 row">
                        <label htmlFor="bpo" className="col-sm-3 col-form-label">Kode Pengawas Organisasi</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="bpo" name='bpo' onChange={e => handlerChange(e)} value={fields.bpo}/>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="nama" className="col-sm-3 col-form-label">Nama Pengawas</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="nama" name='nama' onChange={e => handlerChange(e)} value={fields.nama}/>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="jenisKelamin" className="col-sm-3 col-form-label">Jenis Kelamin</label>
                        <div className="col-sm-9">
                            <select className="form-select" aria-label="jenisKelamin" id="jenisKelamin" name='jenisKelamin' onChange={e => handlerChange(e)}>
                            {
                                fields.jenisKelamin === 'L'?
                                <>
                                    <option value="L" selected>Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </>
                                :
                                <>
                                    <option value="L">Laki-laki</option>
                                    <option value="P" selected>Perempuan</option>
                                </>
                            }
                            </select>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="alamat" className="col-sm-3 col-form-label">Alamat</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="alamat" name='alamat' onChange={e => handlerChange(e)} value={fields.alamat}/>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="nohp" className="col-sm-3 col-form-label">Nomor Telepone</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="nohp" name='nohp' onChange={e => handlerChange(e)} value={fields.nohp}/>
                        </div>
                    </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success" onClick={e => handlerSubmit(e)}>Simpan</button>
                </div>
                </div>
            </div>
            </div>
                <table className="table">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">BPO</th>
                            <th scope="col">Nama Pengawas</th>
                            <th scope="col">Jenis Kelamin</th>
                            <th scope="col">Alamat</th>
                            <th scope="col">No Telepone</th>
                            <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length !== 0 ?
                            data.map((element, index) => {
                                    return  <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td>{element.bpo}</td>
                                                <td>{element.nama}</td>
                                                <td>{element.jenisKelamin}</td>
                                                <td>{element.alamat}</td>
                                                <td>{element.nohp}</td>
                                                <td className='d-flex flex-row gap-1'>
                                                    <Link href={`/pengawas/${element.bpo}`} className='btn btn-warning btn-sm'>Edit</Link>
                                                    <button className='btn btn-danger btn-sm' onClick={e => handlerDelete(e, element.bpo)}>Hapus</button>
                                                </td>
                                            </tr>
                                }):
                            <tr>
                                <td>Data Belum Tersedia</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Pengawas