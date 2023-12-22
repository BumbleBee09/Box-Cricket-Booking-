import React, { createContext, useReducer } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Grounds from "./components/Grounds/Grounds";
import Profile from "./components/UserProfile/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import Notification from "./components/Notification";
import Logout from "./components/Logout";
import BookGround from "./components/Grounds/MoreGround";
import { initialState, reducer } from "./reducer/UseReducer";

export const UserContext = createContext();

const Routing = () => {
  return(
      <Routes>
      <Route exact path="/" element={<Home />} />

        <Route exact path="/grounds" element={<Grounds />} />

        <Route exact path="/profile" element={<Profile />} />

        <Route exact path="/login" element={<Login />} />

        <Route exact path="/logout" element={<Logout />} />

        <Route exact path="/register" element={<Register />} />

        {/* <Route exact path="/bookground" element={<BookGround />} />  */}

        <Route exact path="/moreground/:id"  element={<BookGround />}/>

        <Route exact path="/notification" element={<Notification />} />
        </Routes>
  )

}

function App() {

  const [state, dispatch] =  useReducer(reducer, initialState)

  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
    <Navbar />
    <Routing />
    </UserContext.Provider>
    </>
  );
}

export default App;

