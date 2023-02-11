import { getPengurusByKtp, putPengurusByKtp, deletePengurusByKtp } from "./pengurus"

export default function handler(req, res) {
    try {
        const method = req.method
        if (method === 'GET') return getPengurusByKtp(req, res)
        if (method === 'PUT') return putPengurusByKtp(req, res)
        if (method === 'DELETE') return deletePengurusByKtp(req, res)
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}