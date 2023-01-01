"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Props = {};

function SearchBox({}: Props) {
  const [input, setInput] = useState("");
  const router = useRouter();
  const handleSearch = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!input) return;
    router.push(`/search?term=${input}`)
  };
  return (
    <form
      onSubmit={handleSearch}
      className="max-w-6xl flex mx-auto justify-between items-center px-5"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Searching for Information...."
        className="flex-1 w-full h-14 rounded-lg placeholder-gray-500 text-gray-900 bg-transparent outline-none dark:text-orange-500"
      />
      <button
        disabled={!input}
        className="text-orange-400 disabled:text-gray-400"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBox;
