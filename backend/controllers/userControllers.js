import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import otpGenerator from "otp-generator";

// For RegisterUser
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // const encryptedPassword = await bcrypt.hash(password, 10);
console.log(password,"passwordpasswordpassword");
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
        error: `Error occured while creating user due to : ${error}`,
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
  var comparepss = await bcrypt.compare(password, isUserLoggedIn.password)
console.log("password",password);
console.log("isUserLoggedIn.password",isUserLoggedIn.password);
console.log("bcrypt.compare(password, isUserLoggedIn.password)",comparepss);
  if (!(await isUserLoggedIn.comparePassword(password))) {
    return res
      .status(400)
      .send({ message: "Authentication failed.Please enter valid password." });
  }
  const token = jwt.sign({ id: isUserLoggedIn._id }, process.env.SECRET,{ expiresIn: '1m' });
  const sessUser = { id: isUserLoggedIn._id, isAdmin: isUserLoggedIn.isAdmin ,username: isUserLoggedIn.username ,token,active:isUserLoggedIn.active};
  // console.log(sessUser);
  req.session.user = sessUser;

  if (req.session.user) {
    return res
      .status(200)
      .send({ message: "User login Successfully.", sessUser});
  }
};


//For Send OTP
const sendotp = async (req,res)=>{

  try {
    const { email } = req.body;
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    console.log("user",user);
    const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' });
    console.log("token",token);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL ,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Reset Password',
      html: `Your OTP is ${otp}
        <p>You are receiving this email because you (or someone else) has requested a password reset for your account.</p>
        <p>Please click on the following link or paste it into your browser to reset your password:</p>
        <p>${process.env.CLIENT_URL}/otp/${token}</p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
     res.status(200).json({ msg: 'OTP sent successfully!' });
    user.otp = otp;
await user.save();

    // res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }

  // const { email } = req.body;
  // const user = await User.findOne({ email });
  // const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
  // console.log("ues",user);
  // Generate a 6-digit OTP
  // const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' });
  // console.log("tokennn",token);

  // Create a Nodemailer transporter
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.SMTP_EMAIL,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });

//   // Define the email options
//   const mailOptions = {
//     from: process.env.SMTP_EMAIL,
//     to: email,
//     subject: 'OTP verification code',
//     html: `Your OTP is ${otp} && <br>
//     <p>${process.env.CLIENT_URL}/otp</p>`,
//   };

//   // Send the email
//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`OTP sent to ${email}: ${otp}`);
//     res.status(200).json({ msg: 'OTP sent successfully!' });
//     user.otp = otp;
// await user.save();
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: 'Failed to send OTP.' });
//   }
}


//Verify OTP
const verifyotp = async(req,res)=>{
  // const { otp } = req.body;
  // const { token } = req.params;
  // console.log("token",token);
  // const decoded = jwt.verify(token, process.env.SECRET);
  //   console.log("decoded",decoded);
  //   const user = await User.findById(decoded.userId);
  //   console.log("user",user);
  // // Verify the OTP
  // if (otp === user.otp) {
  //   console.log('OTP verification successful!');
  //   res.status(200).json({ msg: 'OTP verification successful!' });
  // } else {
  //   console.log('OTP verification failedddd.');
  //   res.status(400).json({ msg: 'OTP verification failed.' });
  // }



  try {
    const { token } = req.params;
    console.log("token",token);
    const { otp } = req.body;
    // console.log("password",password);

    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("decoded",decoded);
    const user = await User.findById(decoded.userId);
    console.log("user",user);
    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    console.log(otp === user.otp)
    if (otp === user.otp) {
      console.log('OTP verification successful!');
      res.status(200).json({ msg: 'OTP verification successful!' });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("hashedPassword",hashedPassword);
    // user.password = hashedPassword;
    // console.log("user.password",user.password);
    // console.log("user",user);
    // await user.save();
    // console.log("userrrrr",user);

    // res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }

}


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

    try {
      const verified = jwt.verify(token, process.env.SECRET);
      const user = await User.findById(verified.id);

      if (!user) {
        return res.json(false); // User not found
      }

      return res.json(true); // Token is valid
    } catch (err) {
      // Handle token verification error
      return res.json(false);
    }
  } catch (err) {
    // Handle other errors
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


//Forgot password 
const forgotpassword =async(req,res)=>{
  // try {
  //   const user = await User.findOne({ email: req.body.email });
  //   if (!user) {
  //     return res.status(404).json({ message: 'Email not found' });
  //   }
  //   const token = crypto.randomBytes(20).toString('hex');
  //   const expires = Date.now() + 3600000; // Token expires in 1 hour
  //   user.resetPasswordToken = token;
  //   user.resetPasswordExpires = expires;
  //   await user.save();

  //   const transporter = nodemailer.createTransport({
  //     service: 'Gmail',
  //     auth: {
  //       user: process.env.SMTP_EMAIL,
  //       pass: process.env.SMTP_PASSWORD,
  //     },
  //   });

  //   const mailOptions = {
  //     to: user.email,
  //     from: process.env.SMTP_EMAIL,
  //     subject: 'Reset your password on YourAppName',
  //     text: `Hi ${user.username},\n\nYou are receiving this email because you (or someone else) have requested the reset of the password for your account on YourAppName.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://${req.headers.host}/reset-password/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
  //   };

  //   transporter.sendMail(mailOptions, (error) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).json({ message: 'Error sending email' });
  //     }
  //     res.status(200).json({ message: 'Email sent' });
  //   });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ message: 'Server Error' });
  // }
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL ,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Reset Password',
      html: `
        <p>You are receiving this email because you (or someone else) has requested a password reset for your account.</p>
        <p>Please click on the following link or paste it into your browser to reset your password:</p>
        <p>${process.env.CLIENT_URL}/reset/${token}</p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

//Reset Password
const resetpassword = async(req,res)=>{
  // try {
  //   const user = await User.findOne({
  //     resetPasswordToken: req.params.token,
  //     resetPasswordExpires: { $gt: Date.now() },
  //   });

  //   if (!user) {
  //     return res.status(404).json({ message: 'Invalid or expired token' });
  //   }
  //   const hashedPassword = await bcrypt.hash(req.body.password, 10);
  //   user.password = hashedPassword;
  //   user.resetPasswordToken = undefined;
  //   user.resetPasswordExpires = undefined;
  //   await user.save();
  //   res.status(200).json({ message: 'Valid token' });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ message: 'Server Error' });
  // }
  try {
    const { token } = req.params;
    console.log("token",token);
    const { password } = req.body;
    console.log("password",password);

    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("decoded",decoded);
    const user = await User.findById(decoded.userId);
    console.log("user",user);
    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword",hashedPassword);
    user.password = hashedPassword;
    console.log("user.password",user.password);
    console.log("user",user);
    await user.save();
    console.log("userrrrr",user);

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}



export { registerUser , loginUser ,logoutUser, tokenIsValid,authCheck,forgotpassword,resetpassword,sendotp,verifyotp};