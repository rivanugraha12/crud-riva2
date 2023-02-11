import React, { useState, useEffect } from 'react'
import Navigasi from '../components/Navigasi'
import Link from 'next/link'
import Router from 'next/router'


export async function getServerSideProps(ctx){

    const reqPengurus = await fetch(`${process.env.PUBLIC_URL}/api/pengurus`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const resPengurus = await reqPengurus.json()
    const data = resPengurus.code === 200 ? resPengurus.data : []
    return {
        props: {
            data
        }
    }
}

const Pengurus = ({ data }) => {

    const [fields, setFields] = useState({
        ktp: '',
        nama: '',
        jenisKelamin: 'L',
        angkatan: '',
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
        const reqTambahPengurus = await fetch('/api/pengurus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })
        const resTambahPengurus = await reqTambahPengurus.json()
        if(resTambahPengurus.code === 200) return alert(resTambahPengurus.message),Router.push('/pengurus')
        return alert(resTambahPengurus.message)
    }

    const handlerDelete = async(e, ktp) => {
        e.preventDefault()
        const status = confirm(`Yakin ingin menghapus data pengurus dengan KTP : ${ktp} ?`)
        const reqDeletePengurus = await fetch(`/api/pengurus/${ktp}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        })
        const resDeletePengurus = await reqDeletePengurus.json()
        if(resDeletePengurus.code !== 200){
            alert(resDeletePengurus.message)
        }else{
            alert(resDeletePengurus.message)
            Router.push('/pengurus')
        }
    }

    return (
        <>
            <Navigasi/>
            <div className="container mt-5">
            <button type="button" className="btn btn-success mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                [+] Tambah Pengurus
            </button>

            <div className="modal modal-lg fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Tambah Data Pengurus</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    
                    <div className="mb-3 row">
                        <label htmlFor="ktp" className="col-sm-3 col-form-label">Kartu Tanda Pengurus</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="ktp" name='ktp' onChange={e => handlerChange(e)} value={fields.ktp}/>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="nama" className="col-sm-3 col-form-label">Nama Pengurus</label>
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
                        <label htmlFor="angkatan" className="col-sm-3 col-form-label">Angkatan</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="angkatan" name='angkatan' onChange={e => handlerChange(e)} value={fields.angkatan}/>
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
                            <th scope="col">KTP</th>
                            <th scope="col">Nama Pengurus</th>
                            <th scope="col">Jenis Kelamin</th>
                            <th scope="col">Angkatan</th>
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
                                                <td>{element.ktp}</td>
                                                <td>{element.nama}</td>
                                                <td>{element.jenisKelamin}</td>
                                                <td>{element.angkatan}</td>
                                                <td>{element.nohp}</td>
                                                <td className='d-flex flex-row gap-1'>
                                                    <Link href={`/pengurus/${element.ktp}`} className='btn btn-warning btn-sm'>Edit</Link>
                                                    <button className='btn btn-danger btn-sm' onClick={e => handlerDelete(e, element.ktp)}>Hapus</button>
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

export default Pengurus