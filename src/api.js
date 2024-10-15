// src/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/books'; // Adjust the URL if necessary

export const getBooks = async () => {
    const response = await axios.get('http://127.0.0.1:5000/book');
    return response.data.books; // Return the array of books
};

export const addBook = async (book) => {
    const response = await axios.post(API_URL, book);
    return response.data;
};

export const deleteBook = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
