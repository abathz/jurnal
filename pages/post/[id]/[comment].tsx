import React from 'react';

const Comment = (props: any) => {
    const { id, comment } = props.router.query;

    return (
        <>
            <h1>Post: {id}</h1>
            <h1>Comment: {comment}</h1>
        </>
    );
};

export default Comment;
