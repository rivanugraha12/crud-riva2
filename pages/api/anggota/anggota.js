import db from '../../../config/database.js'

export const getAnggota = async(req, res) => {
    try {
        const dataAnggota = await db('anggota').select('*')
        if (dataAnggota.length === 0) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data belum ada' })
        return res.status(200).json({ code: 200, status: 'OK', message: 'Berhasil GET data Anggota', data: dataAnggota })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const getAnggotaByKta = async(req, res) => {
    try {
        const { kta } = req.query
        if (!kta) return res.status(400).json({ code: 404, status: 'Bad Request', message: 'KTA Dibutuhkan' })
        const dataAnggota = await db('anggota').select('*').where({ kta }).first()
        if (!dataAnggota) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data anggota tidak tersedia' })
        return res.status(200).json({ code: 200, status: 'OK', message: `Berhasil GET data Anggota, KTA : ${kta}`, data: dataAnggota })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const postAnggota = async(req, res) => {
    try {
        const { kta, nama, jenisKelamin, alamat, nohp } = req.body
        if (!kta || !nama || !jenisKelamin || !alamat || !nohp) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data yang dibutuhkan tidak sesuai' })
        const dataAnggota = await db('anggota').select('*').where({ kta }).first()
        if (dataAnggota) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data KTA sudah digunakan' })
        const tambahAnggota = await db('anggota').insert({ kta, nama, jenisKelamin, alamat, nohp })
        if (tambahAnggota.length === 0) return res.status(404).json({ code: 400, status: 'Bad request', message: 'Data Anggota Gagal ditambahkan' })
        return res.status(200).json({ code: 200, status: 'OK', message: `Berhasil Tambah data Anggota dengan KTA : ${kta}` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const putAnggotaByKta = async(req, res) => {
    try {
        const { kta, nama, jenisKelamin, alamat, nohp } = req.body
        if (!kta || !nama || !jenisKelamin || !alamat || !nohp) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data yang dibutuhkan tidak sesuai' })
        const dataAnggota = await db('anggota').select('*').where({ kta }).first()
        if (!dataAnggota) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data anggota tidak tersedia' })
        const updateAnggota = await db('anggota').where({ kta }).update({ nama, jenisKelamin, alamat, nohp })
        if (!updateAnggota) return res.status(400).json({ code: 400, status: 'Bad request', message: `Data anggota ${kta} gagal diperbarui` })
        return res.status(200).json({ code: 200, status: 'OK', message: `Data anggota ${kta} berhasil diperbarui` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const deleteAnggotaByKta = async(req, res) => {
    try {
        const { kta } = req.query
        const { status } = req.body
        if (!status) return res.status(400).json({ code: 400, status: 'Bad request', message: 'Status tidak disetujui' })
        if (!kta) return res.status(404).json({ code: 404, status: 'Bad request', message: 'KTA dibutuhkan' })
        const dataAnggota = await db('anggota').select('*').where({ kta }).first()
        if (!dataAnggota) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data anggota tidak tersedia' })
        const deleteAnggota = await db('anggota').where({ kta }).del()
        if (deleteAnggota.length === 0) return res.status(400).json({ code: 400, status: 'Bad request', message: `Data anggota ${kta} gagal dihapus` })
        return res.status(200).json({ code: 200, status: 'OK', message: `Data anggota ${kta} berhasil dihapus` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}