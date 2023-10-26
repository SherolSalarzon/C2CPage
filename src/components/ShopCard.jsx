import React, { useEffect, useState } from "react";

export default function ShopCard(props) {
  const post = props.post;
  const prices = post.frontmatter.price;

  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");

  useEffect(() => {
    let CADDollar = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "CAD",
    });
    if (post.frontmatter.types) {
      setValue(CADDollar.format(Object.values(prices)[0]));
    } else {
      setValue(CADDollar.format(prices));
    }
  }, [prices]);

  function handleSelect(event) {
    let CADDollar = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "CAD",
    });
    setValue(CADDollar.format(event.target.value));
  }

  return (
    <div className="w-80 bg-gray-900 shadow rounded">
      <div className="flex flex-col justify-between bg-cente ">
        <img
          className="h-64 w-full rounded-md"
          src={post.frontmatter.image.src}
          alt={post.frontmatter.image.alt}
        />
      </div>
      <div className="p-4 flex flex-col items-center">
        <h1 className="text-white text-center mt-1">
          {post.frontmatter.title}
        </h1>
        <p className="text-center text-blue-400 mt-1">{value}</p>
        <div className="inline-flex items-center mt-2">
          <button
            className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
            onClick={() => count > 0 && setCount(count - 1)}
            disabled={count === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 12H4"
              />
            </svg>
          </button>
          <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
            {count}
          </div>
          <button
            className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
            onClick={() => setCount(count + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          {post.frontmatter.types && (
            <select
              value={value}
              className="px-2 py-2 mx-2 rounded"
              onChange={handleSelect}
            >
              {Object.entries(prices).map(([key, value], i) => (
                <option value={value}> {key} </option>
              ))}
            </select>
          )}
        </div>
        <button className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center">
          Add to Cart
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
