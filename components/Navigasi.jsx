import React from 'react'
import Link from 'next/link'

const Navigasi = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container">
                <Link className="navbar-brand text-white" href="/">Riva</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link text-white" href="/alumni">Alumni</Link>
                            <Link className="nav-link text-white" href="/anggota">Anggota</Link>
                            <Link className="nav-link text-white" href="/pengawas">Pengawas</Link>
                            <Link className="nav-link text-white" href="/pengurus">Pengurus</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigasi