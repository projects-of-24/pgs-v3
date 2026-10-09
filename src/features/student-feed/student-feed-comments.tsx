/**
 * Section 7 — Comments (v2, no upvotes).
 * Desktop Figma `18796:11932` (+ intro/status `17961:10947`).
 * Mobile Figma `1029:7535` (+ intro/status `206:6175`).
 * Locked: forlocked + controls off.
 * Unlocked Premium live (WS-COMMENTS-2): `workspace_comments` via props + POST `/api/premium/comments`.
 * Preview / locked: fixtures.
 */
"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { FeedCommentsData } from "./load-feed-comments";
import "./student-feed-comments.css";

const LOCK_SRC = "/assets/img/lock.png";
const AVATAR_STUDENT = "/assets/img/figma-feed/comments-avatar-student.png";
const AVATAR_STAFF = "/assets/img/figma-feed/comments-avatar-staff.png";
const SMILE_SRC = "/assets/img/figma-feed/comments-smile.svg";
const SORT_TUNE_SRC = "/assets/img/figma-feed/top-picks-tune.svg";
const COMMENT_MAX = 300;
/** Empty composer = 3 text lines (16px × line-height 1.25). */
const EDITOR_MIN_HEIGHT_PX = 60;
/**
 * Grow with typing until this cap (~8 lines), then scroll inside.
 * Stops the feed below from jumping forever as lines wrap.
 */
const EDITOR_MAX_HEIGHT_PX = 168;

/** Smile button opens this picker — insert chosen emoji into the composer. */
const COMMENT_EMOJI_PICKER = [
  "😊",
  "😀",
  "😄",
  "😁",
  "🙂",
  "😉",
  "😍",
  "🥰",
  "😘",
  "😜",
  "🤗",
  "🤔",
  "😅",
  "😂",
  "🤣",
  "😭",
  "😢",
  "😮",
  "😲",
  "😎",
  "🥳",
  "👍",
  "👎",
  "👏",
  "🙏",
  "🔥",
  "✨",
  "💯",
  "❤️",
  "💜",
  "✅",
  "🎉"
] as const;

export const STUDENT_FEED_COMMENTS_INTRO =
  "Got a quick doubt? Drop it in the comments. For detailed queries or feedback, reach out via email, direct call, group meet, or join our feedback sessions.";

type FeedComment = {
  id: string;
  author: string;
  avatarSrc: string;
  body: string;
  /** Placebo display label until B6 real `created_at`. */
  time: string;
  /** Sort key (ISO) — placebo until B6. */
  createdAt: string;
};

type CommentsSortMode = "newest" | "oldest" | "today" | "this-week";

/** Fixed preview clock — never `Date.now()` at module scope (SSR hydration). */
const COMMENTS_PREVIEW_NOW_MS = Date.parse("2026-09-07T12:00:00.000Z");

