import { Navigate, Route } from "react-router";

export default function ReactGuard(props) {
  return (
    <>
      {props.user ? (
        <Route
          path={props.dpath}
          element={<props.dcomponent user={props.user} />}
        ></Route>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
