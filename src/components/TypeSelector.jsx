import { useState } from 'react'
import { MessageSquare, ChevronDown, Users, User } from 'lucide-react'
import './TypeSelector.css'

function TypeSelector({ chatType, setChatType, setPeople }) {
  const [open, setOpen] = useState(true)

  const handleTypeChange = (type) => {
    setChatType(type)
    if (type === 'dm') {
      setPeople(prev => prev.slice(0, 2).map((p, i) => ({
        ...p,
        role: i === 0 ? 'sender' : 'receiver'
      })))
    }
  }

  return (
    <div className="section">
      <div className="section-header" onClick={() => setOpen(!open)}>
        <div className="section-header-left">
          <MessageSquare size={16} />
          <span>Type</span>
          <span className="section-selected">{chatType === 'dm' ? 'Direct Message' : 'Group Chat'}</span>
        </div>
        <ChevronDown size={16} className={`section-toggle ${open ? 'open' : ''}`} />
      </div>
      {open && (
        <div className="section-content">
          <div className="type-buttons">
            <button
              className={`type-btn ${chatType === 'dm' ? 'active' : ''}`}
              onClick={() => handleTypeChange('dm')}
            >
              <User size={14} />
              <span>Direct Message</span>
            </button>
            <button
              className={`type-btn ${chatType === 'group' ? 'active' : ''}`}
              onClick={() => handleTypeChange('group')}
            >
              <Users size={14} />
              <span>Group Chat</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TypeSelector
