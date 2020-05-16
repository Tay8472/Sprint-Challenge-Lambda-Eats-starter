import React from "react";
import Form from "./Components/Form";
import { Route } from "react-router-dom";
import Home from "./Components/Home"

const App = () => {
  return (
    <div>
      <Home/>
      {/* <Route exact path="/" component={Home} /> */}
      <Route path="/pizza">
        <Form />
      </Route>
    </div>
  );
};
export default App;
