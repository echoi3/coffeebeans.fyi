import { FunctionComponent } from "react";
import Layout from "../Layout";
import Footer from "../Layout/Footer/Footer";
import Post from "../Post/Post";

const Home: FunctionComponent = () => {
  return (
    <Layout>
      <Post />
    </Layout>
  );
};

export default Home;
