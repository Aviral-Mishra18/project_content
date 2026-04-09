import { ContentItem } from "@/types/tweet";
import { Heart, MessageCircle, Repeat2, Share, BarChart2, Bookmark, MoreHorizontal, ThumbsUp, Send, Globe } from "lucide-react";

// ─── Twitter / X Preview ────────────────────────────────────────
export const TwitterPreview = ({ item }: { item: ContentItem }) => (
  <div className="rounded-2xl border border-border/50 bg-black p-5 space-y-3 font-['Inter',sans-serif] text-[15px]">
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
        U
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-white text-[15px]">Your Brand</span>
          <svg viewBox="0 0 22 22" className="h-4 w-4 text-blue-400 fill-current"><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.607-.274 1.264-.144 1.897.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.706 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/></svg>
          <span className="text-[#71767b] text-[13px]">@yourbrand · 2m</span>
        </div>
        <div className="mt-1 text-white leading-[1.4] whitespace-pre-wrap">
          {item.hook && <span className="font-semibold">{item.hook}</span>}
          {item.hook && item.content && '\n\n'}
          {item.content}
        </div>
        {item.hashtags && item.hashtags.length > 0 && (
          <div className="mt-2 text-blue-400 text-[14px]">
            {item.hashtags.map(tag => (
              <span key={tag} className="mr-1.5 hover:underline cursor-pointer">{tag.startsWith('#') ? tag : `#${tag}`}</span>
            ))}
          </div>
        )}
        {item.cta && (
          <p className="mt-2 text-white font-medium text-[14px]">{item.cta}</p>
        )}
        <div className="flex items-center justify-between mt-4 text-[#71767b] max-w-[400px]">
          <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors group">
            <MessageCircle className="h-4 w-4 group-hover:bg-blue-400/10 rounded-full" /> <span className="text-[13px]">24</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
            <Repeat2 className="h-4 w-4" /> <span className="text-[13px]">12</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-pink-400 transition-colors">
            <Heart className="h-4 w-4" /> <span className="text-[13px]">148</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
            <BarChart2 className="h-4 w-4" /> <span className="text-[13px]">2.4K</span>
          </button>
          <div className="flex gap-2">
            <Bookmark className="h-4 w-4 hover:text-blue-400 cursor-pointer" />
            <Share className="h-4 w-4 hover:text-blue-400 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Instagram Preview ──────────────────────────────────────────
export const InstagramPreview = ({ item }: { item: ContentItem }) => (
  <div className="rounded-2xl border border-border/50 bg-black overflow-hidden font-['Inter',sans-serif]">
    {/* Header */}
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 p-[2px]">
          <div className="h-full w-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold text-white">U</div>
        </div>
        <span className="text-white text-[13px] font-semibold">yourbrand</span>
      </div>
      <MoreHorizontal className="h-5 w-5 text-white" />
    </div>

    {/* Image placeholder */}
    <div className="aspect-square bg-gradient-to-br from-purple-900/40 via-pink-900/20 to-amber-900/30 flex items-center justify-center border-y border-border/20">
      <div className="text-center p-8">
        <p className="text-white/90 text-lg font-bold leading-snug max-w-[280px]">{item.hook || item.content?.slice(0, 100)}</p>
      </div>
    </div>

    {/* Actions */}
    <div className="px-4 py-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <Heart className="h-6 w-6 text-white hover:text-red-500 cursor-pointer" />
          <MessageCircle className="h-6 w-6 text-white cursor-pointer" />
          <Send className="h-6 w-6 text-white cursor-pointer" />
        </div>
        <Bookmark className="h-6 w-6 text-white cursor-pointer" />
      </div>
      <p className="text-white text-[13px] font-semibold">1,247 likes</p>
      <p className="text-white text-[13px] leading-[1.4]">
        <span className="font-semibold mr-1">yourbrand</span>
        {item.content}
      </p>
      {item.hashtags && item.hashtags.length > 0 && (
        <p className="text-[#00376b] dark:text-blue-400 text-[13px]">
          {item.hashtags.map(tag => (
            <span key={tag} className="mr-1">{tag.startsWith('#') ? tag : `#${tag}`}</span>
          ))}
        </p>
      )}
    </div>
  </div>
);

// ─── LinkedIn Preview ───────────────────────────────────────────
export const LinkedInPreview = ({ item }: { item: ContentItem }) => (
  <div className="rounded-2xl border border-border/50 bg-[#1b1f23] overflow-hidden font-['Inter',sans-serif]">
    {/* Header */}
    <div className="flex items-start gap-3 p-4">
      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold shrink-0">
        U
      </div>
      <div className="flex-1">
        <p className="text-white font-semibold text-[14px]">Your Name</p>
        <p className="text-[#ffffffa3] text-[12px]">Content Strategist | AI Enthusiast</p>
        <div className="flex items-center gap-1 text-[#ffffffa3] text-[12px] mt-0.5">
          <span>2h</span> · <Globe className="h-3 w-3" />
        </div>
      </div>
      <MoreHorizontal className="h-5 w-5 text-[#ffffffa3]" />
    </div>

    {/* Content */}
    <div className="px-4 pb-4 text-white text-[14px] leading-[1.5] whitespace-pre-wrap">
      {item.hook && <p className="font-bold mb-2">{item.hook}</p>}
      {item.content}
      {item.hashtags && item.hashtags.length > 0 && (
        <p className="mt-3 text-blue-400">
          {item.hashtags.map(tag => (
            <span key={tag} className="mr-1">{tag.startsWith('#') ? tag : `#${tag}`}</span>
          ))}
        </p>
      )}
      {item.cta && <p className="mt-2 font-medium">{item.cta}</p>}
    </div>

    {/* Stats bar */}
    <div className="px-4 py-2 border-t border-[#ffffff1a] text-[12px] text-[#ffffffa3] flex items-center gap-2">
      <span>👍 💡 ❤️</span>
      <span>142 reactions</span>
      <span className="ml-auto">18 comments · 6 reposts</span>
    </div>

    {/* Actions */}
    <div className="grid grid-cols-4 border-t border-[#ffffff1a]">
      {[
        { icon: ThumbsUp, label: "Like" },
        { icon: MessageCircle, label: "Comment" },
        { icon: Repeat2, label: "Repost" },
        { icon: Send, label: "Send" },
      ].map(action => (
        <button key={action.label} className="flex items-center justify-center gap-1.5 py-3 text-[#ffffffa3] hover:bg-[#ffffff0a] text-[12px] font-semibold transition-colors">
          <action.icon className="h-4 w-4" /> {action.label}
        </button>
      ))}
    </div>
  </div>
);

// ─── Facebook Preview ───────────────────────────────────────────
export const FacebookPreview = ({ item }: { item: ContentItem }) => (
  <div className="rounded-2xl border border-border/50 bg-[#242526] overflow-hidden font-['Inter',sans-serif]">
    {/* Header */}
    <div className="flex items-start gap-2.5 p-4">
      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shrink-0">
        U
      </div>
      <div className="flex-1">
        <p className="text-white font-semibold text-[14px]">Your Page</p>
        <div className="flex items-center gap-1 text-[#b0b3b8] text-[12px]">
          <span>Just now</span> · <Globe className="h-3 w-3" />
        </div>
      </div>
      <MoreHorizontal className="h-5 w-5 text-[#b0b3b8]" />
    </div>

    {/* Content */}
    <div className="px-4 pb-4 text-[#e4e6eb] text-[15px] leading-[1.4] whitespace-pre-wrap">
      {item.hook && <p className="font-semibold mb-1">{item.hook}</p>}
      {item.content}
      {item.hashtags && item.hashtags.length > 0 && (
        <p className="mt-2 text-blue-400">
          {item.hashtags.map(tag => (
            <span key={tag} className="mr-1">{tag.startsWith('#') ? tag : `#${tag}`}</span>
          ))}
        </p>
      )}
      {item.cta && <p className="mt-2 font-medium">{item.cta}</p>}
    </div>

    {/* Engagement */}
    <div className="px-4 py-2 flex items-center justify-between text-[13px] text-[#b0b3b8]">
      <span>👍 ❤️ 86</span>
      <span>12 comments · 4 shares</span>
    </div>

    {/* Actions */}
    <div className="grid grid-cols-3 border-t border-[#3e4042] mx-4">
      {["👍 Like", "💬 Comment", "↗ Share"].map(action => (
        <button key={action} className="py-2.5 text-[#b0b3b8] hover:bg-[#3a3b3c] text-[14px] font-semibold transition-colors rounded-lg">
          {action}
        </button>
      ))}
    </div>
    <div className="h-2" />
  </div>
);

// ─── Preview Selector ───────────────────────────────────────────
export const PlatformPreview = ({ item }: { item: ContentItem }) => {
  switch (item.platform) {
    case 'twitter': return <TwitterPreview item={item} />;
    case 'instagram': return <InstagramPreview item={item} />;
    case 'linkedin': return <LinkedInPreview item={item} />;
    case 'facebook': return <FacebookPreview item={item} />;
    default: return <TwitterPreview item={item} />;
  }
};
