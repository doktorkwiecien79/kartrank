import { Comment } from "./Comment"
import { useContext } from 'react';
import { CommentContext } from '../context/CommentContext';

export function CommentSection({ parent }) {
    const { comments } = useContext(CommentContext);
    return (
    <div className='p-2 w-full'>

        {comments[parent]?.map(comment => (
        <div key={comment.id} className="pt-2">
            <Comment {...comment} />
        </div>))}
     </div>   
    );
}
