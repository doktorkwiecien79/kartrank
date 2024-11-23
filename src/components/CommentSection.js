import { Comment } from "./Comment"
import { useContext } from 'react';
import { CommentContext } from '../context/CommentContext';

export function CommentSection({ parent, pageName }) {
    let { comments } = useContext(CommentContext);

    for (const key in comments) {
        comments[key] = comments[key].filter(element => element.page === pageName);
    }

    return (
    <div className='p-2 w-full'>

        {comments[parent]?.map(comment => (
        <div key={comment.id} className="pt-2">
            <Comment {...comment} pageName={pageName} />
        </div>))}
     </div>   
    );
}
