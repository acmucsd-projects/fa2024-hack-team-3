import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/HomePage.css"
import Header from '../home_components/Header';
import PostsSection from '../home_components/PostsSection';
import CoursesSection from '../home_components/CoursesSection';
import OnlineBuddies from '../home_components/OnlineBuddies';
import MakePostButton from '../home_components/MakePostButton';

const HomePage = () => {

  const posts = [{
      title: "Midterm Review at Geisel",
      description: "Looking for a study buddy...",
      tags: ["Test Review", "In Person"],
      user: "Mandy Liu CO2028",
    },
    // Add more posts
  ];

  const courses = ["CSE 11", "COGS 9", "HIUS 112"];
  const buddies = [
    { profilePicture: "/path/to/profile1.png" },
    { profilePicture: "/path/to/profile2.png" },
  ];

  return (
    <div className='home-page'>
      <Header />
      <div className='content'>
        <PostsSection posts={posts} />
        <CoursesSection courses={courses} />
        <OnlineBuddies buddies={buddies} />
        <MakePostButton onClick={() => alert("Create a new post")} />
      </div>
    </div>
  )
}

export default HomePage