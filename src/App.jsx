import { useState, useRef, useCallback } from 'react'
import { toPng } from 'html-to-image'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Editor from './components/Editor'
import ChatPreview from './components/ChatPreview'
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

  const previewRef = useRef(null)
  const theme = platformThemes[platform]

  const handleDownload = useCallback(async () => {
    if (!previewRef.current) return
    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 1,
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: appearance.transparentBg ? undefined : null,
      })
      const link = document.createElement('a')
      link.download = `minimock-${platform}-chat.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Export failed:', err)
    }
  }, [platform, appearance.transparentBg])

  return (
    <div className="app" data-theme={appearance.darkMode ? 'dark' : 'light'}>
      <Navbar />
      <div className="app-main">
        <Editor
          platform={platform}
          setPlatform={setPlatform}
          chatType={chatType}
          setChatType={setChatType}
          people={people}
          setPeople={setPeople}
          messages={messages}
          setMessages={setMessages}
          appearance={appearance}
          setAppearance={setAppearance}
        />
        <ChatPreview
          ref={previewRef}
          theme={theme}
          people={people}
          messages={messages}
          appearance={appearance}
          chatType={chatType}
          onDownload={handleDownload}
        />
      </div>
      <Footer />
    </div>
  )
}

export default App
