import React from "react";

export default function SearchSuggestions({
  suggestionArray,
  setOnchangeTitle,
  setFocus,
  setIsSuggest,
}) {
  const settValue = (e) => {
    const email = e.target.textContent;
    setOnchangeTitle(email);
    setIsSuggest(false);
    setFocus("email");
  };
  return (
    <div className="absolute w-8/12 flex top-72 justify-center bg-gray-100 rounded-lg flex-col items-center ">
      {suggestionArray.map(({ email, id }) => (
        <li
          onClick={(e) => settValue(e)}
          className="p-5 text-xs list-none w-full cursor-pointer"
          key={id}
        >
          {email}
        </li>
      ))}
    </div>
  );
}
