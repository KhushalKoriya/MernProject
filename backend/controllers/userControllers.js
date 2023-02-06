import bcrypt from "bcryptjs";
import User from "../models/user.js";

// For RegisterUser
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: name,
      email: email.toLowerCase(),
      password: encryptedPassword,
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
  const sessUser = { id: isUserLoggedIn._id, isAdmin: isUserLoggedIn.isAdmin ,username: isUserLoggedIn.username };
  console.log(sessUser);
  req.session.user = sessUser;

  if (req.session.user) {
    return res
      .status(200)
      .send({ message: "User login Successfully.", sessUser});
  }
};


//For Logout
const logoutUser = async (req, res) => {

  // req.session.destroy((err) => {
  //   //delete session data from store, using sessionID in cookie
  //   if (err) throw err;
  //   res.clearCookie("session_id"); // clears cookie containing expired sessionID

  //  return res.status(200).send({ message: "Logged out successfully." });
  // });
  console.log(req.session);
 req.session.destroy();
 res.clearCookie("session_id");
 res.send({ message: "user Logged out" });

}

export { registerUser , loginUser ,logoutUser};
