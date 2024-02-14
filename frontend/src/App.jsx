import React from "react";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import { Navigate, Route, Routes } from "react-router-dom"
import { useAuthContext } from "./context/AuthContext";

function App() {
  const {authUser} = useAuthContext();

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <Routes>
      <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} /> }/>
      <Route path="/login" element={authUser ? <Navigate to={"/"} /> : <Login />}/>
      <Route path="/signup" element={authUser ? <Navigate to={"/"} /> : <SignUp />}/>
      </Routes>
    </div>
  );
}

export default App;
