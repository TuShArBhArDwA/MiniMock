import './Navbar.css'

import { 
  Moon, 
  Sun, 
  MessageCircle, 
  Bot, 
  Layout, 
  MessageSquare, 
  Image as ImageIcon, 
  Mail 
} from 'lucide-react'

const navItems = [
  { id: 'chat', label: 'Chat', icon: MessageCircle },
  { id: 'ai', label: 'AI Chat', icon: Bot },
  { id: 'posts', label: 'Posts', icon: Layout },
  { id: 'comments', label: 'Comments', icon: MessageSquare },
  { id: 'stories', label: 'Stories', icon: ImageIcon },
  { id: 'email', label: 'Email', icon: Mail },
]

function Navbar({ appTheme, setAppTheme, activeTab, setActiveTab }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">M</span>
        <span className="navbar-title">MiniMock</span>
      </div>
      <div className="navbar-tabs-container">
        <div className="navbar-tabs">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`navbar-tab ${activeTab === item.id ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
              disabled={item.disabled}
              onClick={() => !item.disabled && setActiveTab(item.id)}
            >
              {item.icon && <item.icon size={16} className="tab-icon" />}
              <span className="tab-label">{item.label}</span>
              {item.disabled && <span className="tab-soon">soon</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="navbar-right">
        <button
          className="btn-icon"
          onClick={() => setAppTheme(t => t === 'dark' ? 'light' : 'dark')}
          title="Toggle app theme"
        >
          {appTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
