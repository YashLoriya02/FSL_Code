const express = require("express");

const app = express();

app.use(express.json());

// Mock data for courses
let courses = [
  {
    id: 1,
    name: "JavaScript Basics",
    description: "Learn the fundamentals of JavaScript",
    price: 100,
  },
  {
    id: 2,
    name: "Python for Data Science",
    description: "Analyze data with Python",
    price: 150,
  },
  {
    id: 3,
    name: "React Advanced",
    description: "Master React for web development",
    price: 120,
  },
];

// Endpoints for Courses
// Get all courses
app.get("/courses", (req, res) => {
  res.json(courses);
});

// Add a new course
app.post("/courses", (req, res) => {
  const { name, description, price } = req.body;
  const newCourse = { id: Date.now(), name, description, price };
  courses.push(newCourse);
  res.json(newCourse);
});

// Update an existing course
app.put("/courses/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  const course = courses.find((c) => c.id == id);

  if (course) {
    course.name = name;
    course.description = description;
    course.price = price;
    res.json(course);
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

// Delete a course
app.delete("/courses/:id", (req, res) => {
  const { id } = req.params;
  courses = courses.filter((c) => c.id != id);
  res.json({ message: "Course deleted" });
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
