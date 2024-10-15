// src/App.js
import React, { useState, useEffect } from 'react';
import { getBooks, addBook, deleteBook } from './api';
import './App.css';

const App = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ name: '', description: '' });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const data = await getBooks();
        setBooks(data);
    };

    const handleAddBook = async () => {
        if (newBook.name && newBook.description) {
            await addBook(newBook);
            setNewBook({ name: '', description: '' }); 
            fetchBooks(); 
        }
    };

    const handleDeleteBook = async (id) => {
        await deleteBook(id);
        fetchBooks(); 
    };

    return (
        <div >
           
            <h1 className='title'>To all the books i've read before  </h1>
            <h3>(p.s i still love you)</h3>
            <div>
                <h2>Add a New Book</h2>
                <input
                    type="text"
                    placeholder="Book Title"
                    value={newBook.name}
                    onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Book Description"
                    value={newBook.description}
                    onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                />
                <button onClick={handleAddBook}>Add Book</button>
            </div>
            <h2>All Books explored...</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <strong>{book.name}</strong>: {book.description}
                        <button onClick={() => handleDeleteBook(book.id)}>yeet it</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
