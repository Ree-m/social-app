import { useEffect } from "react";
// eslint-disable-next-line react/prop-types
const DashBoard = ({ accessToken }) => {
  useEffect(() => {
    const fetchPosts = async () => {
      console.log("posts token", accessToken);
      const response = await fetch(
        `https://graph.facebook.com/me?posts&access_token=${accessToken}`
      );
      // const response = await fetch(`https://graph.facebook.com/me?POST_ID="277978905158442"&access_token=${accessToken}`)

      const data = await response.json();
      console.log("posts data", data);
    };

    // if(accessToken){
    fetchPosts();

    // }
  }, [accessToken]);
  return (
    <div>
      <h1> DashBoard</h1>
    </div>
  );
};

export default DashBoard;
