import React from "react";
import Header from "../components/Header";
import { Container } from "semantic-ui-react";
import Head from "next/head";

const Layout = (props) => {
  return (
    <Container>
      <Head>
        <link
          async
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
      </Head>
      <div>
        <Header />
        {props.children}
        <br />
        <footer>
          <h5 style={{ textAlign: "center" }}>CrowdCoin.com</h5>
        </footer>
      </div>
    </Container>
  );
};

export default Layout;
