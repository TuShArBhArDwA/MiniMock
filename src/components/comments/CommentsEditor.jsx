import { useState, useRef } from 'react'
import { Smartphone, Users, ChevronDown, Settings2, Camera, Plus, X, MessageSquare, User, ArrowRightLeft } from 'lucide-react'
import '../Editor.css'
import '../PeopleSection.css'
import '../AppearanceSection.css'
import './CommentsStyles.css'

// Platform SVGs
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
const RedditSvg = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 000-.462.342.342 0 00-.461 0c-.545.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.345.345 0 00-.206-.095z"/>
  </svg>
)
const ThreadsSvg = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.33-3.022.88-.733 2.088-1.146 3.496-1.198 1.02-.038 1.955.086 2.787.369-.075-.81-.293-1.423-.657-1.845-.454-.524-1.148-.79-2.065-.79l-.089.001c-.711.02-1.294.212-1.732.572-.38.312-.621.752-.712 1.072l-1.965-.529c.169-.626.547-1.353 1.163-1.86.856-.704 1.96-1.076 3.193-1.076h.151c1.4.024 2.527.516 3.354 1.465.707.81 1.122 1.897 1.244 3.238.576.275 1.09.616 1.533 1.02.963.878 1.58 2.037 1.836 3.445.343 1.882-.052 3.945-1.175 5.551C19.396 22.274 16.782 24 12.186 24z"/>
  </svg>
)
const XSvg = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
const YoutubeSvg = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const platforms = [
  { id: 'facebook', name: 'Facebook', icon: FacebookSvg, color: '#1877F2' },
  { id: 'instagram', name: 'Instagram', icon: InstagramSvg, color: '#E1306C' },
  { id: 'linkedin', name: 'LinkedIn', icon: LinkedinSvg, color: '#0A66C2' },
  { id: 'reddit', name: 'Reddit', icon: RedditSvg, color: '#FF4500' },
  { id: 'threads', name: 'Threads', icon: ThreadsSvg, color: '#000' },
  { id: 'x', name: 'X', icon: XSvg, color: '#000' },
  { id: 'youtube', name: 'YouTube', icon: YoutubeSvg, color: '#FF0000' },
]

const avatarColors = ['#0a66c2', '#e1306c', '#6dae4f', '#e8a600', '#df704d', '#8b5cf6', '#ef4444', '#06b6d4']

