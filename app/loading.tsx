import React from "react";

type Props = {};

function Loading({}: Props) {
  return (
    <div className="animate-pulse font-serif text-gray-400 text-center p-10">
      Loading News Feeds...
    </div>
  );
}

export default Loading;
