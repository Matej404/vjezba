import React, { useState } from 'react';

export default function CommentForm({submitLable, handleSubmit}) {
    const [text, setText] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(text);
    }

    return(
       <form onSubmit={onSubmit}>
           <textarea className="comment-form-textarea" value={text} onChange={(e) => setText(e.target.value)} />
           <button className="comment-form-button">{submitLable}</button>
       </form>
    )
}