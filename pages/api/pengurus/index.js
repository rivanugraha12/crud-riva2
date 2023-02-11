import { getPengurus, postPengurus } from "./pengurus"

export default function handler(req, res) {
    try {
        const method = req.method
        if (method === 'GET') return getPengurus(req, res)
        if (method === 'POST') return postPengurus(req, res)
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}