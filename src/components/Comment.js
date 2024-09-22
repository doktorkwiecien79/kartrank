import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import { CommentSection } from './CommentSection'
import AddComment from './AddComment'   
import React, { useState, useContext } from 'react';
import { CommentContext } from '../context/CommentContext';

export function Comment({ id, name, createdAt, message }) {

    const [isReplying, setIsReplying] = useState(false);
    const { comments } = useContext(CommentContext);

    const handleReplyClick = () => {
        setIsReplying((prevState) => !prevState);
    };

    return (
        <>
          
            <div className='border rounded-lg p-2 w-full'>
                <div className='p-4'>
                    <div className='flex justify-between'>
                        <span> {name} </span>
                        <span>{new Date(createdAt).toLocaleString()}</span>
                    </div>
                    <div className='p-4'>
                        {message}
                    </div>
                    <div className='flex justify-end'>
                        {/* <ArrowUturnLeftIcon onClick={handleReplyClick} className="w-6" /> */}
                        <button onClick={handleReplyClick} className='btn'>Odpowiedz</button>                        
                    </div>
                    {isReplying && (
                        <div className='mt-4'>
                            <AddComment parentId={id} />
                        </div>
                    )}
                </div>
            </div>
            { comments[id]?.length > 0 && (
                <div className='pl-12'>
                    <CommentSection parent={id}/>
                </div>
            )}
        </>
    )
}