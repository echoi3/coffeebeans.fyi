import { FunctionComponent } from "react";
import Layout from "../Layout";
import Post from "../Post/Post";

const Home: FunctionComponent = () => {
  return (
    <Layout>
      <Post />
    </Layout>
  );
};

export default Home;
