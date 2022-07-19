import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import LogInOrSignup from "./components/LogInOrSignup/LogInOrSignup";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BaseRoutes } from "./routes/constants";
import EachBean from "./components/EachBean/EachBean";
import Header from "./components/Layout/Header/Header";
import AddBean from "./components/AddBean/AddBean";
import { useEffect } from "react";

function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`}>
        <div
          style={{
            position: "relative",
            maxWidth: "100vw",
            overflowX: "hidden",
            width: "100vw",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={BaseRoutes.Sign_Up} element={<LogInOrSignup />} />
            <Route path={`${BaseRoutes.BeanContent}/:beanName`} element={<EachBean />} />
            <Route path={BaseRoutes.Add_Bean} element={<AddBean />} />
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </BrowserRouter>
    // <Layout>
    //   <div>
    //     <Post />
    //   </div>
    // </Layout>
  );
}

export default App;
