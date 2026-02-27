import { useState, useRef } from 'react'
import { Smartphone, User, ChevronDown, Settings2, Camera, ImagePlus, Trash2, BarChart3, Clock, Battery, Type, Briefcase, AtSign, Hash } from 'lucide-react'
import '../Editor.css'
import '../PeopleSection.css'
import '../AppearanceSection.css'
import '../stories/StoriesStyles.css'
import './PostsStyles.css'

// Platform SVG Icons
const FacebookSvg = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const InstagramSvg = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
)

const LinkedinSvg = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const XSvg = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const PinterestSvg = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
  </svg>
)

const ThreadsSvg = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.33-3.022.88-.733 2.088-1.146 3.496-1.198 1.02-.038 1.955.086 2.787.369-.075-.81-.293-1.423-.657-1.845-.454-.524-1.148-.79-2.065-.79l-.089.001c-.711.02-1.294.212-1.732.572-.38.312-.621.752-.712 1.072l-1.965-.529c.169-.626.547-1.353 1.163-1.86.856-.704 1.96-1.076 3.193-1.076h.151c1.4.024 2.527.516 3.354 1.465.707.81 1.122 1.897 1.244 3.238.576.275 1.09.616 1.533 1.02.963.878 1.58 2.037 1.836 3.445.343 1.882-.052 3.945-1.175 5.551C19.396 22.274 16.782 24 12.186 24z"/>
  </svg>
)

const platforms = [
  { id: 'facebook', name: 'Facebook', icon: FacebookSvg, color: '#1877F2' },
  { id: 'instagram', name: 'Instagram', icon: InstagramSvg, color: '#E1306C' },
  { id: 'linkedin', name: 'LinkedIn', icon: LinkedinSvg, color: '#0A66C2' },
  { id: 'x', name: 'X', icon: XSvg, color: '#000' },
  { id: 'pinterest', name: 'Pinterest', icon: PinterestSvg, color: '#E60023' },
  { id: 'threads', name: 'Threads', icon: ThreadsSvg, color: '#000' },
]

// Labels change per platform
const subtitleLabels = {
  facebook: 'SUBTITLE',
  instagram: 'HANDLE',
  linkedin: 'JOB TITLE',
  x: 'HANDLE',
  pinterest: 'BIO',
  threads: 'HANDLE',
}
const subtitlePlaceholders = {
  facebook: 'Friend · Location',
  instagram: '@handle',
  linkedin: 'Job title, company, and connection degree',
  x: '@handle',
  pinterest: 'Bio or description',
  threads: '@handle',
}
const metricsLabels = {
  facebook: { reactions: 'REACTIONS', comments: 'COMMENTS', reposts: 'SHARES' },
  instagram: { reactions: 'LIKES', comments: 'COMMENTS', reposts: null },
  linkedin: { reactions: 'REACTIONS', comments: 'COMMENTS', reposts: 'REPOSTS' },
  x: { reactions: 'LIKES', comments: 'REPLIES', reposts: 'REPOSTS' },
  pinterest: { reactions: null, comments: 'COMMENTS', reposts: null },
  threads: { reactions: 'LIKES', comments: 'REPLIES', reposts: 'REPOSTS' },
}

