import db from '../../../config/database.js'

export const getPengawas = async(req, res) => {
    try {
        const dataPengawas = await db('pengawas').select('*')
        if (dataPengawas.length === 0) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data belum ada' })
        return res.status(200).json({ code: 200, status: 'OK', message: 'Berhasil GET data Pengawas', data: dataPengawas })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const getPengawasByBpo = async(req, res) => {
    try {
        const { bpo } = req.query
        if (!bpo) return res.status(400).json({ code: 404, status: 'Bad Request', message: 'BPO Dibutuhkan' })
        const dataPengawas = await db('pengawas').select('*').where({ bpo }).first()
        if (!dataPengawas) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data pengawas tidak tersedia' })
        return res.status(200).json({ code: 200, status: 'OK', message: `Berhasil GET data Pengawas, BPO : ${bpo}`, data: dataPengawas })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const postPengawas = async(req, res) => {
    try {
        const { bpo, nama, jenisKelamin, alamat, nohp } = req.body
        if (!bpo || !nama || !jenisKelamin || !alamat || !nohp) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data yang dibutuhkan tidak sesuai' })
        const dataPengawas = await db('pengawas').select('*').where({ bpo }).first()
        if (dataPengawas) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data BPO sudah digunakan' })
        const tambahPengawas = await db('pengawas').insert({ bpo, nama, jenisKelamin, alamat, nohp })
        if (tambahPengawas.length === 0) return res.status(404).json({ code: 400, status: 'Bad request', message: 'Data Pengawas Gagal ditambahkan' })
        return res.status(200).json({ code: 200, status: 'OK', message: `Berhasil Tambah data Pengawas dengan BPO : ${bpo}` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const putPengawasByBpo = async(req, res) => {
    try {
        const { bpo, nama, jenisKelamin, alamat, nohp } = req.body
        if (!bpo || !nama || !jenisKelamin || !alamat || !nohp) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data yang dibutuhkan tidak sesuai' })
        const dataPengawas = await db('pengawas').select('*').where({ bpo }).first()
        if (!dataPengawas) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data pengawas tidak tersedia' })
        const updatePengawas = await db('pengawas').where({ bpo }).update({ nama, jenisKelamin, alamat, nohp })
        if (!updatePengawas) return res.status(400).json({ code: 400, status: 'Bad request', message: `Data pengawas ${bpo} gagal diperbarui` })
        return res.status(200).json({ code: 200, status: 'OK', message: `Data pengawas ${bpo} berhasil diperbarui` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const deletePengawasByBpo = async(req, res) => {
    try {
        const { bpo } = req.query
        const { status } = req.body
        if (!status) return res.status(400).json({ code: 400, status: 'Bad request', message: 'Status tidak disetujui' })
        if (!bpo) return res.status(404).json({ code: 404, status: 'Bad request', message: 'BPO dibutuhkan' })
        const dataPengawas = await db('pengawas').select('*').where({ bpo }).first()
        if (!dataPengawas) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data pengawas tidak tersedia' })
        const deletePengawas = await db('pengawas').where({ bpo }).del()
        if (deletePengawas.length === 0) return res.status(400).json({ code: 400, status: 'Bad request', message: `Data pengawas ${bpo} gagal dihapus` })
        return res.status(200).json({ code: 200, status: 'OK', message: `Data pengawas ${bpo} berhasil dihapus` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}