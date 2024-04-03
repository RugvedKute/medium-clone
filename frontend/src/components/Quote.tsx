import React from "react";

export default function Quote() {
  return (
    <div className="h-screen flex items-center justify-center p-[5vw] bg-slate-100">
      <div className="">
        <h2 className="text-xl font-bold">
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem mollitia veniam necessitatibus magnam voluptatibus
          neque ipsam est quisquam totam in voluptates, esse, repellendus"
        </h2>
        <h4 className="mt-3 text-normal font-bold">Jules WinField</h4>
        <h4 className="text-normal text-slate-400">CEO, ACM Inc</h4>
      </div>
    </div>
  );
}
