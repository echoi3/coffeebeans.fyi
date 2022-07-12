import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          position: "relative",
          maxWidth: "100vw",
          overflowX: "hidden",
          width: "100vw",
          minHeight: "100vh",
          maxHeight: "100%",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
    // <Layout>
    //   <div>
    //     <Post />
    //   </div>
    // </Layout>
  );
}

export default App;
