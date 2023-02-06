
import { Home } from "./Components/Home";
import { Register } from "./Components/Users/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Mainpage } from "./Components/Mainpage";
import { UserRegisterProvider } from "./Components/Store/UserRegisterProvider";
import { Login } from "./Components/Users/Login";
import { Aboutus } from "./Components/Pages/Aboutus";
import { Features } from "./Components/Pages/Features";
import { OtherHomePageInclude } from "./Components/Pages/OtherHomePageInclude";
import { LoginRegister } from "./Components/Users/LoginRegister";
import { My404Component } from "./Components/My404Component";
// import PrivateRoute from "./Components/Users/PrivateRoute";
function App() {
  return (
    <>
      <UserRegisterProvider>
        <BrowserRouter>
          <Routes>
          <Route path='*' exact={true} element={<My404Component/>} />
            <Route exact path="/" element={<Mainpage />} />
            <Route path="/Homepage" element={<Home/>} />
            <Route element={<LoginRegister/>}>
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login/>} />
            {/* <PrivateRoute path="/onlyAuthorizedAllowedHere/" element={<My404Component/>} /> */}
            </Route>
            <Route element={<OtherHomePageInclude />}>
            <Route path="/Aboutus" element={<Aboutus/>} />
            <Route path="/Features" element={<Features/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserRegisterProvider>
    </>
  );
}




export default App;
