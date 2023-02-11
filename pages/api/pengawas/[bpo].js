import { getPengawasByBpo, putPengawasByBpo, deletePengawasByBpo } from "./pengawas"

export default function handler(req, res) {
    try {
        const method = req.method
        if (method === 'GET') return getPengawasByBpo(req, res)
        if (method === 'PUT') return putPengawasByBpo(req, res)
        if (method === 'DELETE') return deletePengawasByBpo(req, res)
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}