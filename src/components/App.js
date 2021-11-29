import { useState } from "react";

import SignIn from "./SignIn/SignIn";
import { authentication } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Home/home";
function App() {
  const [user, setUser] = useState(null);
  onAuthStateChanged(authentication, (user) => {
    if (user) {
      console.log(user);
      setUser(user);
    } else {
      setUser(null);
    }
  });
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/*"
            element={user ? <Home user={user} /> : <SignIn />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
