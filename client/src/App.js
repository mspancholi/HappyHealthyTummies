import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StartPage from "./pages/StartPage";
import Nutrition from "./pages/Nutrition";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route exact path="/search" component={Nutrition} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
