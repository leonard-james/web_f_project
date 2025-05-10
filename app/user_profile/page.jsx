"use client";

import React, { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";

export default function UserProfile() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [mapboxToken] = useState("YOUR_MAPBOX_ACCESS_TOKEN"); // Replace with your Mapbox token

  // Fetch users from JSON Placeholder
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  // Fetch posts for the selected user
  useEffect(() => {
    if (selectedUser) {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.id}`)
        .then((response) => response.json())
        .then((data) => setPosts(data));
    }
  }, [selectedUser]);

  return (
    <div className="p-4">
      {!selectedUser ? (
        // List view of users
        <div>
          <h2 className="text-lg font-semibold mb-4">Users</h2>
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user.id}
                className="p-2 border rounded cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedUser(user)}
              >
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // Detailed view of the selected user
        <div>
          <button
            className="mb-4 text-blue-500 underline"
            onClick={() => setSelectedUser(null)}
          >
            Back to Users
          </button>
          <h2 className="text-lg font-semibold">{selectedUser.name}</h2>
          <p className="text-sm text-gray-500">@{selectedUser.username}</p>
          <p className="mt-2">
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>Phone:</strong> {selectedUser.phone}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={`http://${selectedUser.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {selectedUser.website}
            </a>
          </p>
          <p className="mt-2">
            <strong>Address:</strong> {selectedUser.address.suite},{" "}
            {selectedUser.address.street}, {selectedUser.address.city},{" "}
            {selectedUser.address.zipcode}
          </p>
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Location on Map</h3>
            <Map
              initialViewState={{
                longitude: parseFloat(selectedUser.address.geo.lng),
                latitude: parseFloat(selectedUser.address.geo.lat),
                zoom: 12,
              }}
              style={{ width: "100%", height: 300 }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxAccessToken={mapboxToken}
            >
              <Marker
                longitude={parseFloat(selectedUser.address.geo.lng)}
                latitude={parseFloat(selectedUser.address.geo.lat)}
                color="red"
              />
            </Map>
          </div>
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Posts</h3>
            <ul className="space-y-2">
              {posts.map((post) => (
                <li key={post.id} className="p-2 border rounded">
                  <h4 className="font-medium">{post.title}</h4>
                  <p className="text-sm text-gray-500">{post.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
