// import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Accounts = ({userName,accessToken}) => {



  return (
    <div>
      {accessToken ? (
        <div>Logged In as ${userName}</div>
      ) : (
        <a
          href="http://localhost:8000/auth/facebook/callback"
          target="_blank"
          rel="noreferrer"
        >
          Log in with Facebook
        </a>
      )}
    </div>
  );
};

export default Accounts;
