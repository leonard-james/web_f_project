"use client";

import React, { useEffect, useMemo, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { ArrowLeft, ArrowUpRight, ChevronDown, Search, UserRound } from "lucide-react";

const mapContainerStyle = { width: "100%", height: "220px" };

export default function UserProfile() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [usersError, setUsersError] = useState("");
  const [postsError, setPostsError] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const loadUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", { signal: controller.signal });
        if (!response.ok) throw new Error("Users could not be loaded.");
        setUsers(await response.json());
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching users:", error);
          setUsersError("We couldn't load people right now. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) setLoadingUsers(false);
      }
    };
    loadUsers();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!selectedUser) return undefined;
    const controller = new AbortController();
    const loadPosts = async () => {
      setLoadingPosts(true);
      setPosts([]);
      setPostsError("");
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.id}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Posts could not be loaded.");
        setPosts(await response.json());
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching posts:", error);
          setPostsError("We couldn't load this person's posts. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) setLoadingPosts(false);
      }
    };
    loadPosts();
    return () => controller.abort();
  }, [selectedUser]);

  const filteredUsers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return users.filter((user) =>
      `${user.name} ${user.username} ${user.email} ${user.company.name}`.toLowerCase().includes(query)
    );
  }, [users, searchTerm]);

  const togglePost = async (post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
      setComments([]);
      return;
    }
    setSelectedPost(post);
    setComments([]);
    setCommentsError("");
    setLoadingComments(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
      if (!response.ok) throw new Error("Comments could not be loaded.");
      setComments(await response.json());
    } catch (error) {
      console.error("Error fetching comments:", error);
      setCommentsError("Comments couldn't be loaded. Please try again later.");
    } finally {
      setLoadingComments(false);
    }
  };

  if (loadingUsers) {
    return <div className="flex min-h-[50vh] w-full items-center justify-center"><div role="status" className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" /></div>;
  }

  if (!selectedUser) {
    return (
      <div className="mx-auto w-full max-w-6xl space-y-7 pb-10">
        <section className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Community</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">People</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Get to know the people behind the conversations.</p>
          </div>
          <p className="text-sm text-slate-500">{filteredUsers.length} {filteredUsers.length === 1 ? "person" : "people"}</p>
        </section>
        <label className="relative block max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <span className="sr-only">Search people</span>
          <input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search name, username, or email…" className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100" />
        </label>
        {usersError ? (
          <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-800">{usersError}</div>
        ) : filteredUsers.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredUsers.map((user) => (
              <button key={user.id} type="button" onClick={() => setSelectedUser(user)} className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-700"><UserRound className="h-6 w-6" /></span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-blue-700" />
                </div>
                <p className="mt-5 font-semibold text-slate-950">{user.name}</p>
                <p className="mt-1 text-sm text-slate-500">@{user.username}</p>
                <p className="mt-4 truncate border-t border-slate-100 pt-4 text-sm text-slate-500">{user.email}</p>
                <p className="mt-2 text-xs font-medium text-slate-400">{user.company.name}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <UserRound className="mx-auto h-8 w-8 text-slate-400" />
            <h3 className="mt-4 font-semibold text-slate-900">No people found</h3>
            <p className="mt-1 text-sm text-slate-500">Try a different search term.</p>
          </div>
        )}
      </div>
    );
  }

  const mapCenter = {
    lat: Number.parseFloat(selectedUser.address.geo.lat),
    lng: Number.parseFloat(selectedUser.address.geo.lng),
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-10">
      <button type="button" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-700" onClick={() => { setSelectedUser(null); setSelectedPost(null); setComments([]); }}>
        <ArrowLeft className="h-4 w-4" /> Back to people
      </button>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Profile</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{selectedUser.name}</h2>
        <p className="mt-1 text-sm text-slate-500">@{selectedUser.username}<span className="mx-2 text-slate-300">·</span>{selectedUser.company.name}</p>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-950">Contact information</h3>
            <dl className="mt-5 space-y-4 text-sm">
              <div><dt className="text-slate-500">Email</dt><dd className="mt-1 font-medium text-slate-800">{selectedUser.email}</dd></div>
              <div><dt className="text-slate-500">Phone</dt><dd className="mt-1 font-medium text-slate-800">{selectedUser.phone}</dd></div>
              <div><dt className="text-slate-500">Website</dt><dd className="mt-1"><a href={`https://${selectedUser.website}`} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 underline-offset-4 hover:underline">{selectedUser.website} ↗</a></dd></div>
            </dl>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-950">Location</h3>
            <p className="mb-4 mt-3 text-sm leading-6 text-slate-600">{selectedUser.address.suite}, {selectedUser.address.street}<br />{selectedUser.address.city}, {selectedUser.address.zipcode}</p>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                  <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={14}><Marker position={mapCenter} /></GoogleMap>
                </LoadScript>
              ) : (
                <div className="flex h-[220px] flex-col items-center justify-center bg-slate-50 px-5 text-center">
                  <p className="text-sm font-medium text-slate-700">Map preview unavailable</p>
                  <p className="mt-1 text-xs text-slate-500">Location details are shown above.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <section className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-950">Posts</h3>
            <p className="mt-1 text-sm text-slate-500">Stories shared by {selectedUser.name.split(" ")[0]}.</p>
          </div>
          {postsError ? (
            <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-800">{postsError}</div>
          ) : loadingPosts ? (
            <div role="status" className="flex justify-center rounded-2xl border border-slate-200 bg-white py-8"><div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" /></div>
          ) : posts.map((post) => (
            <article key={post.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <button type="button" onClick={() => togglePost(post)} aria-expanded={selectedPost?.id === post.id} className={`flex w-full items-center justify-between gap-4 p-4 text-left transition hover:bg-slate-50 ${selectedPost?.id === post.id ? "bg-blue-50" : ""}`}>
                <span className="text-sm font-semibold capitalize leading-6 text-slate-800">{post.title}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${selectedPost?.id === post.id ? "rotate-180 text-blue-700" : ""}`} />
              </button>
              {selectedPost?.id === post.id && (
                <div className="space-y-3 border-t border-slate-100 bg-slate-50 p-4">
                  {loadingComments ? <p role="status" className="py-2 text-center text-sm text-slate-500">Loading comments…</p> : commentsError ? <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800">{commentsError}</p> : comments.length ? comments.map((comment) => (
                    <article key={comment.id} className="rounded-xl border border-slate-200 bg-white p-3">
                      <p className="text-xs font-semibold text-slate-700">{comment.email}</p>
                      <p className="mt-1 text-sm leading-5 text-slate-600">{comment.body}</p>
                    </article>
                  )) : <p className="text-sm text-slate-500">No comments found.</p>}
                </div>
              )}
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
