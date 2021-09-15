import React from 'react'
import { Link } from 'react-router-dom'


export default function List(props) {
    return (
        <div>
            <h1>
                List Buku
             <Link to="/books/new" style={{fontSize:12}}>
                 (+Buat Baru)
             </Link>
            </h1>
        </div>
    )
}
