import { forwardRef } from 'react'
import { Download, ChevronDown, Heart, ThumbsUp, ThumbsDown, MessageCircle, ArrowBigUp, ArrowBigDown } from 'lucide-react'
import './CommentsStyles.css'

const avatarColors = ['#0a66c2', '#e1306c', '#6dae4f', '#e8a600', '#df704d', '#8b5cf6', '#ef4444', '#06b6d4']

// Verified badge per platform
const VerifiedBadge = ({ platform }) => {
  if (platform === 'x') {
    return (
      <svg width="14" height="14" viewBox="0 0 22 22" fill="none" style={{ marginLeft: 3, verticalAlign: 'middle', flexShrink: 0 }}>
        <circle cx="11" cy="11" r="11" fill="#1D9BF0"/>
        <path d="M9.5 14.25L6.25 11L7.3 9.95L9.5 12.15L14.7 6.95L15.75 8L9.5 14.25Z" fill="white"/>
      </svg>
    )
  }
  if (platform === 'youtube') {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 3, verticalAlign: 'middle', flexShrink: 0 }}>
        <circle cx="12" cy="12" r="12" fill="#606060"/>
        <path d="M9.5 15.25L7 12.75L7.7 12.05L9.5 13.85L16.3 7.05L17 7.75L9.5 15.25Z" fill="white"/>
      </svg>
    )
  }
  if (platform === 'linkedin' || platform === 'reddit') return null
  // Instagram, Facebook, Threads — blue star badge
  const color = platform === 'facebook' ? '#1877F2' : '#3897f0'
  return (
    <svg width="13" height="13" viewBox="0 0 40 40" fill="none" style={{ marginLeft: 3, verticalAlign: 'middle', flexShrink: 0 }}>
      <path d="M19.998 3.094L24.883 0l2.555 4.96 5.325-1.174.855 5.428 4.856 2.46-2.38 4.99 3.614 4.107-4.107 3.614 2.38 4.99-4.856 2.46-.855 5.428-5.325-1.174L24.883 40l-4.885-3.094L15.113 40l-2.555-4.96-5.325 1.174-.855-5.428-4.856-2.46 2.38-4.99L.288 19.23l4.107-3.614-2.38-4.99 4.856-2.46.855-5.428 5.325 1.174L15.113 0l4.885 3.094z" fill={color}/>
      <path d="M17.8 25.86l-6.02-6.02 2.83-2.83 3.19 3.19 7.07-7.07 2.83 2.83-9.9 9.9z" fill="#fff"/>
    </svg>
  )
}

