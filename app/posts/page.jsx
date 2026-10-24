"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, FileText, MessageCircle, Search, X } from "lucide-react";

const POSTS_PER_PAGE = 10;

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const loadPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Posts could not be loaded.");
        setPosts(await response.json());
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          console.error("Failed to fetch posts:", fetchError);
          setError("We couldn't load posts right now. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    loadPosts();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!selectedPost) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedPost(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedPost]);

  const filteredPosts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return posts;
    return posts.filter((post) => `${post.title} ${post.body}`.toLowerCase().includes(query));
  }, [posts, searchTerm]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const openPost = async (post) => {
    setSelectedPost(post);
    setComments([]);
    setCommentsError("");
    setLoadingComments(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
      );
      if (!response.ok) throw new Error("Comments could not be loaded.");
      setComments(await response.json());
    } catch (fetchError) {
      console.error("Failed to fetch comments:", fetchError);
      setCommentsError("Comments couldn't be loaded. Please try again later.");
    } finally {
      setLoadingComments(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-7 pb-10">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Community</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Posts</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Browse stories and open a post to join the conversation.
          </p>
        </div>
        <div className="text-sm text-slate-500">
          {loading ? "Loading posts…" : `${filteredPosts.length} ${filteredPosts.length === 1 ? "post" : "posts"}`}
        </div>
      </section>

      <label className="relative block w-full max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <span className="sr-only">Search posts</span>
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search posts…"
          className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
        />
      </label>

      {error ? (
        <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-800">
          {error}
        </div>
      ) : loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="h-48 animate-pulse rounded-2xl border border-slate-200 bg-white p-5">
              <div className="h-4 w-20 rounded bg-slate-100" />
              <div className="mt-6 h-5 w-4/5 rounded bg-slate-100" />
              <div className="mt-3 h-4 w-full rounded bg-slate-100" />
              <div className="mt-2 h-4 w-2/3 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      ) : currentPosts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <FileText className="mx-auto h-8 w-8 text-slate-400" />
          <h3 className="mt-4 font-semibold text-slate-900">No posts found</h3>
          <p className="mt-1 text-sm text-slate-500">Try a different search term.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => openPost(post)}
              className="group flex min-h-52 min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <span className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
                  <FileText className="h-4 w-4" /> Story
                </span>
                <span className="text-xs font-medium text-slate-400">#{String(post.id).padStart(2, "0")}</span>
              </span>
              <h3 className="mt-5 line-clamp-2 text-base font-semibold capitalize leading-6 text-slate-950">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">{post.body}</p>
              <span className="mt-auto flex items-center gap-2 pt-5 text-xs font-medium text-slate-400">
                <MessageCircle className="h-4 w-4" />
                Open conversation
              </span>
            </button>
          ))}
        </div>
      )}

      {!loading && !error && totalPages > 1 && (
        <nav aria-label="Post pages" className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <span className="px-2 text-sm text-slate-500" aria-live="polite">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      )}

      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedPost(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="post-dialog-title"
            className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              aria-label="Close post"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <X className="h-5 w-5" />
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              Post #{selectedPost.id}
            </p>
            <h3 id="post-dialog-title" className="mt-3 pr-8 text-2xl font-semibold capitalize leading-8 text-slate-950">
              {selectedPost.title}
            </h3>
            <p className="mt-4 border-b border-slate-100 pb-6 text-sm leading-7 text-slate-600">
              {selectedPost.body}
            </p>
            <div className="mt-6 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-700" />
              <h4 className="font-semibold text-slate-950">Conversation</h4>
              {!loadingComments && !commentsError && (
                <span className="text-sm text-slate-400">{comments.length}</span>
              )}
            </div>
            {loadingComments ? (
              <div role="status" className="py-8 text-center text-sm text-slate-500">Loading comments…</div>
            ) : commentsError ? (
              <p role="alert" className="mt-4 rounded-xl bg-rose-50 p-4 text-sm text-rose-800">{commentsError}</p>
            ) : comments.length ? (
              <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
                {comments.map((comment) => (
                  <article key={comment.id} className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-800">{comment.email}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{comment.body}</p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">No comments yet.</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
