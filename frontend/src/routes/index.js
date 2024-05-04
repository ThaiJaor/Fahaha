import HomePage from "../components/HomePage/HomePage";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import Account from "../components/Account/Account";
import BookDetail from "./../components/Book/Detail/Detail.js"
import Cart from "../components/Cart/Cart.js";
import OneStepCheckOut from "../components/Checkout/OneStepCheckOut/OneStepCheckOut.js";
import CheckoutResult from "../components/CheckoutResult/CheckoutResult.js";
import OrderDetail from "../components/OrderDetail/OrderDetail.js";
export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/books/:id",
    page: BookDetail,
    isShowHeader: true,
  },
  {
    path: "/cart",
    page: Cart,
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
    path: "/Account",
    page: Account,
    requireAuth: true,
    isShowHeader: true,
  },
  {
    path: "/onestepcheckout",
    page: OneStepCheckOut,
    requireAuth: true,
    isShowHeader: true,
  },
  {
    path: "/checkout-result",
    page: CheckoutResult,
    requireAuth: true,
    isShowHeader: true,
  },
  {
    path: "/order/detail/:id",
    page: OrderDetail,
    requireAuth: true,
    isShowHeader: true,
  },
  {
    path: "*",
    page: HomePage,
  },
];
