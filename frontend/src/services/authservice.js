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
  localStorage.removeItem("user");
  return axios.post("http://localhost:8081/logout",{ withCredentials: true}).then((response) => {
    return response.data;
  });
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
