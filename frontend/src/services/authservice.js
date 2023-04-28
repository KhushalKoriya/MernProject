import axios from "axios";



const register = (user) => {
  const { name, email, password } = { ...user };
  return axios.post("http://localhost:8081/Register", {
    name,
    email,
    password,
  });
};

//
const login = async (user) => {
  const { email, password } = { ...user };
  return axios
    .post(
      "http://localhost:8081/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    )
    .then((response) => {
      if (response.data.sessUser) {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data.sessUser));
      }
      return response.data;
    });
};

//
const logout = async () => {
  
  return axios.post("http://localhost:8081/logout",{},{ withCredentials: true}).then((response) => {
    localStorage.removeItem("user");
    return response.data;
  });
};

const forgot = async ()=>{
  const { email } = { ...user };
  return axios.post("http://localhost:8081/forgot-password", {
    email
  });
}

const AuthService = {
  register,
  login,
  logout,
  forgot,
};

export default AuthService;
