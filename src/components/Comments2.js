import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export const revalidate = 0;

export default function Comments() {
    const textRef = useRef(null)
    const router = useRouter()

    const action = async () => {
      if (textRef.current.value.trim() !== '') {
        
        const response = await fetch(`/api/posts/${router.asPath.slice(1)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            post: textRef.current.value
          }),
        })

        textRef.current.value = '' // Clear the input after submitting

        const data = await response.json()
        setComments(data)
      }
    }

  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/posts/${router.asPath.slice(1)}`)
        if (!response.ok) {
          throw new Error()
        }
        const data = await response.json()
        setComments(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchComments()
  }, [router.asPath])

  return (
    <div>
      <h1> Komentarze </h1>
      {comments.map((comment, index) => {
        return (
          <div key={index} className="">
            <div>{comment.timestamp}</div>
            <div>{comment.post}</div>
          </div>
        )
      })}
      <div className="flex flex-col items-center">
        <textarea
          className="m-4 bg-slate-100"
          type="text"
          id="name"
          name="name"
          size="10"
          autoComplete="true"
          ref={textRef}
          style={{ border: '1px solid black', padding: '2px' }}
        /> 
        <button className="btn m-4 bg-slate-500 text-white hover:bg-red-500" onClick={action}>
          Wyślij komentarz
        </button>
      </div>
    </div>
  )
}