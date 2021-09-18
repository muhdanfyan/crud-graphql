import React from 'react'
import { Link } from 'react-router-dom'

import { GET_BOOKS } from 'gql/books'
import { useQuery } from '@apollo/client'

export default function List(props) {

    const {loading, error, data} = useQuery(GET_BOOKS, {
        fetchPolicy: "no-cache"
    })

    if (loading) return "Loading.."
    
    if (error) return error?.graphQLErrors.map(error => error)?? error.networkError

    if (data.getAllBooks.length === 0) return <h1>tidak ada Data <Link to="/books/new">Buat Baru</Link> </h1>

    return (
        <div>
            <h1>
                List Buku
             <Link to="/books/new" style={{fontSize:12}}>
                 (+Buat Baru)
             </Link>
            </h1>
            {data.getAllBooks.map((item) => {
                return <div key={item._id}> {item.title} (<Link to={`/books/${item._id}/edit`}>Edit</Link>) 
                (<span 
                style={{
                    textDecoration:"underline", 
                    cursor: "pointer", 
                    color: "blue"
                }}>Delete</span>)</div>;
            })}
        </div>
    )
}
