import dbConnect from "@/utils/mongoose";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, email, password } = req.body;

  await dbConnect();

  const existing = await User.findOne({ email, authType: "credentials" });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  await User.create({
    username,
    email,
    password: hashed,
    authType: "credentials",
  });

  return res.status(201).json({ message: "User created" });
}
