import { forwardRef } from 'react'
import { Download, Heart, MessageCircle, Send, Repeat2, Share2, Bookmark, MoreHorizontal, ThumbsUp, Globe, Plus } from 'lucide-react'
import './PostsStyles.css'

function getPostedText(posted) {
  if (!posted || typeof posted !== 'object') return 'about 2 months ago'
  if (posted.type === 'custom') return posted.customText || ''
  if (posted.type === 'now') return 'just now'
  const v = posted.value || 1
  if (posted.type === 'minutes') return `${v}m ago`
  if (posted.type === 'hours') return `${v}h ago`
  if (posted.type === 'days') return `${v}d ago`
  if (posted.type === 'weeks') return `about ${v} week${v > 1 ? 's' : ''} ago`
  if (posted.type === 'months') return `about ${v} month${v > 1 ? 's' : ''} ago`
  return 'just now'
}

function formatNumber(n) {
  const num = parseInt(n) || 0
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

function renderCaption(text, platform, authorName) {
  if (!text) return null
  // Detect hashtags and render them
  const parts = text.split(/(#\w+)/g)
  const rendered = parts.map((part, i) =>
    part.startsWith('#') ? <span key={i} className="hashtag">{part}</span> : part
  )

  if (platform === 'instagram') {
    return (
      <div className="post-caption" style={{ padding: '0 16px 8px' }}>
        <span className="post-caption-username">{authorName}</span>
        {rendered}
        <span className="see-more"> ...see more</span>
      </div>
    )
  }

  return (
    <div className="post-caption">
      {rendered}
      {text.length > 200 && <span className="see-more"> ...see more</span>}
    </div>
  )
}

// Verified badge SVG
const VerifiedBadge = ({ platform }) => {
  if (platform === 'x') {
    return (
      <svg width="16" height="16" viewBox="0 0 22 22" fill="none" style={{ marginLeft: 4, verticalAlign: 'middle' }}>
        <circle cx="11" cy="11" r="11" fill="#1D9BF0"/>
        <path d="M9.5 14.25L6.25 11L7.3 9.95L9.5 12.15L14.7 6.95L15.75 8L9.5 14.25Z" fill="white"/>
      </svg>
    )
  }
  if (platform === 'instagram' || platform === 'threads') {
    return (
      <svg width="14" height="14" viewBox="0 0 40 40" fill="none" style={{ marginLeft: 4, verticalAlign: 'middle' }}>
        <path d="M19.998 3.094L24.883 0l2.555 4.96 5.325-1.174.855 5.428 4.856 2.46-2.38 4.99 3.614 4.107-4.107 3.614 2.38 4.99-4.856 2.46-.855 5.428-5.325-1.174L24.883 40l-4.885-3.094L15.113 40l-2.555-4.96-5.325 1.174-.855-5.428-4.856-2.46 2.38-4.99L.288 19.23l4.107-3.614-2.38-4.99 4.856-2.46.855-5.428 5.325 1.174L15.113 0l4.885 3.094z" fill="#3897f0"/>
        <path d="M17.8 25.86l-6.02-6.02 2.83-2.83 3.19 3.19 7.07-7.07 2.83 2.83-9.9 9.9z" fill="#fff"/>
      </svg>
    )
  }
  if (platform === 'facebook') {
    return (
      <svg width="14" height="14" viewBox="0 0 40 40" fill="none" style={{ marginLeft: 4, verticalAlign: 'middle' }}>
        <path d="M19.998 3.094L24.883 0l2.555 4.96 5.325-1.174.855 5.428 4.856 2.46-2.38 4.99 3.614 4.107-4.107 3.614 2.38 4.99-4.856 2.46-.855 5.428-5.325-1.174L24.883 40l-4.885-3.094L15.113 40l-2.555-4.96-5.325 1.174-.855-5.428-4.856-2.46 2.38-4.99L.288 19.23l4.107-3.614-2.38-4.99 4.856-2.46.855-5.428 5.325 1.174L15.113 0l4.885 3.094z" fill="#1877F2"/>
        <path d="M17.8 25.86l-6.02-6.02 2.83-2.83 3.19 3.19 7.07-7.07 2.83 2.83-9.9 9.9z" fill="#fff"/>
      </svg>
    )
  }
  if (platform === 'youtube') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 4, verticalAlign: 'middle' }}>
        <circle cx="12" cy="12" r="12" fill="#606060"/>
        <path d="M9.5 15.25L7 12.75L7.7 12.05L9.5 13.85L16.3 7.05L17 7.75L9.5 15.25Z" fill="white"/>
      </svg>
    )
  }
  // LinkedIn, Reddit — no badge
  return null
}

