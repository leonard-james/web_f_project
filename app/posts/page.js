"use client";

import React, { useEffect, useState } from "react";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIdx = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIdx, startIdx + postsPerPage);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start px-2 md:px-4 lg:px-8 py-6">
      <h2 className="text-4xl font-bold mb-10 text-center w-full">Posts</h2>
      <div className="w-full max-w-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-10">
        {currentPosts.map((post) => (
          <div key={post.id} className="p-6 border rounded shadow-sm w-full h-full flex flex-col justify-between">
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-700">{post.body}</p>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 gap-2 w-full">
        <button
          className="px-4 py-2 rounded border bg-white shadow disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-3 py-2 rounded border shadow ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 rounded border bg-white shadow disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
