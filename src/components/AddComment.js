import React, { useState, useContext, useRef } from 'react';
import { CommentContext } from '../context/CommentContext';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


export default function AddComment({ pageName, parentId }) {
  console.log("AddComment: ", pageName);
  const [text, setText] = useState('Wpisz komentarz')
  const [name, setName] = useState('Wpisz nick')
  const formRef = useRef(null);
  
  const { submitComment, removeComment } = useContext(CommentContext); 

const handleSubmit = async (event) => {
    event.preventDefault(); 
    if (text !== '' && name !== '') {
      const newComment = {
        id: uuidv4(),
        parentId,
        name,
        page: pageName,
        message: text,
        createdAt: new Date(),
      };
      // call function to add comment locally
      submitComment(newComment);
      
      try {
        // call an API to change the database
        const res = await axios('/api/comments', {
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
          },
          data: newComment,
        });
      }
      catch (err) {
        // on catch, call function to remove comment locally
        console.log(err);
        removeComment(newComment);
      }
      // Clear the form fields
      formRef.current.reset();
      setText('');
      setName('');
    }
  };

  return (
    <div className="flex flex-col items-center w-full mt-2 p-2">
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col items-center w-full">
        <input
          className="p-2 mb-1 bg-gray-100 border rounded-lg w-full"
          id="name"
          name="name"
          autoComplete="true"
          onChange={(event) => setName(event.target.value)}
          value={name}
          style={{ border: '1px solid black', padding: '1px' }}
        />
        <textarea
          className="p-2 bg-gray-100 border rounded-lg w-full"
          id="comment"
          name="comment"
          rows="5"
          autoComplete="true"
          onChange={(event) => setText(event.target.value)}
          value={text}
          style={{ border: '1px solid black', padding: '1px' }}
        />
        <button
          type="submit"
          className="btn m-4 bg-gray-500 text-white hover:bg-red-500"
        >
          Wyślij komentarz
        </button>
      </form>
    </div>
  );

}