import { Home } from "./Components/Home";
import { Register } from "./Components/Users/Register";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { Mainpage } from "./Components/Mainpage";
import { Login } from "./Components/Users/Login";
import { Navigate as Nav } from "./Components/Users/Navigate";
import { Aboutus } from "./Components/Pages/Aboutus";
import { Features } from "./Components/Pages/Features";
import { OtherHomePageInclude } from "./Components/Pages/OtherHomePageInclude";
import { LoginRegister } from "./Components/Users/LoginRegister";
import { My404Component } from "./Components/My404Component";
import Usercontex from "./Components/Store/Usercontex";
import axios from 'axios';
import { useEffect,useState } from "react";
import { Forgotpassword } from "./Components/Users/Forgotpassword";
import { Resetpassword } from "./Components/Users/Resetpassword";
// import PrivateRoute from "./Components/Users/PrivateRoute";

function App() {
  const [ userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("user");
      console.log("token",token);
      token = JSON.parse(token).token;
      console.log("token",token);

      if(token === null){
        localStorage.setItem("user", "");
        token = "";
      }

      const tokenResponse = await axios.post('http://localhost:8081/tokenIsValid', null, {headers: {"x-auth-token": token}});
      // console.log(tokenResponse);
      if (tokenResponse.data) {
        const userRes =  axios.get("http://localhost:8081/authcheck", {
          headers: { "x-auth-token": token },
        });
        // console.log(userRes);
        setUserData({
          token,
          user: userRes.data,
        });
      }
    }

    checkLoggedIn();
  }, []);

  return (
    <>
      <Usercontex.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path="*" exact={true} element={<My404Component />} />
            <Route exact path="/" element={<Mainpage />} />
            <Route path="/Homepage" element={<Home />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/forgot-password" element={<Forgotpassword />} />
              <Route path="/reset/:token" element={<Resetpassword />} />
              <Route path="/Login" element={<Login />} />
            <Route element={<LoginRegister />}>
              {/* <PrivateRoute path="/onlyAuthorizedAllowedHere/" element={<My404Component/>} /> */}
            </Route>
            <Route element={<OtherHomePageInclude />}>
              <Route path="/Aboutus" element={<Aboutus />} />
              <Route path="/Features" element={<Features />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Usercontex.Provider>
    </>
  );
}

export default App;
