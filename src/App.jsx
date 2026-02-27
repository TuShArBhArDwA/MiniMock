import { useState, useRef, useCallback, useEffect } from 'react'
import { toPng } from 'html-to-image'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Editor from './components/Editor'
import ChatPreview from './components/ChatPreview'
import AIEditor from './components/ai/AIEditor'
import AIPreview from './components/ai/AIPreview'
import StoriesEditor from './components/stories/StoriesEditor'
import StoriesPreview from './components/stories/StoriesPreview'
import PostsEditor from './components/posts/PostsEditor'
import PostsPreview from './components/posts/PostsPreview'
import CommentsEditor from './components/comments/CommentsEditor'
import CommentsPreview from './components/comments/CommentsPreview'
import EmailEditor from './components/email/EmailEditor'
import EmailPreview from './components/email/EmailPreview'
import DownloadModal from './components/DownloadModal'
import platformThemes from './themes/platformThemes'
import aiThemes from './themes/aiThemes.jsx'
import './components/ai/AIStyles.css'

const defaultPeople = [
  { id: '1', name: 'You', avatar: null, role: 'sender', verified: false },
  { id: '2', name: 'Friend', avatar: null, role: 'receiver', verified: false },
]

const defaultAIMessages = [
  {
    id: 'ai1',
    role: 'user',
    text: 'What can you help me with today?',
    time: '15:11',
    date: '01/01/2026',
  },
  {
    id: 'ai2',
    role: 'assistant',
    text: `I can help you with a wide variety of tasks! Here are some things I'm good at:\n\n- **Writing & Editing:** Essays, emails, creative writing, proofreading\n- **Coding:** Debugging, explaining code, writing scripts\n- **Research:** Summarizing topics, answering questions\n- **Math & Logic:** Solving problems, explaining concepts\n- **Brainstorming:** Ideas for projects, names, strategies\n\nWhat would you like to work on?`,
    time: '15:11',
    date: '01/01/2026',
  },
  {
    id: 'ai3',
    role: 'user',
    text: 'Can you help me write a short poem about coffee?',
    time: '15:11',
    date: '01/01/2026',
  }
]

const defaultMessages = [
  {
    id: 'm1',
    senderId: '1',
    text: 'Hey, want to try building a chat app mockup?',
    date: '2026-01-01',
    time: '15:11',
    status: 'read',
    image: null,
  },
  {
    id: 'm2',
    senderId: '2',
    text: 'A chat app mockup? You mean like pretending to send messages?',
    date: '2026-01-01',
    time: '15:11',
    status: 'read',
    image: null,
  },
  {
    id: 'm3',
    senderId: '1',
    text: 'Exactly! We can design fake conversations, test layouts, and have some fun.',
    date: '2026-01-01',
    time: '15:11',
    status: 'read',
    image: null,
  },
  {
    id: 'm4',
    senderId: '2',
    text: 'Can we add funny names and profile pics too?',
    date: '2026-01-01',
    time: '15:11',
    status: 'read',
    image: null,
  },
  {
    id: 'm5',
    senderId: '1',
    text: "Of course! And try out different chat platforms — like making it look like Discord or iMessage.",
    date: '2026-01-01',
    time: '15:11',
    status: 'read',
    image: null,
  },
  {
    id: 'm6',
    senderId: '2',
    text: "This is amazing. Let's mock a group chat next.",
    date: '2026-01-01',
    time: '15:11',
    status: 'delivered',
    image: null,
  },
  {
    id: 'm7',
    senderId: '1',
    text: 'Agreed! Mocking chat apps might be my new favorite hobby.',
    date: '2026-01-01',
    time: '15:11',
    status: 'read',
    image: null,
  },
]

