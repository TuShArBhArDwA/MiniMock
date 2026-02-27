import { useState, useRef } from 'react'
import { Mail, ChevronDown, Users, Plus, Trash2, Paperclip, Info, GripVertical, ArrowRightLeft, Camera, User } from 'lucide-react'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import '../Editor.css'
import '../PeopleSection.css'
import '../MessagesSection.css'
import '../AppearanceSection.css'
import './EmailStyles.css'

// ── Sortable wrappers ──
function SortableParticipantCard({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition, marginBottom: '8px' }
  return (
    <div ref={setNodeRef} style={style} className="email-participant-card">
      {children({ ...attributes, ...listeners })}
    </div>
  )
}

function SortableEmailCard({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition, marginBottom: '8px' }
  return (
    <div ref={setNodeRef} style={style} className="email-card">
      {children({ ...attributes, ...listeners })}
    </div>
  )
}

export default function EmailEditor({
  subject, setSubject,
  attachment, setAttachment,
  participants, setParticipants,
  emails, setEmails,
}) {
  const [openSection, setOpenSection] = useState({
    subjectAttachment: true,
    participants: true,
    emailThread: true,
  })
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const toggleSection = (section) => {
    setOpenSection(prev => ({ ...prev, [section]: !prev[section] }))
  }

  // Participants CRUD
  const addParticipant = () => {
    const id = `p${Date.now()}`
    setParticipants(prev => [...prev, {
      id,
      name: '',
      email: '',
      redactName: false,
      redactEmail: false,
    }])
  }

  const updateParticipant = (id, field, value) => {
    setParticipants(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  const deleteParticipant = (id) => {
    setParticipants(prev => prev.filter(p => p.id !== id))
  }

  const handleParticipantDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      setParticipants((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id)
        const newIndex = items.findIndex(i => i.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  // Emails CRUD
  const addEmail = () => {
    const id = `e${Date.now()}`
    setEmails(prev => [...prev, {
      id,
      fromId: participants[0]?.id || '',
      datetime: '2024-08-15T20:02',
      body: '',
    }])
  }

  const updateEmail = (id, field, value) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e))
  }

  const deleteEmail = (id) => {
    setEmails(prev => prev.filter(e => e.id !== id))
  }

  const handleEmailDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      setEmails((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id)
        const newIndex = items.findIndex(i => i.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  // Swap sender: click avatar cycles
  const swapSender = (emailId) => {
    if (participants.length < 2) return
    setEmails(prev => prev.map(e => {
      if (e.id !== emailId) return e
      const curIdx = participants.findIndex(p => p.id === e.fromId)
      const nextIdx = (curIdx + 1) % participants.length
      return { ...e, fromId: participants[nextIdx].id }
    }))
  }

  const getPersonInitial = (pId) => {
    const p = participants.find(x => x.id === pId)
    return p?.name?.[0]?.toUpperCase() || '?'
  }

  const avatarColors = ['#0a66c2', '#e1306c', '#6dae4f', '#e8a600', '#df704d', '#8b5cf6', '#ef4444', '#06b6d4']
  const getPersonColor = (pId) => {
    const idx = participants.findIndex(x => x.id === pId)
    return avatarColors[Math.max(0, idx) % avatarColors.length]
  }

  return (
    <aside className="editor">
      <div className="editor-scroll">

        {/* Subject & Attachment */}
        <div className="section">
          <div className="section-header" onClick={() => toggleSection('subjectAttachment')}>
            <div className="section-header-left">
              <Mail size={16} />
              <span>Subject & Attachment</span>
            </div>
            <ChevronDown size={16} className={`section-toggle ${openSection.subjectAttachment ? 'open' : ''}`} />
          </div>
          {openSection.subjectAttachment && (
            <div className="section-content">
              <div className="form-sublabel">Subject</div>
              <input
                className="input"
                placeholder="Email subject line..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <div className="form-sublabel" style={{ marginTop: '12px' }}>Attachment</div>
              <input
                className="input"
                placeholder="file.pdf (leave empty for none)"
                value={attachment}
                onChange={(e) => setAttachment(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Participants */}
        <div className="section">
          <div className="section-header" onClick={() => toggleSection('participants')}>
            <div className="section-header-left">
              <Users size={16} />
              <span>Participants</span>
              <span className="section-badge">{participants.length}</span>
            </div>
            <ChevronDown size={16} className={`section-toggle ${openSection.participants ? 'open' : ''}`} />
          </div>
          {openSection.participants && (
            <div className="section-content">
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleParticipantDragEnd}>
                <SortableContext items={participants.map(p => p.id)} strategy={verticalListSortingStrategy}>
                  {participants.map((p, i) => (
                    <SortableParticipantCard key={p.id} id={p.id}>
                      {(dragHandleProps) => (
                        <>
                          <div className="participant-header">
                            <div className="drag-handle" {...dragHandleProps}>
                              <GripVertical size={14} />
                            </div>
                            <span className="participant-label">Participant {i + 1}</span>
                            <button className="btn-icon" onClick={() => deleteParticipant(p.id)}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <input
                            className="input"
                            placeholder="Name"
                            value={p.name}
                            onChange={(e) => updateParticipant(p.id, 'name', e.target.value)}
                          />
                          <input
                            className="input"
                            placeholder="email@example.com"
                            value={p.email}
                            onChange={(e) => updateParticipant(p.id, 'email', e.target.value)}
                            style={{ marginTop: '8px' }}
                          />
                          <div className="redact-options">
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                checked={p.redactName}
                                onChange={(e) => updateParticipant(p.id, 'redactName', e.target.checked)}
                              />
                              Redact name
                            </label>
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                checked={p.redactEmail}
                                onChange={(e) => updateParticipant(p.id, 'redactEmail', e.target.checked)}
                              />
                              Redact email
                            </label>
                          </div>
                        </>
                      )}
                    </SortableParticipantCard>
                  ))}
                </SortableContext>
              </DndContext>
              <button className="btn-add" onClick={addParticipant}>
                <Plus size={14} /> Add participant
              </button>
            </div>
          )}
        </div>

        {/* Email Thread */}
        <div className="section">
          <div className="section-header" onClick={() => toggleSection('emailThread')}>
            <div className="section-header-left">
              <Mail size={16} />
              <span>Email Thread</span>
              <span className="section-badge">{emails.length}</span>
            </div>
            <ChevronDown size={16} className={`section-toggle ${openSection.emailThread ? 'open' : ''}`} />
          </div>
          {openSection.emailThread && (
            <div className="section-content">
              <div className="email-redact-hint">
                <Info size={12} />
                Use <code>**double asterisks**</code> around text to redact it
              </div>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleEmailDragEnd}>
                <SortableContext items={emails.map(e => e.id)} strategy={verticalListSortingStrategy}>
                  {emails.map((email, i) => (
                    <SortableEmailCard key={email.id} id={email.id}>
                      {(dragHandleProps) => (
                        <>
                          <div className="email-card-header">
                            <div className="drag-handle" {...dragHandleProps}>
                              <GripVertical size={14} />
                            </div>
                            <div
                              className="comment-swap-avatar"
                              style={{ background: getPersonColor(email.fromId) }}
                              onClick={() => swapSender(email.id)}
                              title="Click to swap sender"
                            >
                              {getPersonInitial(email.fromId)}
                              <div className="comment-swap-icon">
                                <ArrowRightLeft size={8} strokeWidth={3} />
                              </div>
                            </div>
                            <select
                              className="select comment-person-select"
                              value={email.fromId}
                              onChange={(e) => updateEmail(email.id, 'fromId', e.target.value)}
                            >
                              {participants.map(p => (
                                <option key={p.id} value={p.id}>{p.name || `Participant`}</option>
                              ))}
                            </select>
                            <button className="btn-icon" onClick={() => deleteEmail(email.id)}>
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <div className="email-card-fields">
                            <div className="comment-editor-time-row">
                              <span className="comment-editor-time-label">Date:</span>
                              <input
                                type="datetime-local"
                                className="input message-date"
                                value={email.datetime}
                                onChange={(e) => updateEmail(email.id, 'datetime', e.target.value)}
                              />
                            </div>
                            <textarea
                              className="input email-body-input"
                              value={email.body}
                              onChange={(e) => updateEmail(email.id, 'body', e.target.value)}
                              placeholder="Email body... Use **text** to redact."
                              rows={4}
                            />
                          </div>
                        </>
                      )}
                    </SortableEmailCard>
                  ))}
                </SortableContext>
              </DndContext>
              <button className="btn-add" onClick={addEmail}>
                <Plus size={14} /> Add email
              </button>
            </div>
          )}
        </div>

      </div>
    </aside>
  )
}
