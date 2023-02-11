import db from '../../../config/database.js'

export const getAlumni = async(req, res) => {
    try {
        const dataAlumni = await db('alumni').select('*')
        if (dataAlumni.length === 0) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data belum ada' })
        return res.status(200).json({ code: 200, status: 'OK', message: 'Berhasil GET data Alumni', data: dataAlumni })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const getAlumniByKodeal = async(req, res) => {
    try {
        const { kodeal } = req.query
        if (!kodeal) return res.status(400).json({ code: 404, status: 'Bad Request', message: 'KODEAL Dibutuhkan' })
        const dataAlumni = await db('alumni').select('*').where({ kodeal }).first()
        if (!dataAlumni) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data alumni tidak tersedia' })
        return res.status(200).json({ code: 200, status: 'OK', message: `Berhasil GET data Alumni, KODEAL : ${kodeal}`, data: dataAlumni })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const postAlumni = async(req, res) => {
    try {
        const { kodeal, nama, jenisKelamin, alamat, nohp } = req.body
        if (!kodeal || !nama || !jenisKelamin || !alamat || !nohp) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data yang dibutuhkan tidak sesuai' })
        const dataAlumni = await db('alumni').select('*').where({ kodeal }).first()
        if (dataAlumni) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data KODEAL sudah digunakan' })
        const tambahAlumni = await db('alumni').insert({ kodeal, nama, jenisKelamin, alamat, nohp })
        if (tambahAlumni.length === 0) return res.status(404).json({ code: 400, status: 'Bad request', message: 'Data Alumni Gagal ditambahkan' })
        return res.status(200).json({ code: 200, status: 'OK', message: `Berhasil Tambah data Alumni dengan KODEAL : ${kodeal}` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const putAlumniByKodeal = async(req, res) => {
    try {
        const { kodeal, nama, jenisKelamin, alamat, nohp } = req.body
        if (!kodeal || !nama || !jenisKelamin || !alamat || !nohp) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data yang dibutuhkan tidak sesuai' })
        const dataAlumni = await db('alumni').select('*').where({ kodeal }).first()
        if (!dataAlumni) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data alumni tidak tersedia' })
        const updateAlumni = await db('alumni').where({ kodeal }).update({ nama, jenisKelamin, alamat, nohp })
        if (!updateAlumni) return res.status(400).json({ code: 400, status: 'Bad request', message: `Data alumni ${kodeal} gagal diperbarui` })
        return res.status(200).json({ code: 200, status: 'OK', message: `Data alumni ${kodeal} berhasil diperbarui` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const deleteAlumniByKodeal = async(req, res) => {
    try {
        const { kodeal } = req.query
        const { status } = req.body
        if (!status) return res.status(400).json({ code: 400, status: 'Bad request', message: 'Status tidak disetujui' })
        if (!kodeal) return res.status(404).json({ code: 404, status: 'Bad request', message: 'KODEAL dibutuhkan' })
        const dataAlumni = await db('alumni').select('*').where({ kodeal }).first()
        if (!dataAlumni) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data alumni tidak tersedia' })
        const deleteAlumni = await db('alumni').where({ kodeal }).del()
        if (deleteAlumni.length === 0) return res.status(400).json({ code: 400, status: 'Bad request', message: `Data alumni ${kodeal} gagal dihapus` })
        return res.status(200).json({ code: 200, status: 'OK', message: `Data alumni ${kodeal} berhasil dihapus` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}