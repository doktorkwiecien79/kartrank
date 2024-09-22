import { createContext, useState } from 'react';

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState({
    null: [
        {
        id: 1,
        name: "Arek",
        message: "Ciekawy arykuł",
        createdAt: new Date("2022-04-28T11:57:13.911Z"),
        likeCount: 5,
        wasLikedByMe: true,
        },
        {
        id: 2,
        name: "Maciek",
        message: "Dobra robota!",
        createdAt: new Date("2022-04-26T20:45:08.000Z"),
        likeCount: 8,
        wasLikedByMe: false,
        },
        {
        id: 3,
        name: "Bartek",
        message: "A mi się nie podoba",
        createdAt: new Date("2022-04-25T07:40:51.198Z"),
        likeCount: 0,
        wasLikedByMe: false,
        },
    ],
    2: [
        {
        id: 4,
        name: "Cezary",
        message: "Dobrze mówisz",
        createdAt: new Date("2022-04-29T18:25:43.511Z"),
        likeCount: 3,
        wasLikedByMe: false,
        },
    ]
  });

  const submitComment = (newComment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [newComment.parentId]: [...(prevComments[newComment.parentId] || []), newComment],
    }));
  };

  const removeComment = (oldComment) => {
    // change comments (delete oldComment)
  }

  return (
    <CommentContext.Provider value={{ comments, submitComment }}>
      {children}
    </CommentContext.Provider>
  );
};
