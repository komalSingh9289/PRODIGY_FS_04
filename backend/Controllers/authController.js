import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js"; // Corrected the import path
import upload from "../Middleware/multerConfig.js";

export const Register = async (req, res) => {
  const { name, email, password } = req.body;
  const profileImage = req.file ? req.file.filename : null;
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: 'User already exists!' });

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      // Create new user
      user = new User({ name, email, password: hashPassword, profileImage });
      await user.save();

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(201).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage,
        },
      });
    } catch (error) {
      res.status(500).json({ message: `Register side error: ${error.message}` });
    }

};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials!" });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({ message: `Login side error: ${error.message}` });
  }
};

//verify jwt token
export const verifyToken = async (req, res) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password"); // Exclude password field

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Token is valid", user });
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { exclude } = req.query; // Get the user ID from query parameters

    // Find all users except the one with the ID in `exclude`
    const users = await User.find({ _id: { $ne: exclude } });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users." });
  }
};

