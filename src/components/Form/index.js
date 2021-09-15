import React from 'react'
import { Link, useHistory } from 'react-router-dom'


export default function Form(props) {
    const history = useHistory()
    console.log(history)
    
    function onSubmit(event){
        event.preventDefault();
        console.dir(event);

        const payload = {};

        for (let index = 0; index < event.target.length; index++) {
            const element = event.target[index];
            if(element.nodeName === "INPUT") payload[element.name] = element.value;
        }
        console.log(payload);
    }

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
