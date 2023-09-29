import { useState } from "react";
// import { useRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const GenerateCode = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accessCode, setAccessCode] = useState("");
  //   const router =useRouter()
  const navigate = useNavigate();

  const generateAccessCode = async (e) => {
    e.preventDefault();
    console.log("generate");
    const response = await fetch("http://localhost:8000/createNewAccessCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("generate access code data", data);
      alert("Access code sent. Check your messages.")
      //   setAccessCode(data.accessCode)
    }
  };

  const verifyAccessCode = async (e) => {
    e.preventDefault();
    console.log("validate");
    const response = await fetch("http://localhost:8000/validateAccessCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, accessCode }),
    });
    if (response.ok) {
      alert("verified");
      // here i need to save phone number to local storage
      localStorage.setItem("phoneNumber", JSON.stringify(phoneNumber));

      navigate("/dashboard");
    }
  };

  return (
    <div>
      <h1>Generate and Validate Access Code</h1>
      <form onSubmit={generateAccessCode}>
        <input
          type="number"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button>Generate Access Code</button>
      </form>

      <form onSubmit={verifyAccessCode}>
        <input
          type="number"
          placeholder="Access Code"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
        />
        <button>Validate Access Code</button>
      </form>
    </div>
  );
};

export default GenerateCode;
