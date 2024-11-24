const express = require("express");
const cors = require("cors");

const app = express();
const port = 5001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  const user = {
    name: "Test",
    email: "test@gmail.com",
    age: 25,
  };
  res.json({ user });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
