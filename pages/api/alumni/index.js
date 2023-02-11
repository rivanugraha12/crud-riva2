import { getAlumni, postAlumni } from "./alumni"

export default function handler(req, res) {
    try {
        const method = req.method
        if (method === 'GET') return getAlumni(req, res)
        if (method === 'POST') return postAlumni(req, res)
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}