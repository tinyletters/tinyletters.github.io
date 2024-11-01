import { useState } from "react";
import "./App.css";
import Header from "./Header";
import { HashRouter as Router } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";
import MainContent from "./MainContent";
import Menu from "./Menu";

function App() {
  return (
    <Router>
      <Menu />
      <ScrollToTop />
      <Header />
      <MainContent />
      <Footer />
    </Router>
  );
}

export default App;
