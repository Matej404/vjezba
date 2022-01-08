import React, { useState } from 'react';

export default function CommentForm({submitLable, handleSubmit, hasCancleButton = null, initialText = '', handleCancle}) {
    const [text, setText] = useState(initialText);
    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(text);
    }

    return(
       <form onSubmit={onSubmit}>
           <textarea className="comment-form-textarea" value={text} onChange={(e) => setText(e.target.value)} />
           <button className="comment-form-button">{submitLable}</button>
           {hasCancleButton && (
               <button type="button" className="comment-form-button comment-form-cancel-button" onClick={handleCancle}>Cancle</button>
           )}
       </form>
    )
}