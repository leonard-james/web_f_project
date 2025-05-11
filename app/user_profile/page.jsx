"use client";

import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: '100%',
  height: '300px'
};

export default function UserProfile() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Prevent background scroll when modal is open
  React.useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  // Fetch users from JSON Placeholder
  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  // Fetch posts for the selected user
  useEffect(() => {
    if (selectedUser) {
      setLoading(true);
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.id}`)
        .then((response) => response.json())
        .then((data) => {
          setPosts(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          setLoading(false);
        });
      
      setMapCenter({
        lat: parseFloat(selectedUser.address.geo.lat),
        lng: parseFloat(selectedUser.address.geo.lng)
      });
    }
  }, [selectedUser]);

  // Fetch comments for the selected post
  const fetchComments = async (postId) => {
    setLoadingComments(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
    setLoadingComments(false);
  };

  const handlePostClick = (post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
      setComments([]);
    } else {
      setSelectedPost(post);
      fetchComments(post.id);
    }
  };

  if (loading && !selectedUser) {
    return (
      <div className="w-full h-full min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      {!selectedUser ? (
        // List view of users
        <div className="w-full max-w-7xl mx-auto p-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Users</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-6 border rounded-xl cursor-pointer hover:bg-gray-50 shadow-md transition-all duration-200 text-center flex flex-col items-center justify-center min-h-[180px]"
                onClick={() => { setSelectedUser(user); setModalOpen(true); }}
              >
                <p className="font-semibold text-lg mb-2">{user.name}</p>
                <p className="text-base text-gray-500">@{user.username}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Detailed view of the selected user
        <div className="w-full h-full bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
              className="mb-6 text-blue-500 hover:text-blue-700 transition-colors duration-200 flex items-center gap-2"
              onClick={() => {
                setSelectedUser(null);
                setSelectedPost(null);
                setComments([]);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Users
            </button>
            
            <div className="space-y-8">
              <div className="border-b pb-6">
                <h2 className="text-3xl font-bold">{selectedUser.name}</h2>
                <p className="text-xl text-gray-500 mt-2">@{selectedUser.username}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                    <p className="mb-3"><strong>Email:</strong> {selectedUser.email}</p>
                    <p className="mb-3"><strong>Phone:</strong> {selectedUser.phone}</p>
                    <p className="mb-3">
                      <strong>Website:</strong>{" "}
                      <a
                        href={`http://${selectedUser.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        {selectedUser.website}
                      </a>
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Address</h3>
                    <p className="mb-4">
                      {selectedUser.address.suite}, {selectedUser.address.street}<br />
                      {selectedUser.address.city}, {selectedUser.address.zipcode}
                    </p>
                    <div className="rounded-lg overflow-hidden">
                      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                        <GoogleMap
                          mapContainerStyle={containerStyle}
                          center={mapCenter}
                          zoom={15}
                        >
                          <Marker position={mapCenter} />
                        </GoogleMap>
                      </LoadScript>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Posts</h3>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {posts.map((post) => (
                        <div key={post.id} className="border rounded-lg overflow-hidden">
                          <button
                            onClick={() => handlePostClick(post)}
                            className={`w-full text-left p-4 hover:bg-gray-50 transition-all duration-300 flex items-center justify-between ${
                              selectedPost?.id === post.id ? 'bg-gray-50' : ''
                            }`}
                          >
                            <h4 className="font-medium text-lg">{post.title}</h4>
                            <div 
                              className={`ml-4 p-1 rounded-full transition-transform duration-300 ${
                                selectedPost?.id === post.id ? 'rotate-180' : ''
                              }`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </button>
                          
                          {selectedPost?.id === post.id && (
                            <div className="border-t bg-gray-50">
                              <div className="p-3 md:p-4 text-sm md:text-base max-w-xl mx-auto">
                                <div className="mb-2">
                                  <h5 className="font-semibold text-base mb-1">Post Content</h5>
                                  <p className="text-gray-600">{post.body}</p>
                                </div>
                                <div className="mt-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-semibold text-base">Comments</h5>
                                    <span className="text-xs text-gray-500">{comments.length} comments</span>
                                  </div>
                                  {loadingComments ? (
                                    <div className="flex justify-center py-2">
                                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
                                    </div>
                                  ) : (
                                    <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                                      {comments.map((comment) => (
                                        <div 
                                          key={comment.id} 
                                          className="bg-white p-2 rounded border hover:shadow-sm transition-shadow duration-200"
                                        >
                                          <div className="flex items-center gap-2 mb-1">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                              <span className="text-blue-600 font-medium text-xs">
                                                {comment.name.charAt(0)}
                                              </span>
                                            </div>
                                            <div>
                                              <p className="font-medium text-xs text-gray-900">{comment.name}</p>
                                              <p className="text-[10px] text-gray-500">{comment.email}</p>
                                            </div>
                                          </div>
                                          <p className="text-xs text-gray-600 ml-8">{comment.body}</p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for User Details */}
      {modalOpen && selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
          onClick={e => {
            if (e.target === e.currentTarget) {
              setModalOpen(false);
              setSelectedUser(null);
              setSelectedPost(null);
              setComments([]);
            }
          }}
        >
          <div className="relative w-full max-w-4xl mx-auto bg-white border rounded-2xl shadow-lg p-4 md:p-8 animate-fadeIn max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold px-2 py-1 rounded-full focus:outline-none z-50 bg-white/80 shadow"
              onClick={() => { setModalOpen(false); setSelectedUser(null); setSelectedPost(null); setComments([]); }}
              title="Close"
            >
              &times;
            </button>
            <div className="space-y-8">
              <div className="border-b pb-6">
                <h2 className="text-3xl font-bold">{selectedUser.name}</h2>
                <p className="text-xl text-gray-500 mt-2">@{selectedUser.username}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                    <p className="mb-3"><strong>Email:</strong> {selectedUser.email}</p>
                    <p className="mb-3"><strong>Phone:</strong> {selectedUser.phone}</p>
                    <p className="mb-3">
                      <strong>Website:</strong>{" "}
                      <a
                        href={`http://${selectedUser.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        {selectedUser.website}
                      </a>
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Address</h3>
                    <p className="mb-4">
                      {selectedUser.address.suite}, {selectedUser.address.street}<br />
                      {selectedUser.address.city}, {selectedUser.address.zipcode}
                    </p>
                    <div className="rounded-lg overflow-hidden">
                      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                        <GoogleMap
                          mapContainerStyle={containerStyle}
                          center={mapCenter}
                          zoom={15}
                        >
                          <Marker position={mapCenter} />
                        </GoogleMap>
                      </LoadScript>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Posts</h3>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {posts.map((post) => (
                        <div key={post.id} className="border rounded-lg overflow-hidden">
                          <button
                            onClick={() => handlePostClick(post)}
                            className={`w-full text-left p-4 hover:bg-gray-50 transition-all duration-300 flex items-center justify-between ${
                              selectedPost?.id === post.id ? 'bg-gray-50' : ''
                            }`}
                          >
                            <h4 className="font-medium text-lg">{post.title}</h4>
                            <div 
                              className={`ml-4 p-1 rounded-full transition-transform duration-300 ${
                                selectedPost?.id === post.id ? 'rotate-180' : ''
                              }`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </button>
                          {selectedPost?.id === post.id && (
                            <div className="border-t bg-gray-50">
                              <div className="p-3 md:p-4 text-sm md:text-base max-w-xl mx-auto">
                                <div className="mb-2">
                                  <h5 className="font-semibold text-base mb-1">Post Content</h5>
                                  <p className="text-gray-600">{post.body}</p>
                                </div>
                                <div className="mt-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-semibold text-base">Comments</h5>
                                    <span className="text-xs text-gray-500">{comments.length} comments</span>
                                  </div>
                                  {loadingComments ? (
                                    <div className="flex justify-center py-2">
                                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
                                    </div>
                                  ) : (
                                    <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                                      {comments.map((comment) => (
                                        <div 
                                          key={comment.id} 
                                          className="bg-white p-2 rounded border hover:shadow-sm transition-shadow duration-200"
                                        >
                                          <div className="flex items-center gap-2 mb-1">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                              <span className="text-blue-600 font-medium text-xs">
                                                {comment.name.charAt(0)}
                                              </span>
                                            </div>
                                            <div>
                                              <p className="font-medium text-xs text-gray-900">{comment.name}</p>
                                              <p className="text-[10px] text-gray-500">{comment.email}</p>
                                            </div>
                                          </div>
                                          <p className="text-xs text-gray-600 ml-8">{comment.body}</p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