export default function CommentsEditor({
  platform, setPlatform,
  creator, setCreator,
  commenters, setCommenters,
  comments, setComments,
  appearance, setAppearance,
}) {
  const [openSection, setOpenSection] = useState({
    app: true, people: true, comments: true, appearance: true,
  })
  const creatorAvatarRef = useRef(null)
  const commenterAvatarRefs = useRef({})

  // All people = creator + commenters
  const allPeople = [creator, ...commenters]

  const toggleSection = (section) => {
    setOpenSection(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleCreatorAvatar = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setCreator(prev => ({ ...prev, avatar: ev.target.result }))
    reader.readAsDataURL(file)
  }

  const handleCommenterAvatar = (index, e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setCommenters(prev => prev.map((c, i) => i === index ? { ...c, avatar: ev.target.result } : c))
    }
    reader.readAsDataURL(file)
  }

  const addCommenter = () => {
    const id = `c${Date.now()}`
    setCommenters(prev => [...prev, { id, name: 'New User', handle: 'newuser', avatar: null }])
    setComments(prev => [...prev, {
      id: `cm${Date.now()}`,
      personId: id,
      text: 'Great post!',
      likes: '12',
      time: '1mo',
      replies: [],
    }])
  }

  const removeCommenter = (index) => {
    const removedId = commenters[index].id
    setCommenters(prev => prev.filter((_, i) => i !== index))
    setComments(prev => prev.filter(c => c.personId !== removedId).map(c => ({
      ...c,
      replies: c.replies.filter(r => r.personId !== removedId),
    })))
  }

  const updateComment = (index, field, value) => {
    setComments(prev => prev.map((c, i) => i === index ? { ...c, [field]: value } : c))
  }

  const swapCommentPerson = (commentIndex) => {
    setComments(prev => prev.map((c, i) => {
      if (i !== commentIndex) return c
      const currentIdx = allPeople.findIndex(p => p.id === c.personId)
      const nextIdx = (currentIdx + 1) % allPeople.length
      return { ...c, personId: allPeople[nextIdx].id }
    }))
  }

  const addReply = (commentIndex) => {
    setComments(prev => prev.map((c, i) => {
      if (i !== commentIndex) return c
      return {
        ...c,
        replies: [...c.replies, {
          id: `r${Date.now()}`,
          personId: creator.id,
          text: 'Thank you! Glad it helped!',
          likes: '12',
          time: '1mo',
        }],
      }
    }))
  }

  const updateReply = (commentIndex, replyIndex, field, value) => {
    setComments(prev => prev.map((c, ci) => {
      if (ci !== commentIndex) return c
      return {
        ...c,
        replies: c.replies.map((r, ri) => ri === replyIndex ? { ...r, [field]: value } : r),
      }
    }))
  }

  const removeReply = (commentIndex, replyIndex) => {
    setComments(prev => prev.map((c, ci) => {
      if (ci !== commentIndex) return c
      return { ...c, replies: c.replies.filter((_, ri) => ri !== replyIndex) }
    }))
  }

  const swapReplyPerson = (commentIndex, replyIndex) => {
    setComments(prev => prev.map((c, ci) => {
      if (ci !== commentIndex) return c
      return {
        ...c,
        replies: c.replies.map((r, ri) => {
          if (ri !== replyIndex) return r
          const currentIdx = allPeople.findIndex(p => p.id === r.personId)
          const nextIdx = (currentIdx + 1) % allPeople.length
          return { ...r, personId: allPeople[nextIdx].id }
        }),
      }
    }))
  }

  const getPersonName = (personId) => {
    const person = allPeople.find(p => p.id === personId)
    return person?.name || 'Unknown'
  }

  const getPersonColor = (personId) => {
    if (personId === creator.id) return '#65676b'
    const idx = commenters.findIndex(c => c.id === personId)
    return avatarColors[idx % avatarColors.length]
  }

  const getPersonInitial = (personId) => {
    const person = allPeople.find(p => p.id === personId)
    return person?.name?.[0]?.toUpperCase() || '?'
  }

  const getPersonAvatar = (personId) => {
    const person = allPeople.find(p => p.id === personId)
    return person?.avatar || null
  }

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

        {/* People Section */}
        <div className="section">
          <div className="section-header" onClick={() => toggleSection('people')}>
            <div className="section-header-left">
              <Users size={16} />
              <span>People</span>
              <span className="section-selected">{allPeople.length}</span>
            </div>
            <ChevronDown size={16} className={`section-toggle ${openSection.people ? 'open' : ''}`} />
          </div>
          {openSection.people && (
            <div className="section-content">
              <div className="form-sublabel">CREATOR</div>
              <div className="person-card no-drag">
                <div className="person-avatar" onClick={() => creatorAvatarRef.current?.click()}>
                  {creator.avatar ? (
                    <img src={creator.avatar} alt={creator.name} />
                  ) : (
                    <User size={16} />
                  )}
                  <div className="avatar-overlay"><Camera size={10} /></div>
                  <input ref={creatorAvatarRef} type="file" accept="image/*" hidden onChange={handleCreatorAvatar} />
                </div>
                <input
                  className="input person-name"
                  value={creator.name}
                  onChange={(e) => setCreator(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Creator name"
                />
                <input
                  className="input"
                  style={{ width: '100px', fontSize: '12px' }}
                  value={creator.handle}
                  onChange={(e) => setCreator(prev => ({ ...prev, handle: e.target.value }))}
                  placeholder="handle"
                />
              </div>

              <div className="form-sublabel" style={{ marginTop: '12px' }}>
                COMMENTERS
                <span style={{ float: 'right', color: 'var(--text-muted)' }}>{commenters.length}</span>
              </div>
              {commenters.map((c, i) => (
                <div key={c.id} className="person-card no-drag" style={{ marginBottom: '6px' }}>
                  <div
                    className="person-avatar"
                    style={{ background: avatarColors[i % avatarColors.length], color: '#fff', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    onClick={() => commenterAvatarRefs.current[c.id]?.click()}
                  >
                    {c.avatar ? <img src={c.avatar} alt={c.name} /> : c.name[0]?.toUpperCase()}
                    <div className="avatar-overlay"><Camera size={10} /></div>
                    <input
                      ref={el => commenterAvatarRefs.current[c.id] = el}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => handleCommenterAvatar(i, e)}
                    />
                  </div>
                  <input
                    className="input person-name"
                    value={c.name}
                    onChange={(e) => setCommenters(prev => prev.map((p, j) => j === i ? { ...p, name: e.target.value } : p))}
                    placeholder="Name"
                  />
                  <input
                    className="input"
                    style={{ width: '90px', fontSize: '12px' }}
                    value={c.handle}
                    onChange={(e) => setCommenters(prev => prev.map((p, j) => j === i ? { ...p, handle: e.target.value } : p))}
                    placeholder="handle"
                  />
                  {commenters.length > 1 && (
                    <button
                      className="btn-icon"
                      style={{ color: 'var(--text-muted)', padding: '2px' }}
                      onClick={() => removeCommenter(i)}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
              <button className="btn-add" onClick={addCommenter}>
                <Plus size={14} /> Add commenter
              </button>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="section">
          <div className="section-header" onClick={() => toggleSection('comments')}>
            <div className="section-header-left">
              <MessageSquare size={16} />
              <span>Comments</span>
              <span className="section-selected">{comments.length}</span>
            </div>
            <ChevronDown size={16} className={`section-toggle ${openSection.comments ? 'open' : ''}`} />
          </div>
          {openSection.comments && (
            <div className="section-content">
              {comments.map((comment, ci) => (
                <div key={comment.id} className="comment-editor-card">
                  {/* Comment header: avatar swap + name + likes */}
                  <div className="comment-editor-header">
                    <div
                      className="comment-swap-avatar"
                      style={{ background: getPersonColor(comment.personId) }}
                      onClick={() => swapCommentPerson(ci)}
                      title="Click to swap author"
                    >
                      {getPersonAvatar(comment.personId) ? (
                        <img src={getPersonAvatar(comment.personId)} alt="" />
                      ) : (
                        getPersonInitial(comment.personId)
                      )}
                      <div className="comment-swap-icon">
                        <ArrowRightLeft size={8} strokeWidth={3} />
                      </div>
                    </div>
                    <select
                      className="select comment-person-select"
                      value={comment.personId}
                      onChange={(e) => updateComment(ci, 'personId', e.target.value)}
                    >
                      {allPeople.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                    <input
                      className="input comment-editor-likes"
                      value={comment.likes}
                      onChange={(e) => updateComment(ci, 'likes', e.target.value)}
                      placeholder="0"
                    />
                    <span className="comment-editor-likes-label">likes</span>
                  </div>
                  <textarea
                    className="input"
                    value={comment.text}
                    onChange={(e) => updateComment(ci, 'text', e.target.value)}
                    placeholder="Comment text..."
                  />
                  <div className="comment-editor-time-row">
                    <span className="comment-editor-time-label">Time:</span>
                    <input
                      className="input"
                      style={{ width: 40, textAlign: 'center', fontSize: '11px', padding: '3px 4px' }}
                      value={comment.time?.replace(/[^0-9]/g, '') || '1'}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '') || '1'
                        const unit = comment.time?.replace(/[0-9]/g, '') || 'mo'
                        updateComment(ci, 'time', val + unit)
                      }}
                    />
                    <select
                      className="select"
                      style={{ fontSize: '11px', padding: '3px 6px', width: 'auto' }}
                      value={comment.time?.replace(/[0-9]/g, '') || 'mo'}
                      onChange={(e) => {
                        const val = comment.time?.replace(/[^0-9]/g, '') || '1'
                        updateComment(ci, 'time', val + e.target.value)
                      }}
                    >
                      <option value="s">seconds</option>
                      <option value="m">minutes</option>
                      <option value="h">hours</option>
                      <option value="d">days</option>
                      <option value="w">weeks</option>
                      <option value="mo">months</option>
                      <option value="y">years</option>
                    </select>
                  </div>

                  {/* Replies */}
                  <div className="comment-editor-reply">
                    {comment.replies.map((reply, ri) => (
                      <div key={reply.id} className="comment-editor-card" style={{ margin: '0 0 6px 0' }}>
                        <div className="comment-editor-header">
                          <div
                            className="comment-swap-avatar"
                            style={{ background: getPersonColor(reply.personId), width: 22, height: 22, fontSize: 9 }}
                            onClick={() => swapReplyPerson(ci, ri)}
                            title="Click to swap reply author"
                          >
                            {getPersonAvatar(reply.personId) ? (
                              <img src={getPersonAvatar(reply.personId)} alt="" />
                            ) : (
                              getPersonInitial(reply.personId)
                            )}
                            <div className="comment-swap-icon">
                              <ArrowRightLeft size={7} strokeWidth={3} />
                            </div>
                          </div>
                          <select
                            className="select comment-person-select comment-person-select-sm"
                            value={reply.personId}
                            onChange={(e) => updateReply(ci, ri, 'personId', e.target.value)}
                          >
                            {allPeople.map(p => (
                              <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                          </select>
                          <input
                            className="input comment-editor-likes"
                            style={{ width: 45 }}
                            value={reply.likes}
                            onChange={(e) => updateReply(ci, ri, 'likes', e.target.value)}
                            placeholder="0"
                          />
                          <button
                            className="btn-icon"
                            style={{ color: 'var(--text-muted)', padding: '2px' }}
                            onClick={() => removeReply(ci, ri)}
                          >
                            <X size={12} />
                          </button>
                        </div>
                        <input
                          className="input"
                          style={{ fontSize: '12px' }}
                          value={reply.text}
                          onChange={(e) => updateReply(ci, ri, 'text', e.target.value)}
                          placeholder="Reply text..."
                        />
                        <div className="comment-editor-time-row">
                          <span className="comment-editor-time-label">Time:</span>
                          <input
                            className="input"
                            style={{ width: 35, textAlign: 'center', fontSize: '11px', padding: '3px 4px' }}
                            value={reply.time?.replace(/[^0-9]/g, '') || '1'}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, '') || '1'
                              const unit = reply.time?.replace(/[0-9]/g, '') || 'mo'
                              updateReply(ci, ri, 'time', val + unit)
                            }}
                          />
                          <select
                            className="select"
                            style={{ fontSize: '11px', padding: '3px 4px', width: 'auto' }}
                            value={reply.time?.replace(/[0-9]/g, '') || 'mo'}
                            onChange={(e) => {
                              const val = reply.time?.replace(/[^0-9]/g, '') || '1'
                              updateReply(ci, ri, 'time', val + e.target.value)
                            }}
                          >
                            <option value="s">sec</option>
                            <option value="m">min</option>
                            <option value="h">hr</option>
                            <option value="d">day</option>
                            <option value="w">wk</option>
                            <option value="mo">mo</option>
                            <option value="y">yr</option>
                          </select>
                        </div>
                      </div>
                    ))}
                    <button
                      className="btn-add"
                      style={{ fontSize: '11px', padding: '5px 8px' }}
                      onClick={() => addReply(ci)}
                    >
                      <Plus size={12} /> Add reply
                    </button>
                  </div>
                </div>
              ))}
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
