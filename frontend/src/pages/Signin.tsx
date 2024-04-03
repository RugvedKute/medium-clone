import React from "react";
import Auth from "../components/Auth";
import Quote from "../components/Quote";

export default function Signin() {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2">
      <Auth type={"signin"}></Auth>
      <div className="hidden lg:block">
        <Quote></Quote>
      </div>
    </div>
  );
}
