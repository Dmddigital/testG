import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppProvider from "./AppProvider";
import AppRoutes from "./router";
import Layout from "./components/Layout/Layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GlobalStyles from "./assets/styles/globalStyles";
import { WalletProvider } from "./components/WalletContext";


const App = () => (
  <WalletProvider>
    <AppProvider>
      <GlobalStyles />
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </AppProvider>
  </WalletProvider>
);


export default App;
