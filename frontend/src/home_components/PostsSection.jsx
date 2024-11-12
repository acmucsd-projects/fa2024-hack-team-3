import React from 'react';
import Post from './Post';

const PostsSection = () => {
    const posts = [
        {
          title: "Midterm Review at Geisel",
          description: "Looking for someone to review for the CSE 11 midterm...",
          tags: ["Test Review", "In Person"],
          user: "Mandy Liu CO2028",
        },
        // Add other posts as needed
    ];

    return (
        <div className="posts-section">
          <h2>Posts</h2>
          <p>8 results for CSE 11</p>
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
    );
};

export default PostsSection;