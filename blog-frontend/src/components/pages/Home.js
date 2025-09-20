import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PostList from "../posts/PostList";
import Login from "../auth/Login";
import "./Pages.css"; // ✅ shared styles for all pages

const Home = () => {
  const { currentUser } = useAuth();

 return (
    <div className="page">
      {!currentUser ? (
        <>
          
          <Login />
        </>
      ) : (
        <>
          <h2>All Blog Posts</h2>
          <PostList />
        </>
      )}
    </div>
  );
};

export default Home;
