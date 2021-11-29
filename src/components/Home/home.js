import Navbar from "../Navbar/NavBar";
import People from "../people/People";
import Mypeople from "../mypeople/Mypeople";

import { Routes, Route } from "react-router-dom";

export default function Home(props) {
  const style = {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "400%",
    fontWeight: "bolder",
    color: "rgb(120,120,120)",
  };
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/people" element={<People user={props.user} />}></Route>
        <Route
          path="/mypeople"
          element={<Mypeople user={props.user} />}
        ></Route>
        <Route
          path="/*"
          element={
            <div style={style}>Welcome!!!!!!!!! {props.user.displayName}</div>
          }
        ></Route>
      </Routes>
    </>
  );
}
