import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/userRoute.js";
dotenv.config();


const PORT = process.env.PORT || 8081;
// set up express
const app = express();
app.use(express.json());
app.use(cors());

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