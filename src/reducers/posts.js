import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from "../constants/constants";

//Reducer for handling actions regarding post
export default function posts(posts = [], action) {

    switch (action.type) {

        case FETCH_ALL:
            return action.payload;

        case DELETE:
            return posts.filter((post) => post._id !== action.payload)

        case CREATE:
            return [...posts, action.payload];

        case UPDATE:
        case LIKE:

            posts = posts.map((post) => (post._id === action.payload.data._id ? action.payload.data : post));
            return posts;

        default:
            return posts;
    }
}

