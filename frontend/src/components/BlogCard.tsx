import React from "react";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export default function BlogCard({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) {
  return (
    <div className="px-5 mt-5 min-w-sm" style={{ minWidth: "650px" }}>
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center bg-slate-500 w-6 h-6 rounded-full text-white text-sm">
          H
        </div>
        <h4 className="text-slate-500 font-light text-sm">{authorName}</h4>
        <h4 className="text-slate-400 font-light text-sm">
          &#x2022; {publishedDate}
        </h4>
      </div>
      <h1 className="mt-2 text-2xl font-bold">{title}</h1>
      <h2 className="mt-1 text-normal text-slate-500">
        {content.slice(0, 100) + "  ......"}
      </h2>
      <h4 className="mt-3 text-sm text-slate-400">
        {Math.ceil(content.length / 100) + " minutes"} read
      </h4>
      <div className="mt-4 border-b-2 border-slate-100 "></div>
    </div>
  );
}
