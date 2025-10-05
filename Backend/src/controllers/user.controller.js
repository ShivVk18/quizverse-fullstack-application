import * as User from "../models/user.model.js";

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!email) return res.status(400).json({ error: "Email is required" });
    
    // Check if user already exists
    const existingUser = await User.getUserByEmailAndUsername(email, name);
    if (existingUser) {
     
      return res.status(200).json({
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email
      });
    }
    
    const newUser = await User.createUser(name, email);
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}


export { createUser};