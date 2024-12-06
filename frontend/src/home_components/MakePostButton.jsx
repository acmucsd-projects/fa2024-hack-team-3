
import React, { useState } from "react"
import {
  Box,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react"
import Select from "react-select" // Import react-select
import axios from "axios"

const MakePostButton = ({ setPosts, courses }) => {
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedOption, setSelectedOption] = useState("") // Track selected course
  const [tags, setTags] = useState([]) // Track selected tags

  const courseOptions = courses.map((course) => ({
    label: course,
    value: course,
  }))

  const tagOptions = [
    { label: "Group Study", value: "group_study" },
    { label: "One-on-One", value: "one_on_one" },
    { label: "Online", value: "online" },
    { label: "In-Person", value: "in_person" },
    { label: "Study Over Coffee", value: "study_over_coffee" },
    { label: "Study in Library", value: "study_in_library" },
    { label: "Study at Home", value: "study_at_home" },
    { label: "Morning Study", value: "morning_study" },
    { label: "Afternoon Study", value: "afternoon_study" },
    { label: "Evening Study", value: "evening_study" },
    { label: "Late Night Study", value: "late_night_study" },
    { label: "Weekend Study", value: "weekend_study" },
    { label: "Exam Prep", value: "exam_prep" },
    { label: "Homework Help", value: "homework_help" },
    { label: "Research Paper Writing", value: "research_paper_writing" },
    { label: "Project Collaboration", value: "project_collaboration" },
    { label: "Study for Quizzes", value: "study_for_quizzes" },
    { label: "Assignment Help", value: "assignment_help" },
    { label: "Discussion & Debates", value: "discussion_debates" },
    { label: "Quiet Space", value: "quiet_space" },
    { label: "Music-Friendly", value: "music_friendly" },
    { label: "Coffee Shop", value: "coffee_shop" },
    { label: "Library", value: "library" },
    { label: "Outdoors", value: "outdoors" },
    { label: "Co-Working Space", value: "co_working_space" },
    { label: "At-Home Study", value: "at_home_study" },
  ]
  

  const handleCreatePost = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/posts", {
        title,
        description,
        course: selectedOption,
        tags: tags.map((tag) => tag.value), // Send tag values
      })

      setPosts((prevPosts) => [response.data, ...prevPosts])
      setTitle("")
      setDescription("")
      setTags([])
      setSelectedOption("")
      setShowCreatePost(false)
    } catch (error) {
      console.error("Error creating post:", error)
    }
  }

  return (
    <Box>
      {/* Toggle Button */}
      <Button
        colorScheme="blue"
        onClick={() => setShowCreatePost(!showCreatePost)}
      >
        {showCreatePost ? "Cancel" : "📃 New Post"}
      </Button>

      {showCreatePost && (
        <Box
          p={4}
          mt={4}
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
          bg="gray.50"
        >
          <Input
            placeholder="Topic Title*"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outline"
            size="md"
            mb={4}
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            mb={4}
            variant="outline"
            size="md"
          />

          {/* Course Select */}
          <Select
            options={courseOptions}
            value={courseOptions.find((option) => option.value === selectedOption)}
            onChange={(selected) => setSelectedOption(selected.value)}
            placeholder="Select Related Course"
            variant="outline"
            size="md"
            isClearable
            styles={{
              container: (provided) => ({
                ...provided,
                marginBottom: "16px",
              }),
            }}
          />

          {/* Tag Multi-Select */}
          <Select
            options={tagOptions}
            value={tags}
            onChange={(selected) => setTags(selected || [])} // Handle deselection
            placeholder="Search or Select Tags"
            variant="outline"
            size="md"
            isMulti
            styles={{
              container: (provided) => ({
                ...provided,
                marginBottom: "16px",
              }),
            }}
            
          />

          <Button colorScheme="teal" onClick={handleCreatePost}>
            Post Your Question or Note!
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default MakePostButton
