import React from "react";

const CoursesSection = () => {
  const courses = ["CSE 11", "COGS 9", "HIUS 112"];

  return (
    <div className="courses-section">
      <h2>Your Courses</h2>
      {courses.map((course, index) => (
        <div key={index} className="course">
          {course} <input type="checkbox" />
        </div>
      ))}
      <button className="add-courses-btn">Add Courses</button>
    </div>
  );
};

export default CoursesSection;