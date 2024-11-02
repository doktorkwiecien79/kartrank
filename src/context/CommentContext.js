import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [fetchedComments, setFetchedComments] = useState([]);

  let comments = {};

  fetchedComments.forEach(comment => {
    if (!comments[comment.parentId]) {
      comments[comment.parentId] = [comment];
    }
    else {
      comments[comment.parentId].push(comment);
    }
  })

  console.log(comments);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get('/api/comments');
        console.log("res.data: ", res.data);
        setFetchedComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchComments();
  }, [])

  const submitComment = (newComment) => {
    setFetchedComments((prevComments) => (
      [...prevComments, newComment]
    ));
  };

  const removeComment = (oldComment) => {
    const newItems = fetchedComments.filter(fetchedComment => fetchedComment !== oldComment);
    setFetchedComments(newItems);
  }

  return (
    <CommentContext.Provider value={{ comments, submitComment, removeComment }}>
      {children}
    </CommentContext.Provider>
  );
};
