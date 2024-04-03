import React from "react";
import Quote from "../components/Quote";
import Auth from "../components/Auth";

export default function SignUp() {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2">
      <Auth type={"signup"}></Auth>
      <div className="hidden lg:block">
        <Quote></Quote>
      </div>
    </div>
  );
}