function formatNumber(n) {
  const num = parseInt(n) || 0
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

// LinkedIn blue like icon
const LikeReactionIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" style={{ verticalAlign: 'middle' }}>
    <circle cx="12" cy="12" r="12" fill="#0a66c2"/>
    <path d="M8 17h-.5a1 1 0 01-1-1v-4.5a1 1 0 011-1H8m0 6.5V10.5m0 6.5h5.25a1.5 1.5 0 001.46-1.15l.84-3.5A1.5 1.5 0 0014.09 10.5H12V8a1.5 1.5 0 00-1.5-1.5l-2.5 4" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Platform config
const platformConfig = {
  linkedin: { sort: 'Most relevant', badge: '· 3rd+', showHandle: true, showBubble: true, showInputBar: true, inputAction: 'Post' },
  facebook: { sort: 'Most relevant', badge: '', showHandle: false, showBubble: true, showInputBar: true, inputAction: 'Post' },
  instagram: { sort: '', badge: '', showHandle: false, showBubble: false, showInputBar: true, inputAction: 'Post' },
  x: { sort: '', badge: '', showHandle: true, showBubble: false, showInputBar: false, inputAction: '' },
  reddit: { sort: 'Best', badge: '', showHandle: true, showBubble: false, showInputBar: true, inputAction: 'Comment' },
  youtube: { sort: 'Top comments', badge: '', showHandle: false, showBubble: false, showInputBar: true, inputAction: 'Comment' },
  threads: { sort: '', badge: '', showHandle: true, showBubble: false, showInputBar: false, inputAction: '' },
}

/* ── Render comment actions per platform ── */
function CommentActions({ platform, likes, hasReplies, replyCount, time, isReply }) {
  const likeCount = formatNumber(likes)
  const hasLikes = parseInt(likes) > 0

  if (platform === 'linkedin') {
    return (
      <div className="comment-actions">
        <span className="comment-action-link comment-action-like">
          Like{hasLikes && <>{' '}<LikeReactionIcon /> {likeCount}</>}
        </span>
        <span className="comment-action-separator">|</span>
        <span className="comment-action-link">Reply</span>
        {!isReply && hasReplies && (
          <>
            <span className="comment-action-separator">|</span>
            <span className="comment-action-link">{replyCount} {replyCount === 1 ? 'reply' : 'replies'}</span>
          </>
        )}
        <span className="comment-action-time">{time}</span>
      </div>
    )
  }

  if (platform === 'facebook') {
    return (
      <div className="comment-actions">
        <span className="comment-action-link" style={{ color: hasLikes ? '#1877f2' : undefined }}>Like</span>
        <span className="comment-action-separator">·</span>
        <span className="comment-action-link">Reply</span>
        <span className="comment-action-separator">·</span>
        <span className="comment-action-time" style={{ marginLeft: 0 }}>{time}</span>
        {hasLikes && (
          <span className="comment-action-like" style={{ marginLeft: 'auto' }}>
            <ThumbsUp size={12} fill="currentColor" /> {likeCount}
          </span>
        )}
      </div>
    )
  }

  if (platform === 'instagram') {
    return (
      <div className="comment-actions" style={{ gap: 12 }}>
        <span className="comment-action-time" style={{ marginLeft: 0 }}>{time}</span>
        {hasLikes && <span className="comment-action-link">{likeCount} likes</span>}
        <span className="comment-action-link">Reply</span>
        <Heart size={12} style={{ marginLeft: 'auto', cursor: 'default' }} />
      </div>
    )
  }

  if (platform === 'x') {
    return (
      <div className="comment-actions" style={{ gap: 20 }}>
        <span className="comment-action-like"><MessageCircle size={14} /></span>
        <span className="comment-action-like"><Heart size={14} /> {hasLikes ? likeCount : ''}</span>
        <span className="comment-action-time" style={{ marginLeft: 'auto' }}>{time}</span>
      </div>
    )
  }

  if (platform === 'reddit') {
    return (
      <div className="comment-actions" style={{ gap: 6 }}>
        <ArrowBigUp size={16} style={{ cursor: 'default' }} />
        <span style={{ fontWeight: 600, fontSize: 12 }}>{hasLikes ? likeCount : '1'}</span>
        <ArrowBigDown size={16} style={{ cursor: 'default' }} />
        <span className="comment-action-link" style={{ marginLeft: 8 }}>Reply</span>
        <span className="comment-action-time">{time}</span>
      </div>
    )
  }

  if (platform === 'youtube') {
    return (
      <div className="comment-actions" style={{ gap: 8 }}>
        <span className="comment-action-like"><ThumbsUp size={14} /> {hasLikes ? likeCount : ''}</span>
        <ThumbsDown size={14} style={{ cursor: 'default' }} />
        <span className="comment-action-link" style={{ marginLeft: 8 }}>Reply</span>
        <span className="comment-action-time">{time}</span>
      </div>
    )
  }

  if (platform === 'threads') {
    return (
      <div className="comment-actions" style={{ gap: 12 }}>
        <span className="comment-action-like"><Heart size={14} /> {hasLikes ? likeCount : ''}</span>
        <span className="comment-action-link">Reply</span>
        <span className="comment-action-time">{time}</span>
      </div>
    )
  }

  return null
}

/* ── Header per platform ── */
function ThreadHeader({ platform }) {
  const cfg = platformConfig[platform] || platformConfig.linkedin
  if (!cfg.sort) return null

  return (
    <div className="comment-thread-header">
      <span className="comment-thread-title">Comments</span>
      <span className="comment-thread-sort">
        {cfg.sort} <ChevronDown size={14} />
      </span>
    </div>
  )
}

/* ── Resolve person from allPeople ── */
function getPersonInfo(personId, allPeople, commenters) {
  const person = allPeople.find(p => p.id === personId)
  if (!person) return { name: 'Unknown', handle: '', avatar: null, color: '#65676b', initial: '?' }
  const idx = commenters.findIndex(c => c.id === personId)
  const color = idx >= 0 ? avatarColors[idx % avatarColors.length] : '#65676b'
  return {
    name: person.name,
    handle: person.handle || '',
    avatar: person.avatar,
    color,
    initial: person.name?.[0]?.toUpperCase() || '?',
    isCreator: personId === allPeople[0]?.id,
    verified: person.verified || false,
  }
}

const CommentsPreview = forwardRef(function CommentsPreview(
  { platform, creator, commenters, comments, appearance, onDownload },
  ref
) {
  const darkMode = appearance.darkMode
  const cfg = platformConfig[platform] || platformConfig.linkedin
  const allPeople = [creator, ...commenters]

  return (
    <div className="comments-preview-container preview-container">
      <div className="comments-preview-wrapper">
        <div
          ref={ref}
          className="comment-card"
          data-platform={platform}
          data-theme={darkMode ? 'dark' : 'light'}
        >
          <ThreadHeader platform={platform} />

          {/* Comment Items */}
          {comments.map((comment) => {
            const person = getPersonInfo(comment.personId, allPeople, commenters)

            return (
              <div key={comment.id}>
                {/* Main Comment */}
                <div className="comment-item">
                  <div className="comment-avatar" style={{ background: person.color }}>
                    {person.avatar ? (
                      <img src={person.avatar} alt={person.name} />
                    ) : (
                      person.initial
                    )}
                  </div>
                  <div className="comment-body">
                    <div className="comment-bubble">
                      <div className="comment-author-row">
                        <span className="comment-author-name">{person.name}</span>
                        {person.verified && <VerifiedBadge platform={platform} />}
                        {cfg.badge && <span className="comment-author-badge">{cfg.badge}</span>}
                        {platform === 'x' && person.handle && (
                          <span className="comment-author-badge">@{person.handle}</span>
                        )}
                        {platform === 'reddit' && person.handle && (
                          <span className="comment-author-badge">u/{person.handle}</span>
                        )}
                        {platform === 'youtube' && (
                          <span className="comment-author-badge">{comment.time || '1mo'}</span>
                        )}
                      </div>
                      {(platform === 'linkedin' || platform === 'instagram' || platform === 'threads') && person.handle && (
                        <div className="comment-author-handle">{person.handle}</div>
                      )}
                      <div className="comment-text">{comment.text}</div>
                    </div>
                    <CommentActions
                      platform={platform}
                      likes={comment.likes}
                      hasReplies={comment.replies?.length > 0}
                      replyCount={comment.replies?.length || 0}
                      time={comment.time || '1mo'}
                      isReply={false}
                    />
                  </div>
                </div>

                {/* Replies */}
                {comment.replies?.map((reply) => {
                  const replyPerson = getPersonInfo(reply.personId, allPeople, commenters)

                  return (
                    <div key={reply.id} className="comment-item nested">
                      <div className="comment-avatar" style={{ background: replyPerson.color }}>
                        {replyPerson.avatar ? (
                          <img src={replyPerson.avatar} alt={replyPerson.name} />
                        ) : (
                          replyPerson.initial
                        )}
                      </div>
                      <div className="comment-body">
                        <div className="comment-bubble">
                          <div className="comment-author-row">
                            <span className="comment-author-name">{replyPerson.name}</span>
                            {replyPerson.verified && <VerifiedBadge platform={platform} />}
                            {cfg.badge && <span className="comment-author-badge">{cfg.badge}</span>}
                            {platform === 'x' && replyPerson.handle && (
                              <span className="comment-author-badge">@{replyPerson.handle}</span>
                            )}
                            {platform === 'reddit' && replyPerson.handle && (
                              <span className="comment-author-badge">u/{replyPerson.handle} {replyPerson.isCreator ? '· OP' : ''}</span>
                            )}
                          </div>
                          {(platform === 'linkedin' || platform === 'instagram' || platform === 'threads') && replyPerson.handle && (
                            <div className="comment-author-handle">{replyPerson.handle}</div>
                          )}
                          <div className="comment-text">{reply.text}</div>
                        </div>
                        <CommentActions
                          platform={platform}
                          likes={reply.likes || '0'}
                          hasReplies={false}
                          replyCount={0}
                          time={reply.time || '1mo'}
                          isReply={true}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}

          {/* Comment Input Footer */}
          {cfg.showInputBar && (
            <div className="comment-input-bar">
              <div className="comment-input-avatar">
                {creator.avatar ? (
                  <img src={creator.avatar} alt="You" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                ) : 'Y'}
              </div>
              <div className="comment-input-field">Add a comment...</div>
              <span className="comment-input-post">{cfg.inputAction}</span>
            </div>
          )}
        </div>
      </div>

      <button className="btn-download" onClick={onDownload}>
        <Download size={16} />
        Download
      </button>
    </div>
  )
})

export default CommentsPreview
