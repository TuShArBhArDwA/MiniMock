import { forwardRef } from 'react'
import { Download, Heart, Send, Image, ArrowLeft, Repeat, MoreVertical, AudioLines } from 'lucide-react'
import StatusBar from '../preview/StatusBar'
import './StoriesStyles.css'

function getRelativeTime(posted, platform = 'instagram') {
  if (!posted || typeof posted !== 'object') {
     posted = { type: 'hours', value: 1, customText: '' }
  }

  if (posted.type === 'custom') {
    return posted.customText || ''
  }

  if (platform === 'whatsapp') {
    let offsetMs = 0
    if (posted.type === 'minutes') offsetMs = (posted.value || 1) * 60000
    else if (posted.type === 'hours') offsetMs = (posted.value || 1) * 3600000

    const date = new Date(Date.now() - offsetMs)
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    
    // WhatsApp Format: "Today, 14:30" or "Yesterday, 09:15"
    const nowDay = new Date().setHours(0,0,0,0)
    const postedDay = new Date(date).setHours(0,0,0,0)
    const diffDay = Math.round((nowDay - postedDay) / (1000 * 60 * 60 * 24))
        
    if (diffDay === 0) return `Today, ${timeStr}`
    if (diffDay === 1) return `Yesterday, ${timeStr}`
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${timeStr}`
  }

  // Instagram Format
  if (posted.type === 'now') return 'just now'
  if (posted.type === 'minutes') return `${posted.value || 1}m`
  if (posted.type === 'hours') return `${posted.value || 1}h`
  return 'just now'
}

const VerifiedBadge = () => (
  <svg width="12" height="12" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="story-verified">
    <path d="M19.998 3.094L24.883 0l2.555 4.96 5.325-1.174.855 5.428 4.856 2.46-2.38 4.99 3.614 4.107-4.107 3.614 2.38 4.99-4.856 2.46-.855 5.428-5.325-1.174L24.883 40l-4.885-3.094L15.113 40l-2.555-4.96-5.325 1.174-.855-5.428-4.856-2.46 2.38-4.99L.288 19.23l4.107-3.614-2.38-4.99 4.856-2.46.855-5.428 5.325 1.174L15.113 0l4.885 3.094z" fill="#3897f0"/>
    <path d="M17.8 25.86l-6.02-6.02 2.83-2.83 3.19 3.19 7.07-7.07 2.83 2.83-9.9 9.9z" fill="#fff"/>
  </svg>
)

const StoriesPreview = forwardRef(function StoriesPreview(
  { platform, profile, slides, activeSlide, appearance, onDownload },
  ref
) {
  const currentSlide = slides[activeSlide] || slides[0]

  return (
    <div className="preview-container">
      <div className="preview-wrapper">
        <div
          ref={ref}
          className={`preview-phone story-preview-phone ${appearance.phoneFrame ? 'with-frame' : ''}`}
          data-platform={platform}
        >
          {/* Status Bar — in flow, same as Chat/AI Chat */}
          {appearance.statusBar && (
            <StatusBar
              time={appearance.statusBarTime}
              battery={appearance.battery}
              headerBg="#000000"
            />
          )}

          {/* Story content area — flex:1, everything inside is overlaid */}
          <div className="story-content">
            {/* Background image — fills entire content area */}
            <div className="story-image-area">
              {currentSlide?.image ? (
                <>
                  {/* Blurred background layer for non-9:16 images */}
                  <div 
                    className="story-image-backdrop" 
                    style={{ backgroundImage: `url(${currentSlide.image})` }} 
                  />
                  {/* Foreground contained image */}
                  <img src={currentSlide.image} alt="Story" className="story-image-foreground" />
                </>
              ) : (
                <div className="story-no-image">
                  <Image size={36} strokeWidth={1.2} />
                  <span>No image</span>
                </div>
              )}
            </div>

            {/* Top gradient for readability */}
            <div className="story-top-gradient" />

            {/* Progress Bar */}
            <div className="story-progress-bar">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`story-progress-segment ${i < activeSlide ? 'viewed' : ''} ${i === activeSlide ? 'active' : ''}`}
                />
              ))}
            </div>

            {/* Story Header */}
            <div className="story-header">
              {platform === 'whatsapp' && (
                <ArrowLeft size={24} className="story-header-back" color="#fff" />
              )}
              <div className="story-avatar-ring">
                <div className="story-avatar-inner">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt={profile.username} />
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="story-header-text">
                {platform === 'whatsapp' ? (
                  <>
                    <span className="story-username">{profile.username || 'username'}</span>
                    <span className="story-time-text">{getRelativeTime(profile.postedAt, platform)}</span>
                  </>
                ) : (
                  <>
                    <div className="story-title-row">
                      <span className="story-username">
                        {profile.username || 'username'}
                        {profile.verified && <VerifiedBadge />}
                      </span>
                      <span className="story-time-text">{getRelativeTime(profile.postedAt, platform)}</span>
                    </div>
                    
                    {currentSlide?.music && (
                      <div className="story-music-tag">
                        <AudioLines size={10} className="music-icon" />
                        <div className="music-text-marquee">
                          <span>{currentSlide.music}</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="story-header-actions">
                <MoreVertical size={22} />
              </div>
            </div>



            {/* WhatsApp Caption (above footer) */}
            {platform === 'whatsapp' && currentSlide?.caption && (
              <div className="story-whatsapp-caption">
                {currentSlide.caption}
              </div>
            )}

            {/* Bottom gradient for readability */}
            <div className="story-bottom-gradient" />

            {/* Story Footer */}
            <div className="story-footer">
              <input
                type="text"
                className="story-reply-input"
                placeholder={platform === 'whatsapp' ? 'Reply' : 'Send message...'}
                readOnly
              />
              {platform === 'whatsapp' ? (
                  <>
                      <div className="story-footer-icon-btn">
                          <Repeat size={18} className="story-footer-icon" />
                      </div>
                      <div className="story-footer-icon-btn">
                          <Heart size={18} className="story-footer-icon" />
                      </div>
                  </>
              ) : (
                  <>
                      <Heart size={22} className="story-footer-icon" />
                      <Send size={22} className="story-footer-icon" />
                  </>
              )}
            </div>
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

export default StoriesPreview
