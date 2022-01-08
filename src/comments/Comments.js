import React, {useEffect, useState} from "react";
import { getComments as getCommentsApi, createComment as createCommentApi, deleteComment as deleteCommentApi } from "../api";
import Comment from './Comment';
import CommentForm from "./CommentForm";

export default function Comments({ currentUserId }) {
    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    console.log('backendComments', backendComments);
    const rootComments = backendComments.filter(backendComment => backendComment.parentId === null);

    const getReplies = (commendId) => {
        return backendComments.filter(backendComment => backendComment.parentId === commendId).sort((a, b) => new Date(a.cratedAt).getTime() - new Date(b.cratedAt).getTime());
    }

    const addComment = (text, parentId) => {
        console.log('addComment', text, parentId);
        createCommentApi(text, parentId)
        .then((comment) => {
            setBackendComments([comment, ...backendComments])
            setActiveComment(null);
        })
    }

   const deleteComment = (commentId) => {
       if (window.confirm("Are you sure?")) {
           deleteCommentApi(commentId)
           .then(() => {
               const updateBackendComment = backendComments.filter(backendComment => backendComment.id !== commentId);
               setBackendComments(updateBackendComment);
           })
       }
   }

    useEffect(() => {
        getCommentsApi()
        .then((data) => {
            setBackendComments(data);
        })
    }, [])
    
     return(
         <div className="comments">
             <h3 className="comments-title">Comments</h3>
             <div className="comment-form-title">Write comment</div>
             <CommentForm submitLable="Write" handleSubmit={addComment} />
             <div className="comments-container">
                {rootComments.map(rootComment => (
                    <Comment key={rootComment.id}
                             comment={rootComment} 
                             replies={getReplies(rootComment.id)} 
                             currentUserId={currentUserId} 
                             deleteComment={deleteComment} 
                             activeComment={activeComment}
                             setActiveComment={setActiveComment}
                             addComment={addComment}
                             />
                ))}
             </div>
         </div>
     )
}