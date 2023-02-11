import db from '../../../config/database.js'

export const getPengurus = async(req, res) => {
    try {
        const dataPengurus = await db('pengurus').select('*')
        if (dataPengurus.length === 0) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data belum ada' })
        return res.status(200).json({ code: 200, status: 'OK', message: 'Berhasil GET data Pengurus', data: dataPengurus })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const getPengurusByKtp = async(req, res) => {
    try {
        const { ktp } = req.query
        if (!ktp) return res.status(400).json({ code: 404, status: 'Bad Request', message: 'KTP Dibutuhkan' })
        const dataPengurus = await db('pengurus').select('*').where({ ktp }).first()
        if (!dataPengurus) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data pengurus tidak tersedia' })
        return res.status(200).json({ code: 200, status: 'OK', message: `Berhasil GET data Pengurus, KTP : ${ktp}`, data: dataPengurus })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const postPengurus = async(req, res) => {
    try {
        const { ktp, nama, jenisKelamin, angkatan, nohp } = req.body
        if (!ktp || !nama || !jenisKelamin || !angkatan || !nohp) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data yang dibutuhkan tidak sesuai' })
        const dataPengurus = await db('pengurus').select('*').where({ ktp }).first()
        if (dataPengurus) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data KTP sudah digunakan' })
        const tambahPengurus = await db('pengurus').insert({ ktp, nama, jenisKelamin, angkatan, nohp })
        if (tambahPengurus.length === 0) return res.status(404).json({ code: 400, status: 'Bad request', message: 'Data Pengurus Gagal ditambahkan' })
        return res.status(200).json({ code: 200, status: 'OK', message: `Berhasil Tambah data Pengurus dengan KTP : ${ktp}` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const putPengurusByKtp = async(req, res) => {
    try {
        const { ktp, nama, jenisKelamin, angkatan, nohp } = req.body
        if (!ktp || !nama || !jenisKelamin || !angkatan || !nohp) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data yang dibutuhkan tidak sesuai' })
        const dataPengurus = await db('pengurus').select('*').where({ ktp }).first()
        if (!dataPengurus) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data pengurus tidak tersedia' })
        const updatePengurus = await db('pengurus').where({ ktp }).update({ nama, jenisKelamin, angkatan, nohp })
        if (!updatePengurus) return res.status(400).json({ code: 400, status: 'Bad request', message: `Data pengurus ${ktp} gagal diperbarui` })
        return res.status(200).json({ code: 200, status: 'OK', message: `Data pengurus ${ktp} berhasil diperbarui` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const deletePengurusByKtp = async(req, res) => {
    try {
        const { ktp } = req.query
        const { status } = req.body
        if (!status) return res.status(400).json({ code: 400, status: 'Bad request', message: 'Status tidak disetujui' })
        if (!ktp) return res.status(404).json({ code: 404, status: 'Bad request', message: 'KTP dibutuhkan' })
        const dataPengurus = await db('pengurus').select('*').where({ ktp }).first()
        if (!dataPengurus) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data pengurus tidak tersedia' })
        const deletePengurus = await db('pengurus').where({ ktp }).del()
        if (deletePengurus.length === 0) return res.status(400).json({ code: 400, status: 'Bad request', message: `Data pengurus ${ktp} gagal dihapus` })
        return res.status(200).json({ code: 200, status: 'OK', message: `Data pengurus ${ktp} berhasil dihapus` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}