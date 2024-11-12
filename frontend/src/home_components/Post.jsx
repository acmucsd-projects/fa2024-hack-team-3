import React from 'react';

const Post = ({ post }) => {
    return (
        <div className='post'>
            <p>{post.description}</p>
            <div className="tags">
            {post.tags.map((tag, index) => (
            <span key={index} className="tag">
                {tag}
            </span>
        ))}
      </div>
      <p className="user-info">{post.user}</p>
        </div>
    )
}

export default Post;