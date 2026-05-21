import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../db.js";
import { users } from "../schema/user.js";

//regex for password. Requires uppercase, lowercase, number, special character and min of 8 characters
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// --SIGNUP--
export const signUp = async (req, res) => {
  try {
    //collect user details
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "User details are required" });
    }

    //testing user password with regex
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain uppercase, lowercase, a number and a special number and must be 8 characters long.",
      });
    }

    //creating username from fullname and generated figure from nanoid.
    const username = fullname.split(" ")[0] + "_" + nanoid(6);

    //using bcrypt for hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    //generated profile Image
    const profileImg = `https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${username}`;

    const newUser = await db
      .insert(users)
      .values({
        fullname,
        email,
        password: hashedPassword,
        username,
        profileImg,
      })
      .returning();

    //creating a token from jwt
    const token = jwt.sign({ id: newUser[0].id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: newUser[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sign up failed. Try Again" });
  }
};

// --SIGNIN--
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!foundUser.length) {
      return res.status(400).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, foundUser[0].password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: foundUser[0].id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ message: "User sign in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to sign in" });
  }
};
