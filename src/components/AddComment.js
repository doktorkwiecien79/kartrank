import React, { useState, useContext, useRef } from 'react';
import { CommentContext } from '../context/CommentContext';


export default function AddComment({ pagePath, parentId }) {
  const [text, setText] = useState('Wpisz komentarz')
  const [name, setName] = useState('Wpisz nick')
  const formRef = useRef(null);
  
  const { submitComment, removeComment } = useContext(CommentContext); 


// Function to generate the next ascending ID for replies only
const getNextCommentId = () => {
  const allComments = Object.values(comments).flat();
  if (allComments.length === 0) return 1; // If no comments exist, start at 1

  // Get the highest existing id and add 1 to generate the next id for replies
  const highestId = Math.max(...allComments.map(comment => comment.id));
  return highestId + 1;
};


const handleSubmit = async (event) => {
    event.preventDefault(); 
    if (text !== '' && name !== '') {
      const newComment = {
        id: getNextCommentId(), // If root comment, id is null, otherwise get next id
        parentId,
        name,
        message: text,
        createdAt: new Date(),
      };
      // call function to add comment locally
      submitComment(newComment);
      
      try {
        // call an API to change the database
        const res = await fetch('/api/comments', {
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
          },
          body: {
            ...newComment
          }
        });
      }
      catch (err) {
        // on catch, call function to remove comment locally
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