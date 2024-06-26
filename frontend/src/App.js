import "./App.scss";
import { connect } from "react-redux";
import React, { Fragment, useEffect, } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/Default/Default";
import { useSelector, useDispatch } from "react-redux";
import PrivateRoute from "./routes/PrivateRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUser } from "./redux/slices/userSlices";
import { fetchCartData } from "./redux/slices/cartSlice";
const PageContainer = ({ children }) => {
  return <div style={{ backgroundColor: "#f0f0f0", height: "100%", }}>{children}</div>;
};
function App(props) {
  const dispatch = useDispatch();
  const nonSecurePath = ["/sign_in", "/sign_up"];
  const books = useSelector((state) => state.cart.books);
  useEffect(() => {
    if (!nonSecurePath.includes(window.location.pathname)) {
      dispatch(fetchUser());
      dispatch(fetchCartData());
    }
  }, [dispatch]);
  return (
    <>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout >
                    {route.requireAuth ? (
                      <PrivateRoute>
                        <PageContainer>
                          <Page />
                        </PageContainer>
                      </PrivateRoute>
                    ) : (
                      <PageContainer>
                        <Page />
                      </PageContainer>
                    )}
                  </Layout>
                }
              />
            );
          })}
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
          pauseOnHover // Use equals sign and provide a string value
        />
      </Router>
    </>
  );
}

export default App;
