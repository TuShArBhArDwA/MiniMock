import { useState, useRef } from 'react'
import { Mail, ChevronDown, Users, Plus, Trash2, Calendar, Paperclip, Info } from 'lucide-react'
import '../Editor.css'
import '../PeopleSection.css'
import '../MessagesSection.css'
import '../AppearanceSection.css'
import './EmailStyles.css'

function EmailParticipantCard({ participant, onUpdate, onDelete }) {
  return (
    <div className="email-participant-card">
      <div className="participant-header">
        <span className="participant-label">Participant {participant.index}</span>
        <button className="btn-icon" onClick={() => onDelete(participant.id)}>
          <Trash2 size={14} />
        </button>
      </div>
      <input
        className="input"
        placeholder="Name"
        value={participant.name}
        onChange={(e) => onUpdate(participant.id, 'name', e.target.value)}
      />
      <input
        className="input"
        placeholder="email@example.com"
        value={participant.email}
        onChange={(e) => onUpdate(participant.id, 'email', e.target.value)}
        style={{ marginTop: '8px' }}
      />
      <div className="redact-options">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={participant.redactName}
            onChange={(e) => onUpdate(participant.id, 'redactName', e.target.checked)}
          />
          Redact name
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={participant.redactEmail}
            onChange={(e) => onUpdate(participant.id, 'redactEmail', e.target.checked)}
          />
          Redact email address
        </label>
      </div>
    </div>
  )
}

function EmailCard({ email, index, participants, onUpdate, onDelete }) {
  return (
    <div className="email-card">
      <div className="email-card-header">
        <span className="email-card-label">Email {index + 1}</span>
        <button className="btn-icon" onClick={() => onDelete(email.id)}>
          <Trash2 size={14} />
        </button>
      </div>

      <div className="form-sublabel">From</div>
      <select
        className="select"
        value={email.fromId}
        onChange={(e) => onUpdate(email.id, 'fromId', e.target.value)}
      >
        {participants.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      <div className="form-sublabel" style={{ marginTop: '10px' }}>Date & Time</div>
      <input
        type="datetime-local"
        className="input"
        value={email.datetime}
        onChange={(e) => onUpdate(email.id, 'datetime', e.target.value)}
      />

      <div className="form-sublabel" style={{ marginTop: '10px' }}>Body</div>
      <textarea
        className="input email-body-input"
        value={email.body}
        onChange={(e) => onUpdate(email.id, 'body', e.target.value)}
        placeholder="Type email body... Use **double asterisks** to redact text."
        rows={5}
      />
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
            </div>
            <ChevronDown size={16} className={`section-toggle ${openSection.participants ? 'open' : ''}`} />
          </div>
          {openSection.participants && (
            <div className="section-content">
              <div className="section-subheader">
                <span>Participants</span>
                <button className="btn-text" onClick={addParticipant}>
                  <Plus size={14} /> Add
                </button>
              </div>
              {participants.map((p, i) => (
                <EmailParticipantCard
                  key={p.id}
                  participant={{ ...p, index: i + 1 }}
                  onUpdate={updateParticipant}
                  onDelete={deleteParticipant}
                />
              ))}
            </div>
          )}
        </div>

        {/* Email Thread */}
        <div className="section">
          <div className="section-header" onClick={() => toggleSection('emailThread')}>
            <div className="section-header-left">
              <Mail size={16} />
              <span>Email Thread</span>
            </div>
            <ChevronDown size={16} className={`section-toggle ${openSection.emailThread ? 'open' : ''}`} />
          </div>
          {openSection.emailThread && (
            <div className="section-content">
              <div className="section-subheader">
                <span>Emails</span>
                <button className="btn-text" onClick={addEmail}>
                  <Plus size={14} /> Add Email
                </button>
              </div>
              <div className="email-redact-hint">
                <Info size={12} />
                Use <code>**double asterisks**</code> around text to redact it (e.g., <code>**secret info**</code>)
              </div>
              {emails.map((email, i) => (
                <EmailCard
                  key={email.id}
                  email={email}
                  index={i}
                  participants={participants}
                  onUpdate={updateEmail}
                  onDelete={deleteEmail}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </aside>
  )
}
