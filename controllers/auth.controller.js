import { User } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";

export const register = async (req, res) => {
  try {
    const { name, email, phone_number, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, phone_number, password: hashedPassword });

    res.status(201).json({ message: "User created succesfully." });
  } catch (err) {
    console.log("Registration failed.", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid password. Please try again." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    }).json({message:"Login successfull."});
  } catch (err) {
    console.log("Login failed",err)
    res.status(500).json({ message: "Internal server error." });
  }
};
export const logout = async (req, res) => {
  res.status(200).clearCookie("token").json({ message: "Logged out successfully" });
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.user.id; 
    const { confirmationText } = req.body; 

    if (confirmationText?.toLowerCase() !== "delete my account") {
      return res.status(400).json({ 
        message: "Please type 'delete my account' to confirm deletion." 
      });
    }

    const deleted = await User.destroy({ where: { id } });

    if (deleted) {
      res.clearCookie('token')
      return res.status(200).json({ message: "User deleted successfully." });
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