/* ── Platform-Specific Reaction Icons (accurate inline SVGs) ── */

// LinkedIn Like — blue circle, white thumbs-up
const LikeIcon = ({ bg = '#0a66c2' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" fill={bg}/>
    <path d="M8 17h-.5a1 1 0 01-1-1v-4.5a1 1 0 011-1H8m0 6.5V10.5m0 6.5h5.25a1.5 1.5 0 001.46-1.15l.84-3.5A1.5 1.5 0 0014.09 10.5H12V8a1.5 1.5 0 00-1.5-1.5l-2.5 4" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Heart icon — red/coral circle, white heart
const HeartIcon = ({ bg = '#df704d' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" fill={bg}/>
    <path d="M12 17.5s-5.5-3.3-5.5-6.8c0-2 1.6-3.2 3.2-3.2 1 0 1.8.5 2.3 1.2.5-.7 1.3-1.2 2.3-1.2 1.6 0 3.2 1.2 3.2 3.2 0 3.5-5.5 6.8-5.5 6.8z" fill="#fff"/>
  </svg>
)

// LinkedIn Insightful — yellow-green circle, lightbulb
const InsightfulIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" fill="#e8a600"/>
    <path d="M12 6a4 4 0 00-4 4c0 1.5.8 2.7 2 3.4V15a1 1 0 001 1h2a1 1 0 001-1v-1.6c1.2-.7 2-1.9 2-3.4a4 4 0 00-4-4z" fill="#fff"/>
    <rect x="10" y="16.5" width="4" height="1" rx="0.5" fill="#fff"/>
  </svg>
)

// Facebook Care/Haha — yellow circle, smiling face
const HahaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" fill="#f7b928"/>
    <path d="M8.2 9.5c.3-.8.7-1.2 1.3-1.2s1 .4 1.3 1.2" fill="none" stroke="#6d4c00" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M13.2 9.5c.3-.8.7-1.2 1.3-1.2s1 .4 1.3 1.2" fill="none" stroke="#6d4c00" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M7.5 13c0 0 1.8 4.5 4.5 4.5s4.5-4.5 4.5-4.5" fill="#6d4c00"/>
    <path d="M8.5 13c0 0 1.2 2 3.5 2s3.5-2 3.5-2" fill="#fff"/>
  </svg>
)

const LinkedInReactions = () => (
  <div className="post-reaction-icons">
    <span><LikeIcon bg="#0a66c2" /></span>
    <span><HeartIcon bg="#df704d" /></span>
    <span><InsightfulIcon /></span>
  </div>
)

const FacebookReactions = () => (
  <div className="post-reaction-icons">
    <span><LikeIcon bg="#1877f2" /></span>
    <span><HeartIcon bg="#f0625a" /></span>
    <span><HahaIcon /></span>
  </div>
)

/* ── Post Card Component ── */
const PostsPreview = forwardRef(function PostsPreview(
  { platform, author, content, metrics, appearance, onDownload },
  ref
) {
  const darkMode = appearance.darkMode
  const posted = getPostedText(content.postedAt)

  return (
    <div className="post-preview-container preview-container">
      <div className="post-preview-wrapper">
        <div
          ref={ref}
          className="post-card"
          data-platform={platform}
          data-theme={darkMode ? 'dark' : 'light'}
        >
          {/* ── Header ── */}
          <div className="post-header">
            <div className="post-avatar">
              {author.avatar ? (
                <img src={author.avatar} alt={author.name} />
              ) : (
                <span>{(author.name || 'U')[0].toUpperCase()}</span>
              )}
            </div>

            <div className="post-header-text">
              <div className="post-author-row">
                <span className="post-author-name">
                  {author.name || 'Name'}
                  {author.verified && <VerifiedBadge platform={platform} />}
                </span>
              </div>

              {/* Subtitle line */}
              {(platform === 'linkedin' || platform === 'facebook') && author.subtitle && (
                <div className="post-author-subtitle">{author.subtitle}</div>
              )}
              {(platform === 'x' || platform === 'threads' || platform === 'instagram') && author.subtitle && (
                <div className="post-author-subtitle">{author.subtitle}</div>
              )}

              {/* Time / meta line */}
              <div className="post-author-meta">
                <span>{posted}</span>
                {(platform === 'linkedin' || platform === 'facebook') && (
                  <>
                    <span>·</span>
                    <Globe size={12} />
                  </>
                )}
              </div>
            </div>

            <div className="post-header-actions">
              {platform === 'linkedin' && (
                <button className="post-follow-btn">
                  <Plus size={14} /> Follow
                </button>
              )}
              {platform === 'instagram' && (
                <button className="post-follow-btn">Follow</button>
              )}
              {platform === 'x' && (
                <button className="post-follow-btn">Follow</button>
              )}
              <span className="post-more-btn">
                <MoreHorizontal size={20} />
              </span>
            </div>
          </div>

          {/* ── Body / Caption ── */}
          {platform !== 'instagram' && (
            <div className="post-body">
              {renderCaption(content.caption, platform, author.name)}
            </div>
          )}

          {/* ── Post Image ── */}
          {content.image && (
            <img src={content.image} alt="Post" className="post-image" />
          )}

          {/* Instagram caption goes below image */}
          {platform === 'instagram' && content.caption && (
            renderCaption(content.caption, platform, author.name)
          )}

          {/* ── Engagement Bar ── */}
          {platform === 'linkedin' && (
            <div className="post-engagement">
              <div className="post-reactions">
                {parseInt(metrics.reactions) >= 10 ? <LinkedInReactions /> : (
                  <div className="post-reaction-icons">
                    <span><LikeIcon bg="#0a66c2" /></span>
                  </div>
                )}
                <span style={{ marginLeft: 4 }}>{formatNumber(metrics.reactions)}</span>
              </div>
              <div className="post-engagement-right">
                {metrics.comments && <span>{formatNumber(metrics.comments)} comments</span>}
                {metrics.comments && metrics.reposts && <span>•</span>}
                {metrics.reposts && <span>{formatNumber(metrics.reposts)} reposts</span>}
              </div>
            </div>
          )}

          {platform === 'facebook' && (
            <div className="post-engagement">
              <div className="post-reactions">
                <div className="post-reaction-icons">
                  <span><LikeIcon bg="#1877f2" /></span>
                </div>
                <span style={{ marginLeft: 4 }}>{formatNumber(metrics.reactions)}</span>
              </div>
              <div className="post-engagement-right">
                {metrics.comments && <span>{formatNumber(metrics.comments)} comments</span>}
                {metrics.reposts && <span>{formatNumber(metrics.reposts)} shares</span>}
              </div>
            </div>
          )}

          {platform === 'instagram' && (
            <div className="post-engagement">
              <span>{formatNumber(metrics.reactions)} likes</span>
            </div>
          )}

          {platform === 'threads' && (
            <div className="post-engagement" style={{ borderBottom: 'none' }}>
              <div className="post-engagement-right" style={{ gap: 14 }}>
                <span>{formatNumber(metrics.reactions)} likes</span>
                <span>{formatNumber(metrics.comments)} replies</span>
              </div>
            </div>
          )}

          {/* ── Action Buttons ── */}
          <div className="post-actions">
            {platform === 'linkedin' && (
              <>
                <button className="post-action-btn"><ThumbsUp size={18} /> Like</button>
                <button className="post-action-btn"><MessageCircle size={18} /> Comment</button>
                <button className="post-action-btn"><Repeat2 size={18} /> Repost</button>
                <button className="post-action-btn"><Send size={18} /> Send</button>
              </>
            )}

            {platform === 'facebook' && (
              <>
                <button className="post-action-btn"><ThumbsUp size={18} /> Like</button>
                <button className="post-action-btn"><MessageCircle size={18} /> Comment</button>
                <button className="post-action-btn"><Share2 size={18} /> Share</button>
              </>
            )}

            {platform === 'instagram' && (
              <>
                <button className="post-action-btn"><Heart size={22} /></button>
                <button className="post-action-btn"><MessageCircle size={22} /></button>
                <button className="post-action-btn"><Send size={22} /></button>
                <button className="post-action-btn"><Bookmark size={22} /></button>
              </>
            )}

            {platform === 'x' && (
              <>
                <button className="post-action-btn"><MessageCircle size={18} /> {formatNumber(metrics.comments)}</button>
                <button className="post-action-btn"><Repeat2 size={18} /> {formatNumber(metrics.reposts)}</button>
                <button className="post-action-btn"><Heart size={18} /> {formatNumber(metrics.reactions)}</button>
                <button className="post-action-btn"><Bookmark size={18} /></button>
              </>
            )}

            {platform === 'pinterest' && (
              <>
                <button className="post-action-btn secondary"><Share2 size={16} /></button>
                <button className="post-action-btn">Save</button>
              </>
            )}

            {platform === 'threads' && (
              <>
                <button className="post-action-btn"><Heart size={20} /></button>
                <button className="post-action-btn"><MessageCircle size={20} /></button>
                <button className="post-action-btn"><Repeat2 size={20} /></button>
                <button className="post-action-btn"><Send size={20} /></button>
              </>
            )}
          </div>
        </div>
      </div>

      <button className="btn-download" onClick={onDownload}>
        <Download size={16} />
        Download
      </button>
    </div>
  )
})

export default PostsPreview
