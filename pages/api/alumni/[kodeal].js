import { getAlumniByKodeal, putAlumniByKodeal, deleteAlumniByKodeal } from "./alumni"

export default function handler(req, res) {
    try {
        const method = req.method
        if (method === 'GET') return getAlumniByKodeal(req, res)
        if (method === 'PUT') return putAlumniByKodeal(req, res)
        if (method === 'DELETE') return deleteAlumniByKodeal(req, res)
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}