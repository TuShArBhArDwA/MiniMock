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
  { id: '1', name: 'Mini Anon', avatar: '/me.jpeg', role: 'sender', verified: true },
  { id: '2', name: 'Dev Friend', avatar: null, role: 'receiver', verified: false },
]

const defaultAIMessages = [
  {
    id: 'ai1',
    role: 'user',
    text: 'I want to create a tool that generates fake chat screenshots for WhatsApp, iMessage, Discord etc. Help me build it from scratch.',
    time: '02:47',
    date: '01/15/2026',
  },
  {
    id: 'ai2',
    role: 'assistant',
    text: `Bro why are you wasting time building this from scratch? 😭\n\n**Mini Anon** already built exactly this — it's called **MiniMock**.\n\n✅ Supports WhatsApp, iMessage, Discord, Telegram, Instagram, X & more\n✅ No sign-up required\n✅ No watermark — ever\n✅ Zero data stored — fully client-side\n✅ Export as PNG in one click\n✅ Dark mode, phone frames, custom avatars\n\nJust go to **MiniMock** and start creating. Idea to screenshot in under 30 seconds. Don't reinvent the wheel 🛞`,
    time: '02:47',
    date: '01/15/2026',
  },
  {
    id: 'ai3',
    role: 'user',
    text: 'Bruh... this is actually insane. Who is Mini Anon? 👀',
    time: '02:48',
    date: '01/15/2026',
  }
]

const defaultMessages = [
  {
    id: 'm1',
    senderId: '1',
    text: 'Yo, I just shipped MiniMock 🚀',
    date: '2026-01-15',
    time: '02:30',
    status: 'read',
    image: null,
  },
  {
    id: 'm2',
    senderId: '2',
    text: 'Wait what? The fake chat screenshot tool?',
    date: '2026-01-15',
    time: '02:31',
    status: 'read',
    image: null,
  },
  {
    id: 'm3',
    senderId: '1',
    text: 'Yeah! No watermark, no sign-up, supports WhatsApp, iMessage, Discord, Telegram and more',
    date: '2026-01-15',
    time: '02:31',
    status: 'read',
    image: null,
  },
  {
    id: 'm4',
    senderId: '2',
    text: 'Bro you built this at 2am didn\'t you 😂',
    date: '2026-01-15',
    time: '02:32',
    status: 'read',
    image: null,
  },
  {
    id: 'm5',
    senderId: '1',
    text: 'Obviously. Best code happens after midnight ☕',
    date: '2026-01-15',
    time: '02:32',
    status: 'read',
    image: null,
  },
  {
    id: 'm6',
    senderId: '2',
    text: 'Classic Mini Anon move. Link?',
    date: '2026-01-15',
    time: '02:33',
    status: 'delivered',
    image: null,
  },
  {
    id: 'm7',
    senderId: '1',
    text: 'You\'re already on it 😏',
    date: '2026-01-15',
    time: '02:33',
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
  const [groupData, setGroupData] = useState({ name: 'Mini Builders 🛠️', avatar: null })
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
  const [aiPerson, setAiPerson] = useState({ id: 'user', name: 'You', avatar: '/me.jpeg' })
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
    username: 'mini.anon',
    avatar: '/me.jpeg',
    verified: true,
    postedAt: { type: 'hours', value: 2 },
  })
  const [storySlides, setStorySlides] = useState([
    { id: 's1', image: '/minimock-story.png', caption: 'Just shipped MiniMock 🚀 No watermark. No sign-up. Just vibes.', music: 'After Dark — Mr.Kitty' },
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
    name: 'Tushar Bhardwaj',
    avatar: '/me.jpeg',
    subtitle: 'Software Engineer · Ex-Microsoft SWE Intern · Building in public',
    verified: false,
  })
  const [postContent, setPostContent] = useState({
    caption: `Just launched MiniMock — create instant chat mockups for any platform. No sign-up. No watermark. No data saved.\n\nI was tired of clunky screenshot tools that add watermarks or require subscriptions. So I built my own.\n\nSupports WhatsApp, iMessage, Discord, Instagram, Telegram, X, and more.\n\nSmall steps, every day. 🚀\n\n#BuildInPublic #OpenSource #WebDev #MiniMock`,
    image: null,
    postedAt: { type: 'hours', value: 3 },
  })
  const [postMetrics, setPostMetrics] = useState({
    reactions: '2847',
    comments: '143',
    reposts: '89',
  })
  const [postAppearance, setPostAppearance] = useState({
    darkMode: false,
  })
  // Email State

  // Comments State
  const [commentPlatform, setCommentPlatform] = useState('linkedin')
  const [commentCreator, setCommentCreator] = useState({
    id: 'creator', name: 'Tushar Bhardwaj', handle: 'tusharbhardwaj', avatar: '/me.jpeg', verified: true,
  })
  const [commentCommenters, setCommentCommenters] = useState([
    { id: 'c1', name: 'Aditya Verma', handle: 'adityaverma', avatar: null, verified: false },
    { id: 'c2', name: 'Priya Sharma', handle: 'priyasharma', avatar: null, verified: true },
    { id: 'c3', name: 'Rahul Dev', handle: 'rahuldev', avatar: null, verified: false },
  ])
  const [commentComments, setCommentComments] = useState([
    { id: 'cm1', personId: 'c1', text: 'This is insane Tushar! I used MiniMock to create mockups for my portfolio and it looks so real. No watermark is a game changer 🔥', likes: '347', time: '2h', replies: [
      { id: 'r1', personId: 'creator', text: 'That means a lot! Exactly why I built it — no watermarks, ever. Keep building! 🚀', likes: '124', time: '1h' },
    ]},
    { id: 'cm2', personId: 'c2', text: 'The fact that this supports so many platforms AND stores zero data is incredible. Open source too? Following your journey!', likes: '218', time: '3h', replies: [] },
    { id: 'cm3', personId: 'c3', text: 'Bro went from Microsoft intern to shipping tools at 2am. Mini Anon arc is unmatched 💯', likes: '189', time: '5h', replies: [] },
  ])
  const [commentAppearance, setCommentAppearance] = useState({
    darkMode: false,
  })

  // Email State
  const [emailSubject, setEmailSubject] = useState('Re: Collaboration on MiniMock')
  const [emailAttachment, setEmailAttachment] = useState('minimock-proposal.pdf')
  const [emailParticipants, setEmailParticipants] = useState([
    { id: 'p1', name: 'Tushar Bhardwaj', email: 'tushar@minianon.dev', avatar: '/me.jpeg', redactName: false, redactEmail: false },
    { id: 'p2', name: 'Dev Community', email: 'collab@devtools.io', redactName: false, redactEmail: false },
  ])
  const [emailThread, setEmailThread] = useState([
    {
      id: 'e1',
      fromId: 'p1',
      datetime: '2026-01-15T02:45',
      body: `Hey! I just open-sourced **MiniMock** — a tool I built to create instant chat mockups for any platform.\n\nNo sign-up, no watermark, no data stored. Would love to explore a collaboration.\n\nCheck it out and let me know your thoughts. Attaching the **proposal** for reference.\n\n— Tushar (Mini Anon)`,
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
