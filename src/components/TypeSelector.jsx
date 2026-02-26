import { useState, useRef } from 'react'
import { MessageSquare, ChevronDown, Users, User, Info, Camera } from 'lucide-react'
import './TypeSelector.css'

function TypeSelector({ chatType, setChatType, groupData, setGroupData, setPeople }) {
  const [open, setOpen] = useState(true)
  const fileRef = useRef(null)

  const handleTypeChange = (type) => {
    setChatType(type)
    if (type === 'dm') {
      setPeople(prev => prev.slice(0, 2).map((p, i) => ({
        ...p,
        role: i === 0 ? 'sender' : 'receiver'
      })))
    } else {
      // Ensure roles are correct for group chat too
      setPeople(prev => prev.map((p, i) => ({
        ...p,
        role: i === 0 ? 'sender' : 'receiver'
      })))
    }
  }

  const handleAvatar = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setGroupData(prev => ({ ...prev, avatar: ev.target.result }))
    reader.readAsDataURL(file)
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
          
          {chatType === 'group' && (
            <div className="group-info-section">
              <div className="form-sublabel group-info-label">
                Group name and image <Info size={14} className="info-icon" />
              </div>
              <div className="group-input-card">
                <div className="person-avatar" onClick={() => fileRef.current?.click()}>
                  {groupData?.avatar ? (
                    <img src={groupData.avatar} alt="Group" />
                  ) : (
                    <User size={16} />
                  )}
                  <div className="avatar-overlay"><Camera size={10} /></div>
                  <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleAvatar} />
                </div>
                <input
                  className="input person-name"
                  value={groupData?.name || ''}
                  onChange={(e) => setGroupData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Group Name"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TypeSelector
