import './Navbar.css'

const navItems = [
  { id: 'chat', label: 'Chat' },
  { id: 'ai', label: 'AI Chat' },
  { id: 'posts', label: 'Posts' },
  { id: 'comments', label: 'Comments', disabled: true },
  { id: 'stories', label: 'Stories' },
  { id: 'email', label: 'Email' },
]

import { Moon, Sun } from 'lucide-react'

function Navbar({ appTheme, setAppTheme, activeTab, setActiveTab }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">M</span>
        <span className="navbar-title">MiniMock</span>
      </div>
      <div className="navbar-tabs">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`navbar-tab ${activeTab === item.id ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
            disabled={item.disabled}
            onClick={() => !item.disabled && setActiveTab(item.id)}
          >
            {item.label}
            {item.disabled && <span className="tab-soon">soon</span>}
          </button>
        ))}
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
