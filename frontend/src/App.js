import "./App.scss";
import { connect } from "react-redux";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/Default/Default";
import { useSelector, useDispatch } from "react-redux";
import PrivateRoute from "./routes/PrivateRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function App(props) {
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
                  <Layout>
                    {route.requireAuth ? (
                      <PrivateRoute>
                        <Page />
                      </PrivateRoute>
                    ) : (
                      <Page />
                    )}
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </>
  );
}

export default App;

// Của Huy ở đây:
// const dispatch = useDispatch();
// const count = useSelector((state) => {
//   return state.counter.count;
// });
// const handleIncrease = () => {
//   props.increaseCounter();
//   dispatch(increaseCounter());
// };
// const handleDecrease = () => {
//   dispatch(decreaseCounter());
// };
// return (
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <h1>Hello world with React!</h1>
//       <div>Count: {count}</div>

//       <button onClick={() => handleIncrease()}>Increase Count</button>

//       <button onClick={() => handleDecrease()}>Decrease Count</button>
//     </header>
//   </div>
// );

// use redux as class component
// const mapStateToProps = state => {
//   return {
//     count: state.counter.count,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     increaseCounter: () => dispatch(increaseCounter()),

//     decreaseCounter: () => dispatch(decreaseCounter()),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App)
