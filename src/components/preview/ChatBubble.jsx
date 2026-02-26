import { User, Check, CheckCheck } from 'lucide-react'
import './ChatBubble.css'

function formatTime(time, format) {
  if (!time) return ''
  if (format === '12') {
    const [h, m] = time.split(':')
    const hour = parseInt(h)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const h12 = hour % 12 || 12
    return `${h12}:${m} ${ampm}`
  }
  return time
}

function StatusIcon({ status }) {
  if (status === 'read') {
    return <CheckCheck size={14} style={{ color: 'var(--status-read)' }} />
  }
  if (status === 'delivered') {
    return <CheckCheck size={14} style={{ color: 'var(--status-delivered)' }} />
  }
  return <Check size={14} style={{ color: 'var(--status-sent)' }} />
}

function ChatBubble({ message, people, theme, isDark, timeFormat }) {
  const sender = people.find(p => p.id === message.senderId)
  const isSent = sender ? (sender.role === 'sender' || sender.id === people[0]?.id) : false
  const isDiscord = theme.isDiscordStyle
  const isSlack = theme.isSlackStyle

  const formattedTime = formatTime(message.time, timeFormat)

  // Discord / Slack style: no bubbles, flat layout
  if (isDiscord || isSlack) {
    return (
      <div className="bubble-flat">
        <div className="bubble-flat-avatar">
          {sender?.avatar ? (
            <img src={sender.avatar} alt={sender?.name} />
          ) : (
            <div className="bubble-flat-avatar-placeholder" style={{
              background: isDiscord ? '#5865f2' : '#e01e5a',
              color: 'white'
            }}>
              {(sender?.name || '?').charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="bubble-flat-content">
          <div className="bubble-flat-header">
            <span className="bubble-flat-name" style={{
              color: isDiscord ? '#ffffff' : (isDark ? '#d1d2d3' : '#1d1c1d')
            }}>
              {sender?.name || 'Unknown'}
            </span>
            <span className="bubble-flat-time" style={{ color: 'var(--timestamp-color)' }}>
              {formattedTime}
            </span>
          </div>
          <div className="bubble-flat-text" style={{
            color: isDiscord ? '#dcddde' : (isDark ? '#d1d2d3' : '#1d1c1d')
          }}>
            {message.text}
          </div>
          {message.image && (
            <img src={message.image} className="bubble-image" alt="" />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`bubble-row ${isSent ? 'sent' : 'received'}`}>
      {!isSent && (
        <div className="bubble-avatar-small">
          {sender?.avatar ? (
            <img src={sender.avatar} alt={sender?.name} />
          ) : (
            <User size={12} />
          )}
        </div>
      )}
      <div
        className="bubble"
        style={{
          background: isSent ? 'var(--bubble-sent-bg)' : 'var(--bubble-received-bg)',
          color: isSent ? 'var(--bubble-sent-text)' : 'var(--bubble-received-text)',
          borderRadius: 'var(--bubble-radius)',
        }}
      >
        {message.image && (
          <img src={message.image} className="bubble-image" alt="" />
        )}
        <div className="bubble-text">{message.text}</div>
        <div className="bubble-meta">
          <span className="bubble-time" style={{ color: 'var(--timestamp-color)' }}>
            {formattedTime}
          </span>
          {isSent && <StatusIcon status={message.status} />}
        </div>
      </div>
    </div>
  )
}

export default ChatBubble
