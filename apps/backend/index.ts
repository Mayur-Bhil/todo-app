import express from 'express';
import { prisma } from 'db/client';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/user", async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password // Required by your schema
      }
    });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});