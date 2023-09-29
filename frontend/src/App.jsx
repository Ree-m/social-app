import "./App.css";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./DashBoard";
import GenerateCode from "./Components/GenerateCode";
import Accounts from "./Components/Accounts";
import Layout from "./Components/Layout";
import { useState,useEffect } from "react";
function App() {
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem("accessToken") || null);
  const [userName, setUserName] = useState(sessionStorage.getItem("userName") || null);
  const [userId, setUserId] = useState(sessionStorage.getItem("userId") || null);
  
  useEffect(() => {
    const getToken = async () => {
      const response = await fetch("http://localhost:8000/success");
      const data = await response.json();
      setAccessToken(data.accessToken);
      sessionStorage.setItem("accessToken", data.accessToken);

      console.log("access token data", data);
    };
    getToken();
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${accessToken}`
        );
        const data = await response.json();
        setUserName(data.name)
        setUserId(data.id)
        sessionStorage.setItem("userName", data.name);
        sessionStorage.setItem("userId", data.id);

        console.log("user data", data);
      }
    
    if (accessToken) {
      getUserInfo();
    }
  }, [accessToken]);

  return (
    <Routes>
      <Route path="/" element={<Layout userName={userName}/>}>
      <Route index element={<GenerateCode />} />
      <Route path="/dashboard" element={<DashBoard userId={userId} accessToken={accessToken}/>} />
      <Route path="/dashboard/accounts" element={<Accounts userName={userName} accessToken={accessToken} />} />
      </Route>
    </Routes>
  );
}

export default App;
