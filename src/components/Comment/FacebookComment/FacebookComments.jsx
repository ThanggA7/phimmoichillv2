import React, { useEffect } from "react";

const FacebookComments = ({href}) => {
  useEffect(() => {
    // Load the Facebook SDK script
    const script = document.createElement("script");
    script.src =
      "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v21.0&appId=1251987202765089";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      console.log("Facebook SDK script loaded");
      window.FB.XFBML.parse();
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div
        className="fb-comments w-full"
        data-href={href}
        data-width="100%"
        data-mobile = "true"
        data-numposts="5"
      ></div>
      <div id="fb-root"></div>
    </div>
  );
};

export default FacebookComments;
