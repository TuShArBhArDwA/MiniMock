import './Navbar.css'

const navItems = [
  { label: 'Chat', active: true },
  { label: 'AI Chat', disabled: true },
  { label: 'Posts', disabled: true },
  { label: 'Comments', disabled: true },
  { label: 'Stories', disabled: true },
  { label: 'Email', disabled: true },
]

import { Moon, Sun } from 'lucide-react'

function Navbar({ appTheme, setAppTheme }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">M</span>
        <span className="navbar-title">MiniMock</span>
      </div>
      <div className="navbar-tabs">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`navbar-tab ${item.active ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
            disabled={item.disabled}
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
