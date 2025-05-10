"use client";

import React from "react";

// Sample user data - you can replace this with your actual data
const users = Array(10).fill(null).map((_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  phone: `+1 234 567 ${index.toString().padStart(3, '0')}`,
  location: `City ${index + 1}, Country`
}));

export function UserProfile() {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      <div className="rounded-2xl border bg-card p-16 shadow-lg w-full max-w-6xl">
        <h2 className="text-4xl font-bold mb-12 text-center">User Profiles</h2>
        <div className="grid grid-cols-2 grid-rows-2 gap-12">
          {users.slice(0, 4).map((user) => (
            <div key={user.id} className="rounded-xl border bg-white p-10 shadow-md hover:shadow-xl transition-shadow h-full flex flex-col justify-center">
              <div className="flex items-center gap-6 mb-8">
                <div className="h-28 w-28 rounded-full bg-gray-200"></div>
                <div>
                  <h3 className="text-2xl font-semibold">{user.name}</h3>
                  <p className="text-base text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-base font-medium">Full Name</label>
                  <input
                    type="text"
                    className="w-full rounded-md border p-4"
                    defaultValue={user.name}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-base font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-md border p-4"
                    defaultValue={user.email}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-base font-medium">Phone</label>
                  <input
                    type="tel"
                    className="w-full rounded-md border p-4"
                    defaultValue={user.phone}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-base font-medium">Location</label>
                  <input
                    type="text"
                    className="w-full rounded-md border p-4"
                    defaultValue={user.location}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 