function startOfUtcDay(ms: number): number {
  const d = new Date(ms);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

/** UTC calendar week starts Monday. */
function startOfUtcWeekMonday(ms: number): number {
  const dayStart = startOfUtcDay(ms);
  const day = new Date(dayStart).getUTCDay(); // 0 = Sun
  const daysFromMonday = day === 0 ? 6 : day - 1;
  return dayStart - daysFromMonday * 24 * 60 * 60 * 1000;
}

/**
 * Stable ISO createdAt (same on server + client).
 * Relative to COMMENTS_PREVIEW_NOW so Today / This week QC works.
 * Display `time` labels stay placebo until B6.
 */
const FIXTURE_THREADS: FeedComment[] = [
  {
    id: "c1",
    author: "Admin",
    avatarSrc: AVATAR_STAFF,
    body: "We are going with your university application. If you have any doubts do let us now. Also on other notes can you update us on your SOP status. Have you made drafts?",
    time: "5 min ago",
    createdAt: "2026-09-07T11:55:00.000Z"
  },
  {
    id: "c2",
    author: "Jane Doe",
    avatarSrc: AVATAR_STAFF,
    body: "Nice to connect, with the feedback session I could figure out your concerns and the path you are aiming for. We were pleasantly surprised that you started taking right steps already!",
    time: "21st May 2025",
    createdAt: "2026-09-07T08:00:00.000Z"
  },
  {
    id: "c3",
    author: "Admin",
    avatarSrc: AVATAR_STAFF,
    body: "Please upload your latest SOP draft when ready — we can review it in the next session.",
    time: "2 days ago",
    createdAt: "2026-09-07T01:00:00.000Z"
  },
  {
    id: "c4",
    author: "Jane Doe",
    avatarSrc: AVATAR_STAFF,
    body: "Your shortlist looks strong. Let’s confirm IELTS timeline before we lock applications.",
    time: "18th May 2025",
    createdAt: "2026-09-01T11:00:00.000Z"
  }
];

const LOCKED_THREADS = FIXTURE_THREADS.slice(0, 2);

function formatRelativeTime(iso: string, nowMs: number): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "";
  const delta = Math.max(0, nowMs - t);
  const mins = Math.floor(delta / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(t).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function mapLiveComments(live: FeedCommentsData, nowMs: number): FeedComment[] {
  return live.comments.map((row) => ({
    id: row.id,
    author: row.authorName,
    avatarSrc: row.isStudent ? AVATAR_STUDENT : AVATAR_STAFF,
    body: row.body,
    time: formatRelativeTime(row.createdAt, nowMs),
    createdAt: row.createdAt
  }));
}

export type StudentFeedCommentsProps = {
  premiumActive?: boolean;
  /** WS-COMMENTS-2 live store; omit → fixtures (preview / locked). */
  live?: FeedCommentsData | null;
  /** Staff View as Student — no student POST. */
  readOnly?: boolean;
  studentDisplayName?: string;
};

function plainLength(el: HTMLElement): number {
  return (el.innerText || "").replace(/\n$/, "").length;
}

function truncateEditor(el: HTMLElement, max: number) {
  while (plainLength(el) > max) {
    el.innerText = el.innerText.slice(0, max);
  }
}

export function StudentFeedComments({
  premiumActive = false,
  live = null,
  readOnly = false,
  studentDisplayName
}: StudentFeedCommentsProps) {
  const unlocked = Boolean(premiumActive);
  const fromStore = Boolean(live?.fromStore);
  const canPost = unlocked && !readOnly;
  const editorId = useId();
  const menuId = useId();
  const editorRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const sortWrapRef = useRef<HTMLDivElement>(null);
  const peakEditorHeightRef = useRef(EDITOR_MIN_HEIGHT_PX);
  const emojiWrapRef = useRef<HTMLDivElement>(null);
  const [posted, setPosted] = useState<FeedComment[]>([]);
  const [sortMode, setSortMode] = useState<CommentsSortMode>("newest");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [clockMs] = useState(() => (fromStore ? Date.now() : COMMENTS_PREVIEW_NOW_MS));

  const composerName = studentDisplayName?.trim() || live?.studentName?.trim() || "John Doe";

  const catalog = useMemo(() => {
    if (!unlocked) return LOCKED_THREADS;
    if (fromStore && live) return mapLiveComments(live, clockMs);
    return FIXTURE_THREADS;
  }, [unlocked, fromStore, live, clockMs]);

  const threads = useMemo(() => {
    const merged = fromStore ? [...catalog] : [...posted, ...catalog];
    const todayStart = startOfUtcDay(clockMs);
    const weekStart = startOfUtcWeekMonday(clockMs);
    const filtered = merged.filter((item) => {
      const t = Date.parse(item.createdAt);
      if (Number.isNaN(t)) return false;
      if (sortMode === "today") return t >= todayStart;
      if (sortMode === "this-week") return t >= weekStart;
      return true;
    });
    const newestFirst = sortMode !== "oldest";
    return [...filtered].sort((a, b) => {
      const delta = Date.parse(a.createdAt) - Date.parse(b.createdAt);
      return newestFirst ? -delta : delta;
    });
  }, [posted, catalog, sortMode, fromStore, clockMs]);

  const emptyFilterCopy =
    sortMode === "today"
      ? "No comments today"
      : sortMode === "this-week"
        ? "No comments this week"
        : null;

  /** Live height grow up to MAX — then internal scroll (no endless page jump). */
  const syncEditorHeight = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;
    el.style.width = "100%";
    el.style.height = "auto";
    el.style.maxHeight = `${EDITOR_MAX_HEIGHT_PX}px`;
    const needed = Math.max(EDITOR_MIN_HEIGHT_PX, el.scrollHeight);
    const h = Math.min(needed, EDITOR_MAX_HEIGHT_PX);
    // Ratchet floor only while under the cap (keeps typed size; never past max).
    if (needed < EDITOR_MAX_HEIGHT_PX) {
      peakEditorHeightRef.current = Math.max(peakEditorHeightRef.current, h);
      el.style.minHeight = `${peakEditorHeightRef.current}px`;
      el.style.height = `${peakEditorHeightRef.current}px`;
      el.style.overflowY = "hidden";
    } else {
      peakEditorHeightRef.current = EDITOR_MAX_HEIGHT_PX;
      el.style.minHeight = `${EDITOR_MAX_HEIGHT_PX}px`;
      el.style.height = `${EDITOR_MAX_HEIGHT_PX}px`;
      el.style.overflowY = "auto";
    }
    setCharCount(plainLength(el));
  }, []);

  useEffect(() => {
    if (!canPost) return;
    peakEditorHeightRef.current = EDITOR_MIN_HEIGHT_PX;
    syncEditorHeight();
  }, [canPost, syncEditorHeight]);

  useEffect(() => {
    if (!emojiOpen && !sortMenuOpen) return;
    function onDocPointer(event: MouseEvent) {
      const target = event.target as Node;
      if (emojiOpen && emojiWrapRef.current && !emojiWrapRef.current.contains(target)) {
        setEmojiOpen(false);
      }
      if (sortMenuOpen && sortWrapRef.current && !sortWrapRef.current.contains(target)) {
        setSortMenuOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setEmojiOpen(false);
        setSortMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [emojiOpen, sortMenuOpen]);

  function focusEditor() {
    editorRef.current?.focus();
  }

  function onEditorInput() {
    const el = editorRef.current;
    if (!el) return;
    if (plainLength(el) > COMMENT_MAX) {
      truncateEditor(el, COMMENT_MAX);
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
    syncEditorHeight();
  }

  function applyFormat(command: "bold" | "italic" | "strikeThrough") {
    if (!canPost) return;
    focusEditor();
    document.execCommand(command, false);
    syncEditorHeight();
  }

  function insertEmoji(emoji: string) {
    if (!canPost) return;
    focusEditor();
    const el = editorRef.current;
    if (!el) return;
    if (plainLength(el) + emoji.length > COMMENT_MAX) return;
    document.execCommand("insertText", false, emoji);
    setEmojiOpen(false);
    syncEditorHeight();
  }

  function toggleEmojiPicker() {
    if (!canPost) return;
    setEmojiOpen((open) => !open);
  }

  async function submitComment() {
    if (!canPost || busy) return;
    const el = editorRef.current;
    if (!el) return;
    const body = (el.innerText || "").trim().slice(0, COMMENT_MAX);
    if (!body) return;

    if (fromStore) {
      setBusy(true);
      setStatus("Posting…");
      try {
        const response = await fetch("/api/premium/comments", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ body, parent_id: null })
        });
        const result = (await response.json()) as { message?: string };
        if (!response.ok) {
          setStatus(result.message ?? "Unable to add comment.");
          setBusy(false);
          return;
        }
        window.location.reload();
        return;
      } catch {
        setStatus("Unable to add comment.");
        setBusy(false);
        return;
      }
    }

    const next: FeedComment = {
      id: `local-${Date.now()}`,
      author: composerName,
      avatarSrc: AVATAR_STUDENT,
      body,
      time: "Just now",
      createdAt: new Date().toISOString()
    };
    setPosted((prev) => [next, ...prev]);
    el.innerHTML = "";
    syncEditorHeight();
  }

  return (
    <section
      className={`student-feed-comments${unlocked ? " is-unlocked" : " is-locked"}`}
      data-pgs-module="student-feed-comments"
      data-comments-source={fromStore ? "workspace_comments" : "fixture"}
      data-figma-desktop="18796:11932"
      data-figma-mobile="1029:7535"
      data-comments-times="placebo-until-B6"
      aria-label="Comments"
    >
      <div className="student-feed-comments__head">
        <p className="student-feed-comments__intro">
          <span className="student-feed-comments__intro-star" aria-hidden="true">
            *
          </span>
          <span>{STUDENT_FEED_COMMENTS_INTRO}</span>
        </p>
        <aside className="student-feed-comments__status" aria-label="Comments status">
          <p className="student-feed-comments__status-label">Status</p>
          <p className="student-feed-comments__status-value">
            Ready for Your
            <br />
            Input
          </p>
        </aside>
      </div>

      <div className="student-feed-comments__card-wrap">
        <div className="student-feed-comments__card">
          <div className="student-feed-comments__title-row">
            <h2 className="student-feed-comments__title">Comments</h2>
            {unlocked ? (
              <div className="student-feed-comments__sort" ref={sortWrapRef}>
                <button
                  type="button"
                  className="student-feed-comments__sort-btn"
                  aria-label="Sort comments"
                  aria-haspopup="menu"
                  aria-expanded={sortMenuOpen}
                  aria-controls={menuId}
                  onClick={() => setSortMenuOpen((v) => !v)}
                >
                  <Image src={SORT_TUNE_SRC} alt="" width={20} height={20} unoptimized />
                </button>
                {sortMenuOpen ? (
                  <ul
                    id={menuId}
                    className="student-feed-comments__sort-menu"
                    role="menu"
                    aria-label="Sort options"
                  >
                    <li role="none">
                      <button
                        type="button"
                        role="menuitemradio"
                        aria-checked={sortMode === "newest"}
                        className={sortMode === "newest" ? "is-active" : undefined}
                        onClick={() => {
                          setSortMode("newest");
                          setSortMenuOpen(false);
                        }}
                      >
                        Newest first
                      </button>
                    </li>
                    <li role="none">
                      <button
                        type="button"
                        role="menuitemradio"
                        aria-checked={sortMode === "oldest"}
                        className={sortMode === "oldest" ? "is-active" : undefined}
                        onClick={() => {
                          setSortMode("oldest");
                          setSortMenuOpen(false);
                        }}
                      >
                        Oldest first
                      </button>
                    </li>
                    <li role="none">
                      <button
                        type="button"
                        role="menuitemradio"
                        aria-checked={sortMode === "today"}
                        className={sortMode === "today" ? "is-active" : undefined}
                        onClick={() => {
                          setSortMode("today");
                          setSortMenuOpen(false);
                        }}
                      >
                        Today
                      </button>
                    </li>
                    <li role="none">
                      <button
                        type="button"
                        role="menuitemradio"
                        aria-checked={sortMode === "this-week"}
                        className={sortMode === "this-week" ? "is-active" : undefined}
                        onClick={() => {
                          setSortMode("this-week");
                          setSortMenuOpen(false);
                        }}
                      >
                        This week
                      </button>
                    </li>
                  </ul>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="student-feed-comments__composer">
            <div className="student-feed-comments__author">
              <Image
                src={AVATAR_STUDENT}
                alt=""
                width={26}
                height={26}
                className="student-feed-comments__avatar"
                unoptimized
              />
              <span className="student-feed-comments__author-name">{composerName}</span>
            </div>
            <div className="student-feed-comments__field" ref={fieldRef}>
              <label className="visually-hidden" htmlFor={editorId}>
                Type your comment here
              </label>
              {canPost ? (
                <div
                  id={editorId}
                  ref={editorRef}
                  className="student-feed-comments__textarea student-feed-comments__editor"
                  contentEditable
                  role="textbox"
                  aria-multiline="true"
                  aria-label="Type your comment here"
                  data-placeholder="Type your comment here"
                  data-max-length={COMMENT_MAX}
                  onInput={onEditorInput}
                  suppressContentEditableWarning
                />
              ) : (
                <textarea
                  id={editorId}
                  className="student-feed-comments__textarea"
                  placeholder="Type your comment here"
                  rows={2}
                  disabled
                  readOnly
                  aria-disabled="true"
                />
              )}
              <div className="student-feed-comments__toolbar" aria-hidden={!canPost}>
                <div className="student-feed-comments__tools" role="group" aria-label="Formatting">
                  <button
                    type="button"
                    className="student-feed-comments__tool is-b"
                    disabled={!canPost}
                    tabIndex={canPost ? 0 : -1}
                    aria-label="Bold selected text"
                    onClick={() => applyFormat("bold")}
                  >
                    B
                  </button>
                  <button
                    type="button"
                    className="student-feed-comments__tool is-i"
                    disabled={!canPost}
                    tabIndex={canPost ? 0 : -1}
                    aria-label="Italic selected text"
                    onClick={() => applyFormat("italic")}
                  >
                    I
                  </button>
                  <button
                    type="button"
                    className="student-feed-comments__tool is-s"
                    disabled={!canPost}
                    tabIndex={canPost ? 0 : -1}
                    aria-label="Strikethrough selected text"
                    onClick={() => applyFormat("strikeThrough")}
                  >
                    s
                  </button>
                  <div className="student-feed-comments__emoji-wrap" ref={emojiWrapRef}>
                    <button
                      type="button"
                      className="student-feed-comments__smile-btn"
                      disabled={!canPost}
                      tabIndex={canPost ? 0 : -1}
                      aria-label="Choose emoji"
                      aria-expanded={emojiOpen}
                      aria-controls={emojiOpen ? `${editorId}-emoji-picker` : undefined}
                      onClick={toggleEmojiPicker}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- decorative Figma SVG */}
                      <img
                        src={SMILE_SRC}
                        alt=""
                        width={23}
                        height={23}
                        className="student-feed-comments__smile"
                      />
                    </button>
                    {emojiOpen ? (
                      <div
                        id={`${editorId}-emoji-picker`}
                        className="student-feed-comments__emoji-picker"
                        role="listbox"
                        aria-label="Emoji"
                      >
                        {COMMENT_EMOJI_PICKER.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            className="student-feed-comments__emoji-option"
                            role="option"
                            aria-selected="false"
                            aria-label={`Insert ${emoji}`}
                            onClick={() => insertEmoji(emoji)}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
                <span className="student-feed-comments__count" aria-live="polite">
                  {canPost ? `${charCount}/${COMMENT_MAX}` : null}
                </span>
                <button
                  type="button"
                  className="student-feed-comments__submit"
                  disabled={!canPost || busy || charCount === 0}
                  tabIndex={canPost ? 0 : -1}
                  onClick={() => void submitComment()}
                >
                  {busy ? "Posting…" : "Comment"}
                </button>
              </div>
              {status ? (
                <p className="student-feed-comments__status-msg" role="status">
                  {status}
                </p>
              ) : null}
              {readOnly && fromStore ? (
                <p className="student-feed-comments__status-msg" role="status">
                  Preview is read-only. Exit View as Student to post as the student.
                </p>
              ) : null}
            </div>
          </div>

          <ul
            ref={listRef}
            className={`student-feed-comments__list${unlocked ? " is-scrollable" : ""}`}
            data-placebo-times={fromStore ? "false" : "true"}
            data-sort={sortMode}
          >
            {threads.length === 0 ? (
              <li className="student-feed-comments__item student-feed-comments__item--empty">
                <p className="student-feed-comments__empty">
                  {emptyFilterCopy ?? (fromStore ? "No comments yet. Be the first to comment!" : "No comments yet.")}
                </p>
              </li>
            ) : (
              threads.map((thread) => (
                <li key={thread.id} className="student-feed-comments__item">
                  <div className="student-feed-comments__author">
                    <Image
                      src={thread.avatarSrc}
                      alt=""
                      width={26}
                      height={26}
                      className="student-feed-comments__avatar"
                      unoptimized
                    />
                    <span className="student-feed-comments__author-name">{thread.author}</span>
                  </div>
                  <p className="student-feed-comments__body">{thread.body}</p>
                  <p className="student-feed-comments__time">
                    <time dateTime={thread.createdAt} data-placebo={fromStore ? "false" : "true"}>
                      {thread.time}
                    </time>
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>

        {!unlocked ? (
          <div
            className="student-feed-comments__forlocked"
            role="img"
            aria-label="Yet to Unlock Full Access"
          >
            <Image src={LOCK_SRC} alt="" width={96} height={96} unoptimized />
          </div>
        ) : null}
      </div>
    </section>
  );
}
