import { useState, useEffect, useRef } from 'react'
import { MessageSquare, LayoutTemplate, Settings2, Trash2, Plus, ArrowRightLeft, Image, ChevronDown, GripVertical, Calendar, Users, Camera, User, Info, ImagePlus } from 'lucide-react'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import aiThemes from '../../themes/aiThemes.jsx'
import './AIEditor.css'
import '../MessagesSection.css' /* Reuse exact standard editor message card UI */
import '../PeopleSection.css'

function AIPersonCard({ person, onNameChange, onAvatarChange }) {
  const fileRef = useRef(null)
  const handleAvatar = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onAvatarChange(person.id, ev.target.result)
    reader.readAsDataURL(file)
  }
  return (
    <div className="person-card no-drag">
      <div className="person-avatar" onClick={() => fileRef.current?.click()}>
        {person?.avatar ? (
          <img src={person.avatar} alt={person.name} />
        ) : (
          <User size={16} />
        )}
        <div className="avatar-overlay"><Camera size={10} /></div>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleAvatar} />
      </div>
      <input
        className="input person-name"
        value={person?.name || ''}
        onChange={(e) => onNameChange(person.id, e.target.value)}
        placeholder="Name"
      />
    </div>
  )
}

function AISortableMessage({ msg, onUpdate, onDelete, onToggleRole, onImageUpload }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: msg.id })
  const fileRef = useRef(null)

  const handleImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onImageUpload(msg.id, ev.target.result)
    reader.readAsDataURL(file)
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="message-card">
      <div className="message-card-top">
        <div className="drag-handle" {...attributes} {...listeners}>
          <GripVertical size={14} />
        </div>
        <div className="message-sender-avatar" onClick={() => onToggleRole(msg.id)}>
          <div style={{ width: 24, height: 24, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: msg.role === 'user' ? '#f0f0f0' : '#10a37f', color: msg.role === 'user' ? '#000' : '#fff', borderRadius: '50%' }}>
            {msg.role === 'user' ? 'U' : 'AI'}
          </div>
          <div className="avatar-swap-overlay">
            <ArrowRightLeft size={10} strokeWidth={3} />
          </div>
        </div>
        
        <select
          className="select message-sender-select"
          value={msg.role}
          onChange={(e) => onToggleRole(msg.id)} /* Just swaps between two states */
        >
          <option value="user">User (You)</option>
          <option value="assistant">Assistant</option>
        </select>
        
        <div className="message-datetime">
          {/* Date & Time fields removed for AI Chats as per user request */}
        </div>
      </div>
      <div className="message-card-body">
        <textarea
          className="input message-text"
          value={msg.text}
          onChange={(e) => onUpdate(msg.id, 'text', e.target.value)}
          // Keep AI Editor specific placeholder
          placeholder={msg.role === 'user' ? 'Type user message...' : 'Type AI response (supports Markdown)...'}
          rows={2}
        />
        {msg.image && (
          <div className="message-image-preview">
            <img src={msg.image} alt="" />
            <button className="btn-icon remove-image" onClick={() => onUpdate(msg.id, 'image', null)}>
              <Trash2 size={12} />
            </button>
          </div>
        )}
      </div>
      <div className="message-card-bottom" style={{ justifyContent: 'space-between' }}>
        <div>
          <button className="btn btn-ghost message-add-image" onClick={() => fileRef.current?.click()}>
            <ImagePlus size={13} style={{ marginRight: '4px' }}/>
            Add Image
          </button>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleImage} />
        </div>
        <button className="btn-icon" onClick={() => onDelete(msg.id)}>
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}

