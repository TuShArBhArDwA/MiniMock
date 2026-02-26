import { useState, useRef } from 'react'
import {
  ChevronDown, MessageCircle, Plus, Trash2, GripVertical,
  ImagePlus, Calendar, Clock, User, ArrowRightLeft
} from 'lucide-react'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import './MessagesSection.css'

function SortableMessage({ msg, people, onUpdate, onDelete, onImageUpload }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: msg.id })
  const fileRef = useRef(null)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const sender = people.find(p => p.id === msg.senderId) || people[0]
  const isSent = sender.role === 'sender' || sender.id === people[0]?.id

  const handleImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onImageUpload(msg.id, ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleAvatarSwap = (e) => {
    if (people.length === 2) {
      const otherId = people.find(p => p.id !== msg.senderId)?.id
      if (otherId) onUpdate(msg.id, 'senderId', otherId)
    }
  }

  return (
    <div ref={setNodeRef} style={style} className="message-card">
      <div className="message-card-top">
        <div className="drag-handle" {...attributes} {...listeners}>
          <GripVertical size={14} />
        </div>
        <div className="message-sender-avatar" onClick={handleAvatarSwap}>
          {sender.avatar ? (
            <img src={sender.avatar} alt={sender.name} />
          ) : (
            <User size={12} />
          )}
          <div className="avatar-swap-overlay">
            {people.length === 2 ? <ArrowRightLeft size={10} strokeWidth={3} /> : <ChevronDown size={10} strokeWidth={3} />}
          </div>
          {people.length > 2 && (
            <select
              className="avatar-hidden-select"
              value={msg.senderId}
              onChange={(e) => onUpdate(msg.id, 'senderId', e.target.value)}
            >
              {people.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          )}
        </div>
        <select
          className="select message-sender-select"
          value={msg.senderId}
          onChange={(e) => onUpdate(msg.id, 'senderId', e.target.value)}
        >
          {people.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <div className="message-datetime">
          <Calendar size={12} />
          <input
            type="date"
            className="input input-small message-date"
            value={msg.date}
            onChange={(e) => onUpdate(msg.id, 'date', e.target.value)}
          />
          <input
            type="time"
            className="input input-small message-time"
            value={msg.time}
            onChange={(e) => onUpdate(msg.id, 'time', e.target.value)}
          />
        </div>
      </div>
      <div className="message-card-body">
        <textarea
          className="input message-text"
          value={msg.text}
          onChange={(e) => onUpdate(msg.id, 'text', e.target.value)}
          placeholder="Type message..."
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
      <div className="message-card-bottom">
        {isSent ? (
          <select
            className="select message-status-select"
            value={msg.status}
            onChange={(e) => onUpdate(msg.id, 'status', e.target.value)}
          >
            <option value="sent">Sent</option>
            <option value="delivered">Delivered</option>
            <option value="read">Read</option>
          </select>
        ) : (
          <div className="message-status-select" style={{ visibility: 'hidden' }}></div>
        )}
        <button className="btn btn-ghost message-add-image" onClick={() => fileRef.current?.click()}>
          <ImagePlus size={13} />
          Add Image
        </button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleImage} />
        <button className="btn-icon" onClick={() => onDelete(msg.id)}>
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}

function MessagesSection({ messages, setMessages, people }) {
  const [open, setOpen] = useState(true)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

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

  const addMessage = () => {
    const id = `m${Date.now()}`
    const now = new Date()
    setMessages(prev => [...prev, {
      id,
      senderId: people[0]?.id || '1',
      text: '',
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().slice(0, 5),
      status: 'sent',
      image: null,
    }])
  }

  const updateMessage = (id, field, value) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m))
  }

  const deleteMessage = (id) => {
    setMessages(prev => prev.filter(m => m.id !== id))
  }

  const uploadImage = (id, dataUrl) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, image: dataUrl } : m))
  }

  return (
    <div className="section">
      <div className="section-header" onClick={() => setOpen(!open)}>
        <div className="section-header-left">
          <MessageCircle size={16} />
          <span>Messages</span>
          <span className="section-badge">{messages.length}</span>
        </div>
        <ChevronDown size={16} className={`section-toggle ${open ? 'open' : ''}`} />
      </div>
      {open && (
        <div className="section-content">
          <button className="btn btn-ghost add-message-btn" onClick={addMessage}>
            <Plus size={14} />
            Add message
          </button>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={messages.map(m => m.id)} strategy={verticalListSortingStrategy}>
              {messages.map(msg => (
                <SortableMessage
                  key={msg.id}
                  msg={msg}
                  people={people}
                  onUpdate={updateMessage}
                  onDelete={deleteMessage}
                  onImageUpload={uploadImage}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  )
}

export default MessagesSection
