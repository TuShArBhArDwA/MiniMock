import { useState, useRef, useCallback, useEffect } from 'react'
import { toPng } from 'html-to-image'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Editor from './components/Editor'
import ChatPreview from './components/ChatPreview'
import AIEditor from './components/ai/AIEditor'
import AIPreview from './components/ai/AIPreview'
import EmailEditor from './components/email/EmailEditor'
import EmailPreview from './components/email/EmailPreview'
import DownloadModal from './components/DownloadModal'
import platformThemes from './themes/platformThemes'
import aiThemes from './themes/aiThemes.jsx'
import './components/ai/AIStyles.css'

const defaultPeople = [
  { id: '1', name: 'You', avatar: null, role: 'sender' },
  { id: '2', name: 'Friend', avatar: null, role: 'receiver' },
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

      // Override frame styles via inline (no class removal = no visual flash)
      const savedBorder = el.style.border
      const savedShadow = el.style.boxShadow
      const savedRadius = el.style.borderRadius
      el.style.border = 'none'
      el.style.boxShadow = 'none'
      el.style.borderRadius = '0'

      // Hide scrollbar for chat preview
      const messagesEl = el.querySelector('.preview-messages')
      const savedMessagesOverflow = messagesEl ? messagesEl.style.overflow : ''
      if (messagesEl) messagesEl.style.overflow = 'hidden'

      // Expand email preview temporarily to capture full thread
      const isEmailPreview = el.classList.contains('email-preview-wrapper')
      const savedMaxHeight = el.style.maxHeight
      const savedHeight = el.style.height
      const savedOverflow = el.style.overflow
      
      let emailContainer
      let savedContainerOverflow = ''
      let targetHeight
      
      if (isEmailPreview) {
        emailContainer = el.querySelector('.email-preview-container')
        if (emailContainer) {
          // Explicitly force the wrapper to be as tall as the scrollable content
          targetHeight = emailContainer.scrollHeight
          el.style.maxHeight = 'none'
          el.style.height = `${targetHeight}px`
          el.style.overflow = 'visible'
          
          savedContainerOverflow = emailContainer.style.overflow
          emailContainer.style.overflow = 'visible'
        }
      }

      const dataUrl = await toPng(el, {
        quality: 1,
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: appearance.transparentBg ? undefined : null,
        height: isEmailPreview && targetHeight ? targetHeight : undefined,
        style: isEmailPreview ? { transform: 'none' } : undefined
      })

      // Restore everything instantly
      el.style.border = savedBorder
      el.style.boxShadow = savedShadow
      el.style.borderRadius = savedRadius
      if (messagesEl) messagesEl.style.overflow = savedMessagesOverflow
      
      if (isEmailPreview) {
        el.style.maxHeight = savedMaxHeight
        el.style.height = savedHeight
        el.style.overflow = savedOverflow
        if (emailContainer) {
          emailContainer.style.overflow = savedContainerOverflow
        }
      }

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
