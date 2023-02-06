import bcrypt from "bcryptjs";
import User from "../models/user.js"

// For RegisterUser 
const registerUser = async (req, res) => {
    try{
      const { name, email, password } = req.body;
  
        const encryptedPassword = await bcrypt.hash(password, 10);
  
        const newUser = await User.create({
          username :name,
          email: email.toLowerCase(),
          password: encryptedPassword,
        });
        if(newUser) {
          return res.status(200).send({ message: 'User Created Successfully', newUser });
        }
    
      } catch (error) {
        return res.status(500).send({error : `Error occured while creating user due to : ${error.message}`});
      }
}

//For Login 
const loginUser = async(req,res)=>{
  const { email, password } = req.body;

}
export {registerUser};