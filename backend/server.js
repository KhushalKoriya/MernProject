import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/userRoute.js";
import session from "express-session";
import cookieParser from "cookie-parser";

dotenv.config();


const PORT = process.env.PORT || 8081;
// set up express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var allowedDomains = ['http://localhost:3000'];
app.use(cors({origin: allowedDomains ,credentials: true}));

//middleware For Express
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized:true,
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly : true},
  resave: false ,
  name:"session_id",
}))

app.use(cookieParser());


app.use("/",routes);
//Database connections
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/Mern",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Connected to MongoDB");
      }
    }
  );

  //server connection
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });