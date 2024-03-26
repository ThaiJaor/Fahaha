import HomePage from "../components/HomePage/HomePage";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  ,
  {
    path: "/sign_up",
    page: Register,
  },
  {
    path: "/sign_in",
    page: Login,
  },
  {
    path: "*",
    page: HomePage,
  },
];
