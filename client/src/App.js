import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";

//pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Articles from "./Pages/Articles";
import ArticlesListPage from "./Pages/ArticlesListPage";
import NotFound from "./Pages/NotFound";

//components
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <NavigationRouting />
      </Router>
    </div>
  );
};
export default App;

const NavigationRouting = () => {
  return (
    <div id="page-body">
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/articles/:name" component={Articles} />
      <Route path="/articles-all" component={ArticlesListPage} />
      <Route path="/not-found" component={NotFound} />
      <Redirect exact path from="*" to="/404" />
    </div>
  );
};