export default function PostsEditor({
  platform, setPlatform,
  author, setAuthor,
  content, setContent,
  metrics, setMetrics,
  appearance, setAppearance,
}) {
  const [openSection, setOpenSection] = useState({
    app: true, author: true, content: true, metrics: true, appearance: true,
  })
  const avatarRef = useRef(null)
  const imageRef = useRef(null)

  const toggleSection = (section) => {
    setOpenSection(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setAuthor(prev => ({ ...prev, avatar: ev.target.result }))
    reader.readAsDataURL(file)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 10 * 1024 * 1024) {
      alert('File too large. Max 10MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => setContent(prev => ({ ...prev, image: ev.target.result }))
    reader.readAsDataURL(file)
  }

  const ml = metricsLabels[platform] || metricsLabels.linkedin

  return (
    <aside className="editor">
      <div className="editor-scroll">

        {/* App Section */}
        <div className="section">
          <div className="section-header" onClick={() => toggleSection('app')}>
            <div className="section-header-left">
              <Smartphone size={16} />
              <span>App</span>
              <span className="section-selected">{platforms.find(p => p.id === platform)?.name}</span>
            </div>
            <ChevronDown size={16} className={`section-toggle ${openSection.app ? 'open' : ''}`} />
          </div>
          {openSection.app && (
            <div className="section-content">
              <div className="platform-grid">
                {platforms.map(p => (
                  <button
                    key={p.id}
                    className={`platform-btn ${p.id === platform ? 'active' : ''}`}
                    onClick={() => setPlatform(p.id)}
                  >
                    <span className="platform-icon">{p.icon}</span>
                    <span className="platform-name">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Author Section */}
        <div className="section">
          <div className="section-header" onClick={() => toggleSection('author')}>
            <div className="section-header-left">
              <User size={16} />
              <span>Author</span>
            </div>
            <ChevronDown size={16} className={`section-toggle ${openSection.author ? 'open' : ''}`} />
          </div>
          {openSection.author && (
            <div className="section-content">
              <div className="form-sublabel">PROFILE</div>
              <div className="person-card no-drag">
                <div className="person-avatar" onClick={() => avatarRef.current?.click()}>
                  {author.avatar ? (
                    <img src={author.avatar} alt={author.name} />
                  ) : (
                    <User size={16} />
                  )}
                  <div className="avatar-overlay"><Camera size={10} /></div>
                  <input ref={avatarRef} type="file" accept="image/*" hidden onChange={handleAvatarUpload} />
                </div>
                <input
                  className="input person-name"
                  value={author.name}
                  onChange={(e) => setAuthor(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Name"
                />
              </div>

              <div className="form-sublabel">{subtitleLabels[platform] || 'JOB TITLE'}</div>
              <input
                className="input"
                value={author.subtitle}
                onChange={(e) => setAuthor(prev => ({ ...prev, subtitle: e.target.value }))}
                placeholder={subtitlePlaceholders[platform] || 'Title or handle'}
              />

              {['instagram', 'x', 'facebook', 'threads', 'youtube'].includes(platform) && (
                <>
                  <div className="form-sublabel">VERIFIED BADGE</div>
                  <div className="form-row">
                    <span className="form-label">Verified</span>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={author.verified}
                        onChange={(e) => setAuthor(prev => ({ ...prev, verified: e.target.checked }))}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Post Content Section */}
        <div className="section">
          <div className="section-header" onClick={() => toggleSection('content')}>
            <div className="section-header-left">
              <Type size={16} />
              <span>Post Content</span>
            </div>
            <ChevronDown size={16} className={`section-toggle ${openSection.content ? 'open' : ''}`} />
          </div>
          {openSection.content && (
            <div className="section-content">
              <div className="form-sublabel">CAPTION</div>
              <textarea
                className="input"
                style={{ minHeight: '120px', resize: 'vertical', lineHeight: '1.5' }}
                value={content.caption}
                onChange={(e) => setContent(prev => ({ ...prev, caption: e.target.value }))}
                placeholder="Write your post caption..."
              />

              <div className="form-sublabel" style={{ marginTop: '16px' }}>POSTED</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select
                  className="select input"
                  style={{ flex: 1 }}
                  value={content.postedAt?.type || 'hours'}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    postedAt: { type: e.target.value, value: prev.postedAt?.value || 1, customText: prev.postedAt?.customText || '' }
                  }))}
                >
                  <option value="now">Just now</option>
                  <option value="minutes">Minutes ago</option>
                  <option value="hours">Hours ago</option>
                  <option value="days">Days ago</option>
                  <option value="weeks">Weeks ago</option>
                  <option value="months">Months ago</option>
                  <option value="custom">Custom text</option>
                </select>

                {content.postedAt?.type === 'custom' ? (
                  <input
                    type="text"
                    className="input"
                    style={{ flex: 1 }}
                    value={content.postedAt?.customText || ''}
                    placeholder="e.g. about 2 months ago"
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      postedAt: { ...prev.postedAt, customText: e.target.value }
                    }))}
                  />
                ) : content.postedAt?.type !== 'now' && (
                  <input
                    type="number"
                    className="input"
                    style={{ width: '80px' }}
                    min="1"
                    max={content.postedAt?.type === 'minutes' ? 59 : content.postedAt?.type === 'hours' ? 23 : 99}
                    value={content.postedAt?.value || 1}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      postedAt: { ...prev.postedAt, value: Math.max(1, parseInt(e.target.value) || 1) }
                    }))}
                  />
                )}
              </div>

              <div className="form-sublabel" style={{ marginTop: '16px' }}>POST IMAGE</div>
              {content.image ? (
                <div>
                  <div className="story-image-preview">
                    <img src={content.image} alt="Post" />
                  </div>
                  <div className="story-image-actions">
                    <button onClick={() => imageRef.current?.click()}>
                      <ImagePlus size={14} /> Replace
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => setContent(prev => ({ ...prev, image: null }))}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                  <input ref={imageRef} type="file" accept="image/*,.webp,.gif" hidden onChange={handleImageUpload} />
                </div>
              ) : (
                <div className="story-image-upload" onClick={() => imageRef.current?.click()}>
                  <ImagePlus size={24} />
                  <span className="upload-label">Click to upload an image</span>
                  <input ref={imageRef} type="file" accept="image/*,.webp,.gif" hidden onChange={handleImageUpload} />
                </div>
              )}
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px', marginBottom: '16px' }}>
                Supports JPEG, PNG, WebP, and GIF. Max size: 10MB.
              </div>
            </div>
          )}
        </div>

        {/* Metrics Section */}
        <div className="section">
          <div className="section-header" onClick={() => toggleSection('metrics')}>
            <div className="section-header-left">
              <BarChart3 size={16} />
              <span>Metrics</span>
            </div>
            <ChevronDown size={16} className={`section-toggle ${openSection.metrics ? 'open' : ''}`} />
          </div>
          {openSection.metrics && (
            <div className="section-content">
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                Set the engagement numbers shown on your post.
              </div>
              <div className="metrics-grid">
                {ml.reactions && (
                  <div className="metric-item">
                    <span className="metric-label">{ml.reactions}</span>
                    <input
                      type="text"
                      className="input"
                      value={metrics.reactions}
                      onChange={(e) => setMetrics(prev => ({ ...prev, reactions: e.target.value }))}
                    />
                  </div>
                )}
                {ml.comments && (
                  <div className="metric-item">
                    <span className="metric-label">{ml.comments}</span>
                    <input
                      type="text"
                      className="input"
                      value={metrics.comments}
                      onChange={(e) => setMetrics(prev => ({ ...prev, comments: e.target.value }))}
                    />
                  </div>
                )}
                {ml.reposts && (
                  <div className={`metric-item ${!ml.reactions ? 'full-width' : ''}`}>
                    <span className="metric-label">{ml.reposts}</span>
                    <input
                      type="text"
                      className="input"
                      value={metrics.reposts}
                      onChange={(e) => setMetrics(prev => ({ ...prev, reposts: e.target.value }))}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Appearance Section */}
        <div className="section">
          <div className="section-header" onClick={() => toggleSection('appearance')}>
            <div className="section-header-left">
              <Settings2 size={16} />
              <span>Appearance</span>
            </div>
            <ChevronDown size={16} className={`section-toggle ${openSection.appearance ? 'open' : ''}`} />
          </div>
          {openSection.appearance && (
            <div className="section-content">
              <div className="form-sublabel">THEME</div>
              <div className="form-row">
                <span className="form-label">Dark mode</span>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={appearance.darkMode}
                    onChange={(e) => setAppearance(prev => ({ ...prev, darkMode: e.target.checked }))}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          )}
        </div>

      </div>
    </aside>
  )
}