export default function AIEditor({ platform, setPlatform, aiModel, setAiModel, aiPerson, setAiPerson, messages, setMessages, appearance, setAppearance }) {
  const [openSection, setOpenSection] = useState({ platform: true, people: true, messages: true, appearance: true })
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  // When platform changes, auto-select the first available model for that platform
  useEffect(() => {
    if (aiThemes[platform]?.models?.length > 0) {
      // Create a function reference check so we don't cause infinite render loops easily
      setAiModel(aiThemes[platform].models[0].id)
    }
  }, [platform])

  const toggleSection = (section) => {
    setOpenSection(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      setMessages((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id)
        const newIndex = items.findIndex(i => i.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleUpdateMessage = (id, field, value) => {
    setMessages(messages.map(m => m.id === id ? { ...m, [field]: value } : m))
  }

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(m => m.id !== id))
  }

  const uploadImage = (id, dataUrl) => {
    setMessages(messages.map(m => m.id === id ? { ...m, image: dataUrl } : m))
  }

  const handleToggleRole = (id) => {
    setMessages(messages.map(m => m.id === id ? { 
      ...m, 
      role: m.role === 'user' ? 'assistant' : 'user' 
    } : m))
  }

  const handleAddMessage = () => {
    const lastRole = messages.length > 0 ? messages[messages.length - 1].role : 'assistant'
    const newRole = lastRole === 'user' ? 'assistant' : 'user'
    
    // Simple date/time for new mock messages
    const now = new Date()
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    const date = `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}/${now.getFullYear()}`

    setMessages([
      ...messages,
      {
        id: `ai${Date.now()}`,
        role: newRole,
        text: '',
        time,
        date
      }
    ])
  }
  return (
    <div className="editor">
      <div className="editor-scroll">
        
        {/* App & Model Section */}
        <div className="section">
          <div className="section-header" onClick={() => toggleSection('platform')}>
            <div className="section-header-left">
              <LayoutTemplate size={16} />
              <span>App & Model</span>
              <span className="section-selected">{aiThemes[platform]?.name}</span>
            </div>
            <ChevronDown size={16} className={`section-toggle ${openSection.platform ? 'open' : ''}`} />
          </div>
          {openSection.platform && (
            <div className="section-content">
              <div className="platform-grid">
                {Object.values(aiThemes).map(t => (
                  <button
                    key={t.id}
                    className={`platform-btn ${t.id === platform ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setPlatform(t.id)
                    }}
                  >
                    <span className="platform-icon">
                      {t.brandSvg ? (
                        <div style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.id === platform ? '#FFF' : 'inherit' }}>
                          {t.brandSvg}
                        </div>
                      ) : (
                        <div style={{ width: 20, height: 20, background: 'currentColor', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.id === platform ? 'white' : 'inherit' }}>
                          <span style={{ color: t.id === platform ? '#000' : 'inherit', fontSize: '12px', fontWeight: 'bold' }}>{t.name[0]}</span>
                        </div>
                      )}
                    </span>
                    <span className="platform-name">{t.name}</span>
                  </button>
                ))}
              </div>
              <div className="form-row" style={{ marginTop: '12px' }}>
                <select 
                  className="select input" 
                  style={{ width: '100%' }}
                  value={aiModel}
                  onChange={(e) => setAiModel(e.target.value)}
                >
                  {aiThemes[platform]?.models?.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* People Section */}
        <div className="section">
          <div className="section-header" onClick={() => toggleSection('people')}>
            <div className="section-header-left">
              <Users size={16} />
              <span>People</span>
              <span className="section-badge">1</span>
            </div>
            <ChevronDown size={16} className={`section-toggle ${openSection.people ? 'open' : ''}`} />
          </div>
          {openSection.people && (
            <div className="section-content">
              <div className="form-sublabel group-info-label">
                SENDER <Info size={14} className="info-icon" />
              </div>
              <AIPersonCard 
                person={aiPerson} 
                onNameChange={(id, name) => setAiPerson({ ...aiPerson, name })} 
                onAvatarChange={(id, avatar) => setAiPerson({ ...aiPerson, avatar })} 
              />
            </div>
          )}
        </div>

        {/* Messages Section */}
        <div className="section">
          <div className="section-header" onClick={() => toggleSection('messages')}>
            <div className="section-header-left">
              <MessageSquare size={16} />
              <span>Messages</span>
              <span className="section-badge">{messages.length}</span>
            </div>
            <ChevronDown size={16} className={`section-toggle ${openSection.messages ? 'open' : ''}`} />
          </div>
          {openSection.messages && (
            <div className="section-content">
              <button className="btn btn-ghost add-message-btn" onClick={handleAddMessage}>
                <Plus size={14} />
                Add message
              </button>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={messages.map(m => m.id)} strategy={verticalListSortingStrategy}>
                  {messages.map(msg => (
                    <AISortableMessage
                      key={msg.id}
                      msg={msg}
                      onUpdate={handleUpdateMessage}
                      onDelete={handleDeleteMessage}
                      onToggleRole={handleToggleRole}
                      onImageUpload={uploadImage}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          )}
        </div>

        {/* Appearance Section */}
        <div className="section">
          <div className="section-header">
            <div className="section-header-left">
              <Settings2 />
              Appearance
            </div>
          </div>
          <div className="section-content">
            <div className="form-sublabel">THEME</div>
            <div className="form-row">
              <span className="form-label">Dark mode</span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={appearance.darkMode}
                  onChange={(e) => setAppearance({ ...appearance, darkMode: e.target.checked })}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="form-sublabel">LAYOUT</div>
            <div className="form-row">
              <span className="form-label">Show header</span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={appearance.showHeader}
                  onChange={(e) => setAppearance({ ...appearance, showHeader: e.target.checked })}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="form-row" style={{ marginTop: '12px' }}>
              <span className="form-label">Show footer</span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={appearance.showFooter}
                  onChange={(e) => setAppearance({ ...appearance, showFooter: e.target.checked })}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="form-sublabel">DEVICE</div>
            <div className="form-row">
              <span className="form-label">Phone frame</span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={appearance.phoneFrame}
                  onChange={(e) => setAppearance({ ...appearance, phoneFrame: e.target.checked })}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="form-row" style={{ marginTop: '12px' }}>
              <span className="form-label">Status bar</span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={appearance.statusBar}
                  onChange={(e) => setAppearance({ ...appearance, statusBar: e.target.checked })}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            {appearance.statusBar && (
              <div className="statusbar-settings">
                <div className="form-sublabel">STATUS BAR DETAILS</div>
                <div className="form-row">
                  <span className="form-label">Time</span>
                  <input
                    type="text"
                    className="input input-small"
                    value={appearance.statusBarTime}
                    onChange={(e) => setAppearance({ ...appearance, statusBarTime: e.target.value })}
                  />
                </div>
                <div className="form-row" style={{ marginTop: '12px' }}>
                  <span className="form-label">Battery (%)</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="input input-small"
                    value={appearance.battery}
                    onChange={(e) => setAppearance({ ...appearance, battery: parseInt(e.target.value) || 100 })}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
