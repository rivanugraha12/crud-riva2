import React, { useState, useEffect } from 'react'
import Navigasi from '../../components/Navigasi'
import Router from 'next/router'

export async function getServerSideProps(ctx){
    const { ktp } = ctx.query
    const reqDataPengurus = await fetch(`${process.env.PUBLIC_URL}/api/pengurus/${ktp}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const resDataPengurus = await reqDataPengurus.json()
    const data = resDataPengurus.code === 200 ? resDataPengurus.data : []
    return {
        props: {
            ktp,
            data
        }
    }
}

const DetailPengurus = ({ ktp, data }) => {

    const [fields, setFields] = useState(data)

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
        const reqUpdatePengurus = await fetch(`/api/pengurus/${ktp}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })
        const resUpdatePengurus = await reqUpdatePengurus.json()
        if(resUpdatePengurus.code !== 200) return alert(resUpdatePengurus.message)
        alert(resUpdatePengurus.message)
        Router.push('/pengurus')
    }
    
    useEffect(() => {
        if(data.length === 0){
            alert('Data pengurus tidak tersedia')
            Router.push('/pengurus')
        }
    }, [data])
    
    return (
        <>
            <Navigasi/>
            <div className="jumbotron mt-5 container">
                <h1 className="display-6">{fields.ktp} - {fields.nama}</h1>
                <div className="my-4 row">
                        <label htmlFor="ktp" className="col-sm-3 col-form-label">Kode Tanda Pengurus</label>
                        <div className="col-sm-9">
                            <input type="text" readonly className="form-control-plaintext" id="ktp" name='ktp' value={fields.ktp}/>
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
                                    </>:
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

                    <div className="mb-3 row">
                        <div className="col-sm-3"/>
                        <div className="col-sm-9">
                            <button className='btn btn-success' onClick={e => handlerSubmit(e)}>Update</button>
                        </div>
                    </div>

            </div>
        </>
    )
}

export default DetailPengurus