import './Navbar.css'

const navItems = [
  { label: 'Chat', active: true },
  { label: 'AI Chat', disabled: true },
  { label: 'Posts', disabled: true },
  { label: 'Comments', disabled: true },
  { label: 'Stories', disabled: true },
  { label: 'Email', disabled: true },
]

function Navbar() {
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
      <div className="navbar-right" />
    </nav>
  )
}

export default Navbar
