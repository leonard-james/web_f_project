"use client";

import React from "react";

export function UserProfile() {
  return (
    <div className="w-full">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-gray-200"></div>
            <div>
              <h3 className="text-lg font-medium">John Doe</h3>
              <p className="text-sm text-gray-500">john.doe@example.com</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                className="w-full rounded-md border p-2"
                defaultValue="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full rounded-md border p-2"
                defaultValue="john.doe@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <input
                type="tel"
                className="w-full rounded-md border p-2"
                defaultValue="+1 234 567 890"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <input
                type="text"
                className="w-full rounded-md border p-2"
                defaultValue="New York, USA"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 