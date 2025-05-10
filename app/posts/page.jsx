"use client"

import React, { useState, useEffect } from "react"

export default function PostList() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Failed to fetch posts:", error))
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Posts</h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="p-4 border rounded shadow-sm">
            <h3 className="text-lg font-bold mb-1">{post.title}</h3>
            <p className="text-gray-700">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
