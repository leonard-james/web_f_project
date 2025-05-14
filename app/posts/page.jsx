"use client";

import React, { useEffect, useState } from "react";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const fetchComments = async (postId) => {
    setLoadingComments(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      setComments([]);
    }
    setLoadingComments(false);
  };

  // Prevent background scroll when modal is open
  React.useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  // Pagination logic
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIdx = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIdx, startIdx + postsPerPage);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start px-2 md:px-4 lg:px-8 py-6">
      <h2 className="text-4xl font-bold mb-10 text-center w-full">Posts</h2>
      {loading ? (
        <div className="flex justify-center py-8 w-full">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-10">
          {currentPosts.map((post) => (
            <button
              key={post.id}
              className={`bg-green-100 text-green-900 p-8 border border-green-300 rounded-2xl shadow-sm w-full h-full flex flex-col justify-center items-center transition hover:bg-green-200 focus:outline-none cursor-pointer ${selectedPost?.id === post.id ? 'bg-green-200' : ''}`}
              type="button"
              onClick={() => {
                setSelectedPost(post);
                setModalOpen(true);
                fetchComments(post.id);
              }}
            >
              <h3 className="text-lg font-semibold mb-2 text-center">{post.title}</h3>
            </button>
          ))}
        </div>
      )}

      {/* Modal for Post Details and Comments */}
      {modalOpen && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="relative w-full max-w-xl mx-auto bg-white border rounded-2xl shadow-lg p-8 animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold px-2 py-1 rounded-full focus:outline-none"
              onClick={() => { setModalOpen(false); setSelectedPost(null); setComments([]); }}
              title="Close"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-2">{selectedPost.title}</h3>
            <p className="text-gray-700 mb-6">{selectedPost.body}</p>
            <h4 className="text-lg font-semibold mb-2">Comments</h4>
            {loadingComments ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-4 max-h-60 overflow-y-auto">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-red-100 text-red-900 p-4 rounded-lg border border-red-300">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-red-700">{comment.email}</span>
                    </div>
                    <p className="text-red-800 text-sm">{comment.body}</p>
                  </div>
                ))}
                {comments.length === 0 && (
                  <p className="text-gray-500 italic">No comments found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

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
