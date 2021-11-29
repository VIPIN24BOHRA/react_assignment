import { useEffect, useRef, useState, useCallback } from "react";
import { colRef } from "../../firebase/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { ReactComponent as Addresslogo } from "../../utilities/address.svg";
import { ReactComponent as Phonelogo } from "../../utilities/phone.svg";
import { ReactComponent as Emaillogo } from "../../utilities/email.svg";
import Loader from "react-loader-spinner";
import "./people.css";
export default function People(props) {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [seed, setSeed] = useState(
    "https://randomuser.me/api/?results=20&inc=gender,name,location,dob,email,picture,phone"
  );
  const [loading, setLoading] = useState(false);
  const userRef = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (userRef.current) userRef.current.disconnect();
      userRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) setPage(page + 1);
      });
      if (node) userRef.current.observe(node);
    },
    [loading]
  );
  useEffect(() => {
    setLoading(true);
    fetch(`${seed}&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers((prev) => [...prev, ...data.results]);
        setLoading(false);
        setSeed(
          `https://randomuser.me/api/?results=20&inc=gender,name,location,dob,email,picture,phone&seed=${data.info.seed}`
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, [page]);

  const addUser = (u) => {
    // fetch the uid of user.

    const user = { ...u, uid: props.user.uid };
    addDoc(colRef, user)
      .then((data) => {
        const newUsers = users.filter((user) => {
          return user.email != u.email;
        });
        setUsers(newUsers);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="people_page">
      <div className="card_box">
        {users.map((user, index) => {
          if (users.length === index + 1) {
            return (
              <div key={index} ref={lastItemRef} className="card">
                <div className="card_img_box">
                  <img
                    src={user.picture.medium}
                    alt="profile pic"
                    className="card_img"
                  />

                  <p className="card_img_caption">
                    {/* <Userlogo className="card_logo" /> */}
                    {`${user.name.title} ${user.name.first} ${user.name.last}`}
                  </p>
                </div>
                <div className="card_text_box">
                  <p className="card_text">
                    <Emaillogo className="card_logo" />
                    {user.email}
                  </p>
                  <p className="card_text">
                    <Phonelogo className="card_logo" />
                    {user.phone}
                  </p>
                  <p className="card_text">
                    <Addresslogo className="card_logo" />
                    {`${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`}
                  </p>
                  <button
                    className="card_btn"
                    onClick={() => {
                      addUser(user);
                    }}
                  >
                    save me
                  </button>
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} className="card">
                <div className="card_img_box">
                  <img
                    src={user.picture.medium}
                    alt="profile pic"
                    className="card_img"
                  />

                  <p className="card_img_caption">
                    {/* <Userlogo className="card_logo" /> */}
                    {`${user.name.title} ${user.name.first} ${user.name.last}`}
                  </p>
                </div>
                <div className="card_text_box">
                  <p className="card_text">
                    <Emaillogo className="card_logo" />
                    {user.email}
                  </p>
                  <p className="card_text">
                    <Phonelogo className="card_logo" />
                    {user.phone}
                  </p>
                  <p className="card_text">
                    <Addresslogo className="card_logo" />
                    {`${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`}
                  </p>
                  <button
                    className="card_btn"
                    onClick={() => {
                      addUser(user);
                    }}
                  >
                    save me
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div>
        {loading && (
          <Loader
            type="ThreeDots"
            color="blue"
            height={200}
            width={200}
            className="loading"
          />
        )}
      </div>
    </div>
  );
}
