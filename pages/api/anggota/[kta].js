import { getAnggotaByKta, putAnggotaByKta, deleteAnggotaByKta } from "./anggota"

export default function handler(req, res) {
    try {
        const method = req.method
        if (method === 'GET') return getAnggotaByKta(req, res)
        if (method === 'PUT') return putAnggotaByKta(req, res)
        if (method === 'DELETE') return deleteAnggotaByKta(req, res)
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}