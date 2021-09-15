import {gql} from "@apollo/client";

export const NEW_BOOK = gql`
    mutation CreateBook(
        $title : String!
        $author : String!
        $description : String!
        $release_year : Int!
        $genre : String!
    ){
        createBook(
            title : $title
            author : String!
            description : $description
            release_year : $release_year
            genre : $genre
        ){
            _id
            title
            author
            description
            release_year
            genre
        }
    }
`;