function App() {
  const [activeTab, setActiveTab] = useState('chat')
  // Standard Chat State
  const [platform, setPlatform] = useState('whatsapp')
  const [chatType, setChatType] = useState('dm')
  const [appTheme, setAppTheme] = useState('dark') // 'light' or 'dark'
  const [groupData, setGroupData] = useState({ name: 'Group Chat', avatar: null })
  const [people, setPeople] = useState(defaultPeople)
  const [messages, setMessages] = useState(defaultMessages)
  const [appearance, setAppearance] = useState({
    darkMode: false,
    transparentBg: false,
    timeFormat: '24',
    showHeader: true,
    showFooter: true,
    phoneFrame: true,
    statusBar: true,
    statusBarTime: '9:41',
    battery: 100,
  })

  // AI Chat State
  const [aiPlatform, setAiPlatform] = useState('gemini')
  const [aiModel, setAiModel] = useState('gemini-advanced')
  const [aiMessages, setAiMessages] = useState(defaultAIMessages)
  const [aiPerson, setAiPerson] = useState({ id: 'user', name: 'You', avatar: null })
  const [aiAppearance, setAiAppearance] = useState({
    darkMode: false,
    transparentBg: false,
    showHeader: true,
    showFooter: true,
    phoneFrame: true,
    statusBar: true,
    statusBarTime: '9:41',
    battery: 100,
  })

  // Stories State
  const [storyPlatform, setStoryPlatform] = useState('instagram')
  const [storyProfile, setStoryProfile] = useState({
    username: 'username',
    avatar: null,
    verified: false,
    postedAt: { type: 'hours', value: 1 },
  })
  const [storySlides, setStorySlides] = useState([
    { id: 's1', image: null, caption: '', music: '' },
  ])
  const [storyActiveSlide, setStoryActiveSlide] = useState(0)
  const [storyAppearance, setStoryAppearance] = useState({
    phoneFrame: true,
    statusBar: true,
    statusBarTime: '9:41',
    battery: 100,
  })

  // Posts State
  const [postPlatform, setPostPlatform] = useState('linkedin')
  const [postAuthor, setPostAuthor] = useState({
    name: 'Sarah Johnson',
    avatar: null,
    subtitle: 'Product Designer at TechCorp · 3rd+',
    verified: false,
  })
  const [postContent, setPostContent] = useState({
    caption: `Excited to share that I just completed a major milestone in my career journey! After months of hard work and dedication, our team shipped a product that will impact millions of users.

Key learnings from this experience:

1. Collaboration is everything
2. User feedback is invaluable
3. Never stop iterating

Grateful for my amazing team! #ProductDesign #CareerGrowth`,
    image: null,
    postedAt: { type: 'months', value: 2 },
  })
  const [postMetrics, setPostMetrics] = useState({
    reactions: '1456',
    comments: '67',
    reposts: '34',
  })
  const [postAppearance, setPostAppearance] = useState({
    darkMode: false,
  })
  // Email State

  // Comments State
  const [commentPlatform, setCommentPlatform] = useState('linkedin')
  const [commentCreator, setCommentCreator] = useState({
    id: 'creator', name: 'Content Creator', handle: 'contentcreator', avatar: null, verified: false,
  })
  const [commentCommenters, setCommentCommenters] = useState([
    { id: 'c1', name: 'Alex Thompson', handle: 'alexthompson', avatar: null, verified: false },
    { id: 'c2', name: 'Sarah Chen', handle: 'sarahchen', avatar: null, verified: false },
    { id: 'c3', name: 'Mike Johnson', handle: 'mikejohnson', avatar: null, verified: false },
  ])
  const [commentComments, setCommentComments] = useState([
    { id: 'cm1', personId: 'c1', text: 'This is amazing! Thanks for sharing this content. Really helped me understand the topic better.', likes: '245', time: '1mo', replies: [
      { id: 'r1', personId: 'creator', text: 'Thank you so much for the kind words! Glad it helped!', likes: '89', time: '1mo' },
    ]},
    { id: 'cm2', personId: 'c2', text: 'Great explanation! Could you make a follow-up video on this topic?', likes: '127', time: '1mo', replies: [] },
    { id: 'cm3', personId: 'c3', text: "I've been looking for content like this for so long. Subscribed!", likes: '56', time: '1mo', replies: [] },
  ])
  const [commentAppearance, setCommentAppearance] = useState({
    darkMode: false,
  })

  // Email State
  const [emailSubject, setEmailSubject] = useState('Re: Follow-up on Recent Discussion')
  const [emailAttachment, setEmailAttachment] = useState('file.pdf')
  const [emailParticipants, setEmailParticipants] = useState([
    { id: 'p1', name: 'Effrey Jepstein', email: 'jeeholiday@gmail.com', redactName: false, redactEmail: false },
    { id: 'p2', name: 'Gill Bates', email: 'gillbates@microhard.com', redactName: false, redactEmail: false },
  ])
  const [emailThread, setEmailThread] = useState([
    {
      id: 'e1',
      fromId: 'p1',
      datetime: '2024-08-15T20:02',
      body: `I wanted to follow up on our previous **discussion** regarding the **upcoming event**.

Please let me know your availability for next week. We should also discuss the **guest list** and **arrangements**.

Use **double asterisks** around text to redact it.`,
    },
  ])

  const [showDownloadModal, setShowDownloadModal] = useState(false)

  const previewRef = useRef(null)
  const theme = platformThemes[platform]
  const [editorWidth, setEditorWidth] = useState(380)
  const isDragging = useRef(false)

  const handleMouseDown = useCallback((e) => {
    e.preventDefault()
    isDragging.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return
      const newWidth = Math.min(Math.max(e.clientX, 280), 600)
      setEditorWidth(newWidth)
    }
    const handleMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const handleDownload = useCallback(async (fileName) => {
    if (!previewRef.current) return
    try {
      const el = previewRef.current
      const isEmailPreview = el.classList.contains('email-preview-wrapper')

      // Read scroll position from the LIVE element before cloning
      const messagesEl = el.querySelector('.preview-messages')
      const currentScroll = messagesEl ? messagesEl.scrollTop : 0

      // Deep-clone the node so we never touch the live DOM
      const clone = el.cloneNode(true)

      // Style the clone to be invisible but properly laid out
      // Use clientWidth/clientHeight (excludes border) since we remove the border on the clone
      clone.style.position = 'fixed'
      clone.style.left = '-9999px'
      clone.style.top = '0'
      clone.style.width = `${el.clientWidth}px`
      clone.style.height = `${el.clientHeight}px`
      clone.style.zIndex = '-9999'

      // Remove phone frame styles on the clone
      clone.style.border = 'none'
      clone.style.boxShadow = 'none'
      clone.style.borderRadius = '0'

      // Append clone inside .app so it inherits theme CSS variables
      const appEl = document.querySelector('.app')
      appEl.appendChild(clone)

      // For Chat/AI Chat: simulate scroll position via margin shift on the clone
      const cloneMessages = clone.querySelector('.preview-messages')
      if (cloneMessages && !isEmailPreview && currentScroll > 0) {
        const cloneFirstChild = cloneMessages.firstElementChild
        const originalFirstChild = messagesEl.firstElementChild
        if (cloneFirstChild && originalFirstChild) {
          const computedMargin = parseFloat(getComputedStyle(originalFirstChild).marginTop) || 0
          cloneFirstChild.style.marginTop = `${computedMargin - currentScroll}px`
        }
        cloneMessages.style.overflow = 'hidden'
      }

      // For Email: expand clone to full thread height
      let toPngHeight
      if (isEmailPreview) {
        const cloneContainer = clone.querySelector('.email-preview-container')
        if (cloneContainer) {
          toPngHeight = cloneContainer.scrollHeight
          clone.style.maxHeight = 'none'
          clone.style.height = `${toPngHeight}px`
          clone.style.overflow = 'visible'
          cloneContainer.style.overflow = 'visible'
        }
      }

      const dataUrl = await toPng(clone, {
        quality: 1,
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: appearance.transparentBg ? undefined : null,
        height: toPngHeight || undefined,
        style: {
          position: 'static',
          left: 'auto',
        },
      })

      // Remove clone immediately
      appEl.removeChild(clone)

      const link = document.createElement('a')
      link.download = `${fileName}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Export failed:', err)
    }
  }, [appearance.transparentBg])

  const defaultFileName = activeTab === 'chat' 
    ? `minimock-${platform}-chat` 
    : activeTab === 'ai' 
      ? `minimock-${aiPlatform}-ai` 
      : activeTab === 'stories'
        ? `minimock-${storyPlatform}-story`
        : activeTab === 'posts'
          ? `minimock-${postPlatform}-post`
          : activeTab === 'comments'
            ? `minimock-${commentPlatform}-comments`
            : `minimock-email`

  return (
    <div className="app" data-theme={appTheme}>
      <Navbar appTheme={appTheme} setAppTheme={setAppTheme} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="app-main">
        {activeTab === 'chat' ? (
          <>
            <div style={{ width: editorWidth, flexShrink: 0 }}>
              <Editor
                platform={platform}
                setPlatform={setPlatform}
                chatType={chatType}
                setChatType={setChatType}
                groupData={groupData}
                setGroupData={setGroupData}
                people={people}
                setPeople={setPeople}
                messages={messages}
                setMessages={setMessages}
                appearance={appearance}
                setAppearance={setAppearance}
              />
            </div>
            <div className="resize-handle" onMouseDown={handleMouseDown}>
              <div className="resize-handle-line" />
            </div>
            <ChatPreview
              ref={previewRef}
              theme={theme}
              groupData={groupData}
              people={people}
              messages={messages}
              appearance={appearance}
              chatType={chatType}
              onDownload={() => setShowDownloadModal(true)}
            />
          </>
        ) : activeTab === 'ai' ? (
          <>
            <div style={{ width: editorWidth, flexShrink: 0 }}>
              <AIEditor
                platform={aiPlatform}
                setPlatform={setAiPlatform}
                aiModel={aiModel}
                setAiModel={setAiModel}
                aiPerson={aiPerson}
                setAiPerson={setAiPerson}
                messages={aiMessages}
                setMessages={setAiMessages}
                appearance={aiAppearance}
                setAppearance={setAiAppearance}
              />
            </div>
            <div className="resize-handle" onMouseDown={handleMouseDown}>
              <div className="resize-handle-line" />
            </div>
            <AIPreview
              ref={previewRef}
              platform={aiPlatform}
              model={aiModel}
              person={aiPerson}
              messages={aiMessages}
              appearance={aiAppearance}
              onDownload={() => setShowDownloadModal(true)}
            />
          </>
        ) : activeTab === 'stories' ? (
          <>
            <div style={{ width: editorWidth, flexShrink: 0 }}>
              <StoriesEditor
                platform={storyPlatform}
                setPlatform={setStoryPlatform}
                profile={storyProfile}
                setProfile={setStoryProfile}
                slides={storySlides}
                setSlides={setStorySlides}
                activeSlide={storyActiveSlide}
                setActiveSlide={setStoryActiveSlide}
                appearance={storyAppearance}
                setAppearance={setStoryAppearance}
              />
            </div>
            <div className="resize-handle" onMouseDown={handleMouseDown}>
              <div className="resize-handle-line" />
            </div>
            <StoriesPreview
              ref={previewRef}
              platform={storyPlatform}
              profile={storyProfile}
              slides={storySlides}
              activeSlide={storyActiveSlide}
              appearance={storyAppearance}
              onDownload={() => setShowDownloadModal(true)}
            />
          </>
        ) : activeTab === 'posts' ? (
          <>
            <div style={{ width: editorWidth, flexShrink: 0 }}>
              <PostsEditor
                platform={postPlatform}
                setPlatform={setPostPlatform}
                author={postAuthor}
                setAuthor={setPostAuthor}
                content={postContent}
                setContent={setPostContent}
                metrics={postMetrics}
                setMetrics={setPostMetrics}
                appearance={postAppearance}
                setAppearance={setPostAppearance}
              />
            </div>
            <div className="resize-handle" onMouseDown={handleMouseDown}>
              <div className="resize-handle-line" />
            </div>
            <PostsPreview
              ref={previewRef}
              platform={postPlatform}
              author={postAuthor}
              content={postContent}
              metrics={postMetrics}
              appearance={postAppearance}
              onDownload={() => setShowDownloadModal(true)}
            />
          </>
        ) : activeTab === 'comments' ? (
          <>
            <div style={{ width: editorWidth, flexShrink: 0 }}>
              <CommentsEditor
                platform={commentPlatform}
                setPlatform={setCommentPlatform}
                creator={commentCreator}
                setCreator={setCommentCreator}
                commenters={commentCommenters}
                setCommenters={setCommentCommenters}
                comments={commentComments}
                setComments={setCommentComments}
                appearance={commentAppearance}
                setAppearance={setCommentAppearance}
              />
            </div>
            <div className="resize-handle" onMouseDown={handleMouseDown}>
              <div className="resize-handle-line" />
            </div>
            <CommentsPreview
              ref={previewRef}
              platform={commentPlatform}
              creator={commentCreator}
              commenters={commentCommenters}
              comments={commentComments}
              appearance={commentAppearance}
              onDownload={() => setShowDownloadModal(true)}
            />
          </>
        ) : activeTab === 'email' ? (
          <>
            <div style={{ width: editorWidth, flexShrink: 0 }}>
              <EmailEditor
                subject={emailSubject}
                setSubject={setEmailSubject}
                attachment={emailAttachment}
                setAttachment={setEmailAttachment}
                participants={emailParticipants}
                setParticipants={setEmailParticipants}
                emails={emailThread}
                setEmails={setEmailThread}
              />
            </div>
            <div className="resize-handle" onMouseDown={handleMouseDown}>
              <div className="resize-handle-line" />
            </div>
            <EmailPreview
              ref={previewRef}
              subject={emailSubject}
              attachment={emailAttachment}
              participants={emailParticipants}
              emails={emailThread}
              onDownload={() => setShowDownloadModal(true)}
            />
          </>
        ) : null}
      </div>
      <Footer />
      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        onDownload={handleDownload}
        defaultFileName={defaultFileName}
      />
    </div>
  )
}

export default App
