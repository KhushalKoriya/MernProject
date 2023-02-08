import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// For RegisterUser
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: name,
      email: email.toLowerCase(),
      password:password
    });
    if (newUser) {
      return res
        .status(200)
        .send({ message: "User Created Successfully", newUser });
    }
  } catch (error) {
    return res
      .status(500)
      .send({
        error: `Error occured while creating user due to : ${error.message}`,
      });
  }
};

//For Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let isUserLoggedIn = await User.findOne({
    $and: [
      {
        email: email,
      },
    ],
  });
  if (!isUserLoggedIn) {
    return res
      .status(400)
      .send({ message: "User Not found.Please Sign Up in the System!." });
  }

  if (!(await bcrypt.compare(password, isUserLoggedIn.password))) {
    return res
      .status(400)
      .send({ message: "Authentication failed.Please enter valid password." });
  }
  const token = jwt.sign({ id: isUserLoggedIn._id }, process.env.SECRET);
  const sessUser = { id: isUserLoggedIn._id, isAdmin: isUserLoggedIn.isAdmin ,username: isUserLoggedIn.username ,token};
  // console.log(sessUser);
  req.session.user = sessUser;

  if (req.session.user) {
    return res
      .status(200)
      .send({ message: "User login Successfully.", sessUser});
  }
};


//For Logout
const logoutUser = async (req, res) => {

  console.log("user logout");

  req.session.destroy((err) => {
    //delete session data from store, using sessionID in cookie
    if (err) throw err;
    res.clearCookie("session_id");

   return res.status(200).send({ message: "Logged out successfully." });
  });

}

//TokenisValid 
const tokenIsValid = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const authCheck =async (req, res) => {
  const user = await User.findById(req.isUserLoggedIn);
  res.json({
    isLoggedIn:true,
    username: user.username,
    id: user._id,
  });
}

export { registerUser , loginUser ,logoutUser, tokenIsValid,authCheck};
