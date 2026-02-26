import { useState, useRef, useCallback, useEffect } from 'react'
import { toPng } from 'html-to-image'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Editor from './components/Editor'
import ChatPreview from './components/ChatPreview'
import DownloadModal from './components/DownloadModal'
import platformThemes from './themes/platformThemes'

const defaultPeople = [
  { id: '1', name: 'You', avatar: null, role: 'sender' },
  { id: '2', name: 'Friend', avatar: null, role: 'receiver' },
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
  const [platform, setPlatform] = useState('whatsapp')
  const [chatType, setChatType] = useState('dm')
  const [appTheme, setAppTheme] = useState('dark') // 'light' or 'dark'
  const [groupData, setGroupData] = useState({ name: 'Group Chat', avatar: null })
  const [people, setPeople] = useState(defaultPeople)
  const [messages, setMessages] = useState(defaultMessages)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
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

      // Hide scrollbar
      const messagesEl = el.querySelector('.preview-messages')
      const savedOverflow = messagesEl ? messagesEl.style.overflow : ''
      if (messagesEl) messagesEl.style.overflow = 'hidden'

      const dataUrl = await toPng(el, {
        quality: 1,
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: appearance.transparentBg ? undefined : null,
      })

      // Restore everything instantly
      el.style.border = savedBorder
      el.style.boxShadow = savedShadow
      el.style.borderRadius = savedRadius
      if (messagesEl) messagesEl.style.overflow = savedOverflow

      const link = document.createElement('a')
      link.download = `${fileName || `minimock-${platform}-chat`}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Export failed:', err)
    }
  }, [platform, appearance.transparentBg])

  return (
    <div className="app" data-theme={appTheme}>
      <Navbar appTheme={appTheme} setAppTheme={setAppTheme} />
      <div className="app-main">
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
      </div>
      <Footer />
      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        onDownload={handleDownload}
        platform={platform}
      />
    </div>
  )
}

export default App
