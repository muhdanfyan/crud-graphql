import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { NEW_BOOK, GET_BOOK_DETAIL, UPDATE_BOOK } from 'gql/books'

import { useMutation, useLazyQuery } from '@apollo/client'


export default function Form(props) {
    const history = useHistory()
    const params = useParams()
    // console.log(history)

    const [newBook, { loading : loadingNewBook, error : errorNewBook }] = useMutation(NEW_BOOK)
    const [
        getBookDetail, 
        {loading : loadingBook, error : errorBook, data : dataBook}] = useLazyQuery(GET_BOOK_DETAIL, 
            { 
                variables:{ _id : params.id}
            })

    async function onSubmit(event){
        event.preventDefault();
        console.dir(event);

        const payload = {};

        for (let index = 0; index < event.target.length; index++) {
            const element = event.target[index];
            if(element.nodeName === "INPUT") payload[element.name] = element.value;
        }
        // console.log(payload);

        try {
            const resp = await newBook({
                variables:{
                    ...payload,
                    release_year: Number(payload.release_year),
                },
            })
            if (resp) history.push("/books")

        } catch (error) {
            console.log(error)
        }
        

    }

    React.useEffect(() => {
        if (params.id) getBookDetail()
    }, [params.id, getBookDetail])

    React.useEffect(() => {
        if (dataBook){
            const form = document.getElementById("form-book")

            for (let index = 0; index < form.length; index++) {
                const element = form[index]
                console.dir(element, dataBook)
                if (element.nodeName === "INPUT")
                    element.value = dataBook.getBook[element.name]
                
            }
        }
    }, [dataBook])

    return (
        <div>
            <h1>
                <Link to="/books" style={{ fontSize:12 }}>{`(<= Back)`}</Link>
                Form penambahan buku
            </h1>
                <form id="form-book" style={{ maxWidth:500}} onSubmit={onSubmit}>
                    <div style={{ display: "flex", flexDirection:"column" }}>
                        <label htmlFor="title">Title : </label>
                        <input type="text" id="title" name="title" />
                    </div>

                    <div style={{ display: "flex", flexDirection:"column" }}>
                        <label htmlFor="title">Author : </label>
                        <input type="text" id="author" name="author" />
                    </div>
                    
                    <div style={{ display: "flex", flexDirection:"column" }}>
                        <label htmlFor="title">Description : </label>
                        <input type="text" id="description" name="description" />
                    </div>
                    
                    <div style={{ display: "flex", flexDirection:"column" }}>
                        <label htmlFor="title">Release Year : </label>
                        <input type="number" id="release_year" name="release_year" />
                    </div>
                    
                    <div style={{ display: "flex", flexDirection:"column" }}>
                        <label htmlFor="title">Genre : </label>
                        <input type="text" id="genre" name="genre" />
                    </div>

                    <button type="button" onClick={() => history.push("/books")}>
                        Back
                    </button>
                    <button type="submit">
                        Save
                    </button>
                </form>
            
        </div>
    )
}
