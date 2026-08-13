"use client";

import { useState } from "react";
import { Bookmark, Share2, ThumbsUp } from "lucide-react";

import { cn } from "@/lib/utils";

export function ArticleActions({ baseLikes = 48 }: { baseLikes?: number }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const likes = baseLikes + (liked ? 1 : 0);

  const copyLink = async () => {
    try {
      await navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard không khả dụng — bỏ qua */
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setLiked((v) => !v)}
        aria-pressed={liked}
        className={cn(
          "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
          liked
            ? "border-red-200 bg-red-50 text-red-600"
            : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50",
        )}
      >
        <ThumbsUp className={cn("h-3.5 w-3.5", liked && "fill-current")} />
        <span>{likes}</span>
      </button>

      <button
        type="button"
        onClick={() => setBookmarked((v) => !v)}
        aria-pressed={bookmarked}
        aria-label="Lưu bài viết"
        className={cn(
          "rounded-full border p-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
          bookmarked
            ? "border-amber-200 bg-amber-50 text-amber-700"
            : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50",
        )}
      >
        <Bookmark className={cn("h-3.5 w-3.5", bookmarked && "fill-current")} />
      </button>

      <button
        type="button"
        onClick={copyLink}
        className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-all hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <Share2 className="h-3.5 w-3.5" />
        <span>{copied ? "Đã chép link" : "Chia sẻ"}</span>
      </button>
    </div>
  );
}
