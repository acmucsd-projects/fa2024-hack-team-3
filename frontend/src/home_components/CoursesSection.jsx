import React, { useState } from "react";

const CoursesSection = ({ userId }) => {
  const courses = ["CSE 11", "COGS 9", "HIUS 112"];
  const [selectedCourses, setSelectedCourses] = useState([]);

  const setCourse = (course) => {
    setSelectedCourses((checkedCourses) => {
        let updatedCourses;

        if (checkedCourses.includes(course)) {
            updatedCourses = checkedCourses.filter((c) => c !== course);
        } else {
            updatedCourses = [...checkedCourses, course];
        }

        return updatedCourses;
    });
  }

  const addCourses = async () => {
    const formattedSelectedCourses = selectedCourses.map((course) => ({ name: course }));

    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courses: formattedSelectedCourses }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(`Error: ${errorData.message}`);
      } else {
        alert("Courses added successfully!");
      }
    } catch(err) {
      console.error("Failed to add courses:", err);
    }
  }

  return (
    <div className="courses-section">
      <h2>Your Courses</h2>
      {courses.map((course, index) => (
        <div key={index} className="course">
          <label>
            <input
              type="checkbox"
              value={course}
              onChange={() => setCourse(course)}
            />
            {course}
          </label>
        </div>
      ))}
      <button className="add-courses-btn" onClick={addCourses}>
        Add Courses
      </button>
    </div>
  );
};

export default CoursesSection;