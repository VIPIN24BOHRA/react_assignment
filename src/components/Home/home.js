import Navbar from "../Navbar/NavBar";
import People from "../people/People";
import Mypeople from "../mypeople/Mypeople";

import { Routes, Route } from "react-router-dom";

export default function Home(props) {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<div>Welcome!!!!!!!!! {props.user.displayName}</div>}
        ></Route>
        <Route path="/people" element={<People user={props.user} />}></Route>
        <Route
          path="/mypeople"
          element={<Mypeople user={props.user} />}
        ></Route>
      </Routes>
    </>
  );
}
