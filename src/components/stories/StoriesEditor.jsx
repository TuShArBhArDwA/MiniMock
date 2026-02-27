import { useState, useRef } from 'react'
import { Smartphone, Clock, Battery, LayoutTemplate, User, ChevronDown, Plus, X, Trash2, Settings2, Camera, ImagePlus, Calendar, Layers, BadgeCheck, Music, Type } from 'lucide-react'
import '../Editor.css'
import '../PeopleSection.css'
import '../AppearanceSection.css'
import './StoriesStyles.css'

// Instagram SVG icon
const InstagramSvg = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
)

// WhatsApp SVG icon
const WhatsappSvg = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
)

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: InstagramSvg, color: '#E1306C' },
  { id: 'whatsapp', name: 'WhatsApp', icon: WhatsappSvg, color: '#25D366' },
]

export default function StoriesEditor({
  platform, setPlatform,
  profile, setProfile,
  slides, setSlides,
  activeSlide, setActiveSlide,
  appearance, setAppearance,
}) {
  const [openSection, setOpenSection] = useState({
    app: true, profile: true, content: true, appearance: true,
  })
  const fileRef = useRef(null)
  const avatarRef = useRef(null)

  const toggleSection = (section) => {
    setOpenSection(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setProfile(prev => ({ ...prev, avatar: ev.target.result }))
    reader.readAsDataURL(file)
  }

  const handleSlideImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 10 * 1024 * 1024) {
      alert('File too large. Max 10MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      setSlides(prev => prev.map((s, i) =>
        i === activeSlide ? { ...s, image: ev.target.result } : s
      ))
    }
    reader.readAsDataURL(file)
  }

  const addSlide = () => {
    setSlides(prev => [...prev, { id: `s${Date.now()}`, image: null }])
    setActiveSlide(slides.length)
  }

  const removeSlide = (index) => {
    if (slides.length <= 1) return
    setSlides(prev => prev.filter((_, i) => i !== index))
    if (activeSlide >= slides.length - 1) {
      setActiveSlide(Math.max(0, slides.length - 2))
    }
  }

  const currentSlide = slides[activeSlide] || slides[0]

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

        {/* Profile Section */}
        <div className="section">
          <div className="section-header" onClick={() => toggleSection('profile')}>
            <div className="section-header-left">
              <User size={16} />
              <span>Profile</span>
            </div>
            <ChevronDown size={16} className={`section-toggle ${openSection.profile ? 'open' : ''}`} />
          </div>
          {openSection.profile && (
            <div className="section-content">
              <div className="form-sublabel">PROFILE</div>
              <div className="person-card no-drag">
                <div className="person-avatar" onClick={() => avatarRef.current?.click()}>
                  {profile.avatar ? (
                    <img src={profile.avatar} alt={profile.username} />
                  ) : (
                    <User size={16} />
                  )}
                  <div className="avatar-overlay"><Camera size={10} /></div>
                  <input ref={avatarRef} type="file" accept="image/*" hidden onChange={handleAvatarUpload} />
                </div>
                <input
                  className="input person-name"
                  value={profile.username}
                  onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="username"
                />
              </div>
              {platform === 'instagram' && (
                <>
                  <div className="form-sublabel">VERIFIED BADGE</div>
                  <div className="form-row">
                    <span className="form-label">Verified</span>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={profile.verified}
                        onChange={(e) => setProfile(prev => ({ ...prev, verified: e.target.checked }))}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Story Content Section */}
        <div className="section">
          <div className="section-header" onClick={() => toggleSection('content')}>
            <div className="section-header-left">
              <Layers size={16} />
              <span>Story Content</span>
              <span className="section-badge">{slides.length}</span>
            </div>
            <ChevronDown size={16} className={`section-toggle ${openSection.content ? 'open' : ''}`} />
          </div>
          {openSection.content && (
            <div className="section-content">
              <div className="form-sublabel">SLIDES</div>
              <div className="story-slides-strip">
                {slides.map((slide, i) => (
                  <div
                    key={slide.id}
                    className={`story-slide-thumb ${i === activeSlide ? 'active' : ''}`}
                    onClick={() => setActiveSlide(i)}
                  >
                    {slide.image ? (
                      <img src={slide.image} alt={`Slide ${i + 1}`} />
                    ) : (
                      <span className="slide-number">{i + 1}</span>
                    )}
                    {slides.length > 1 && (
                      <button
                        className="slide-remove"
                        onClick={(e) => { e.stopPropagation(); removeSlide(i) }}
                      >×</button>
                    )}
                  </div>
                ))}
                <button className="story-add-slide" onClick={addSlide}>
                  <Plus size={18} />
                </button>
              </div>

              <div className="form-sublabel">SLIDE {activeSlide + 1} IMAGE</div>
              {currentSlide?.image ? (
                <div>
                  <div className="story-image-preview">
                    <img src={currentSlide.image} alt="Slide" />
                  </div>
                  <div className="story-image-actions">
                    <button onClick={() => fileRef.current?.click()}>
                      <ImagePlus size={14} /> Replace
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => {
                        setSlides(prev => prev.map((s, i) =>
                          i === activeSlide ? { ...s, image: null } : s
                        ))
                      }}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*,.webp" hidden onChange={handleSlideImage} />
                </div>
              ) : (
                <div
                  className="story-image-upload"
                  onClick={() => fileRef.current?.click()}
                >
                  <ImagePlus size={24} />
                  <span className="upload-label">Click to upload</span>
                  <input ref={fileRef} type="file" accept="image/*,.webp" hidden onChange={handleSlideImage} />
                </div>
              )}
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px', marginBottom: '16px' }}>
                9:16 aspect ratio recommended. Supports JPEG, PNG, WebP. Max: 10MB.
              </div>

              {platform === 'instagram' && (
                <div style={{ marginBottom: '16px' }}>
                  <div className="form-sublabel">ADD MUSIC (OPTIONAL)</div>
                  <div className="addon-card">
                    <div className="addon-icon"><Music size={16} /></div>
                    <input
                      type="text"
                      className="addon-input"
                      placeholder="Song Title - Artist"
                      value={currentSlide?.music || ''}
                      onChange={(e) => {
                        setSlides(prev => prev.map((s, i) =>
                          i === activeSlide ? { ...s, music: e.target.value } : s
                        ))
                      }}
                    />
                  </div>
                </div>
              )}

              {platform === 'whatsapp' && (
                <div style={{ marginBottom: '16px' }}>
                  <div className="form-sublabel">ADD CAPTION (OPTIONAL)</div>
                  <div className="addon-card">
                    <div className="addon-icon"><Type size={16} /></div>
                    <input
                      type="text"
                      className="addon-input"
                      placeholder="Write a caption..."
                      value={currentSlide?.caption || ''}
                      onChange={(e) => {
                        setSlides(prev => prev.map((s, i) =>
                          i === activeSlide ? { ...s, caption: e.target.value } : s
                        ))
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="form-sublabel">POSTED</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select
                  className="select input"
                  style={{ flex: 1 }}
                  value={profile.postedAt?.type || 'hours'}
                  onChange={(e) => setProfile(prev => ({ 
                    ...prev, 
                    postedAt: { type: e.target.value, value: profile.postedAt?.value || 1 } 
                  }))}
                >
                  <option value="now">Just now</option>
                  <option value="minutes">Minutes ago</option>
                  <option value="hours">Hours ago</option>
                  <option value="custom">Custom text</option>
                </select>
                
                {profile.postedAt?.type === 'custom' ? (
                  <input
                    type="text"
                    className="input"
                    style={{ flex: 1 }}
                    value={profile.postedAt?.customText || ''}
                    placeholder="e.g. Today, 03:40"
                    onChange={(e) => setProfile(prev => ({ 
                      ...prev, 
                      postedAt: { ...prev.postedAt, customText: e.target.value } 
                    }))}
                  />
                ) : profile.postedAt?.type !== 'now' && (
                  <input
                    type="number"
                    className="input"
                    style={{ width: '80px' }}
                    min="1"
                    max={profile.postedAt?.type === 'hours' ? 24 : 59}
                    value={profile.postedAt?.value || 1}
                    onChange={(e) => setProfile(prev => ({ 
                      ...prev, 
                      postedAt: { ...prev.postedAt, value: Math.max(1, parseInt(e.target.value) || 1) } 
                    }))}
                  />
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
              <div className="form-sublabel">DEVICE</div>
              <div className="form-row">
                <span className="form-label">Phone frame</span>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={appearance.phoneFrame}
                    onChange={(e) => setAppearance(prev => ({ ...prev, phoneFrame: e.target.checked }))}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="form-row" style={{ marginTop: '12px' }}>
                <span className="form-label">Status bar</span>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={appearance.statusBar}
                    onChange={(e) => setAppearance(prev => ({ ...prev, statusBar: e.target.checked }))}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              {appearance.statusBar && (
                <div className="statusbar-settings">
                  <div className="form-sublabel">STATUS BAR</div>
                  <div className="form-row">
                    <span className="form-label">
                      <Clock size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                      Time
                    </span>
                    <input
                      type="text"
                      className="input input-small"
                      value={appearance.statusBarTime}
                      onChange={(e) => setAppearance(prev => ({ ...prev, statusBarTime: e.target.value }))}
                    />
                  </div>
                  <div className="form-row" style={{ marginTop: '12px' }}>
                    <span className="form-label">
                      <Battery size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                      Battery
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="input input-small"
                        value={appearance.battery}
                        onChange={(e) => setAppearance(prev => ({ ...prev, battery: parseInt(e.target.value) || 100 }))}
                      />
                      <span className="form-label">%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </aside>
  )
}
