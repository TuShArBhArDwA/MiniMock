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
  if (status === 'read') return <CheckCheck size={14} style={{ color: 'var(--status-read)' }} />
  if (status === 'delivered') return <CheckCheck size={14} style={{ color: 'var(--status-delivered)' }} />
  return <Check size={14} style={{ color: 'var(--status-sent)' }} />
}

function nameColor(name) {
  const colors = [
    '#e17076', '#7bc862', '#6ec9cb', '#65aadd', '#ee7aae',
    '#dda15e', '#a78bfa', '#f472b6', '#34d399', '#fbbf24'
  ]
  let hash = 0
  for (let i = 0; i < (name || '').length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

function ChatBubble({ message, messages = [], index = 0, people, theme, isDark, timeFormat, chatType }) {
  const sender = people.find(p => p.id === message.senderId)
  const isSent = sender ? (sender.role === 'sender' || sender.id === people[0]?.id) : false
  const isDiscord = theme.isDiscordStyle
  const isSlack = theme.isSlackStyle
  const platformId = theme.id

  const prevMessage = index > 0 ? messages[index - 1] : null
  const isFirstSequence = !prevMessage || prevMessage.senderId !== message.senderId

  const formattedTime = formatTime(message.time, timeFormat)

  // Platforms that show time OUTSIDE the bubble (no inline meta)
  const timeOutside = ['instagram', 'x', 'snapchat'].includes(platformId)

  // Discord / Slack flat layout
  if (isDiscord || isSlack) {
    return (
      <div className={`bubble-flat ${isDiscord ? 'bubble-flat-discord' : 'bubble-flat-slack'}`}>
        {isFirstSequence ? (
          <div className="bubble-flat-avatar">
            {sender?.avatar ? (
              <img src={sender.avatar} alt={sender?.name} />
            ) : (
              <div className="bubble-flat-avatar-placeholder" style={{
                background: isDiscord ? '#5865f2' : '#e01e5a', color: 'white'
              }}>
                {(sender?.name || '?').charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        ) : (
          <div className="bubble-flat-avatar" style={{ opacity: 0 }}></div>
        )}
        <div className="bubble-flat-content">
          {isFirstSequence && (
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
          )}
          <div className="bubble-flat-text" style={{
            color: isDiscord ? '#dcddde' : (isDark ? '#d1d2d3' : '#1d1c1d')
          }}>
            {message.text}
          </div>
          {message.image && <img src={message.image} className="bubble-image" alt="" />}
        </div>
      </div>
    )
  }

  // Teams flat layout with avatar + name outside bubble
  if (platformId === 'teams') {
    return (
      <div className={`bubble-teams ${isSent ? 'sent' : 'received'}`}>
        {!isSent && isFirstSequence && (
          <div className="bubble-teams-avatar">
            {sender?.avatar ? (
              <img src={sender.avatar} alt={sender?.name} />
            ) : (
              <div className="bubble-teams-avatar-ph" style={{ background: '#464775' }}>
                {(sender?.name || '?').charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        )}
        {!isSent && !isFirstSequence && (
          <div className="bubble-teams-avatar" style={{ opacity: 0 }}></div>
        )}
        <div className="bubble-teams-content">
          {!isSent && isFirstSequence && (
            <span className="bubble-teams-name" style={{ color: isDark ? '#c8c6c4' : '#252423' }}>
              {sender?.name || 'Unknown'}
            </span>
          )}
          <div className="bubble-teams-body" style={{
            background: isSent ? (isDark ? '#464775' : '#e8ebfa') : (isDark ? '#2d2c31' : '#ffffff'),
            color: isSent ? (isDark ? '#fff' : '#252423') : (isDark ? '#fff' : '#252423'),
          }}>
            {message.image && <img src={message.image} className="bubble-image" alt="" />}
            <div className="bubble-text">{message.text}</div>
            <div className="bubble-meta" style={{ color: 'var(--timestamp-color)' }}>
              <span className="bubble-time">{formattedTime}</span>
              {isSent && <StatusIcon status={message.status} />}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Standard bubble layout (WhatsApp, Instagram, X, Snapchat, Telegram, Reddit, LinkedIn)
  const showAvatar = isFirstSequence && (theme.showAvatarContext === 'always' || (theme.showAvatarContext === 'group' && chatType === 'group'))
  const showName = isFirstSequence && (theme.showNameContext === 'always' || (theme.showNameContext === 'group' && chatType === 'group'))
  const hasTail = isFirstSequence && theme.bubbleTail

  let bubbleClass = `bubble bubble-${platformId}`
  if (hasTail) {
    bubbleClass += isSent ? ' bubble-tail-sent' : ' bubble-tail-received'
  }

  return (
    <div className={`bubble-row bubble-row-${platformId} ${isSent ? 'sent' : 'received'} ${showAvatar && !isSent ? 'has-avatar' : ''} ${!isFirstSequence ? 'not-first' : ''}`}>
      {!isSent && showAvatar ? (
        <div className="bubble-avatar-small">
          {sender?.avatar ? (
            <img src={sender.avatar} alt={sender?.name} />
          ) : (
            <User size={12} />
          )}
        </div>
      ) : (
        !isSent && (theme.showAvatarContext === 'always' || (theme.showAvatarContext === 'group' && chatType === 'group')) && (
          <div className="bubble-avatar-small" style={{ opacity: 0 }}></div>
        )
      )}
      <div className="bubble-content-wrapper">
        <div
          className={bubbleClass}
          style={{
            background: isSent ? 'var(--bubble-sent-bg)' : 'var(--bubble-received-bg)',
            color: isSent ? 'var(--bubble-sent-text)' : 'var(--bubble-received-text)',
            borderRadius: 'var(--bubble-radius)',
          }}
        >
          {!isSent && showName && (
            <div className="bubble-sender-name" style={{ color: nameColor(sender?.name) }}>
              {sender?.name || 'Unknown'}
            </div>
          )}
          {message.image && <img src={message.image} className="bubble-image" alt="" />}
          <div className="bubble-text">
            {message.text}
            {!timeOutside && (
              <span className="bubble-meta" style={{ color: 'var(--timestamp-color)' }}>
                <span className="bubble-time">{formattedTime}</span>
                {isSent && <StatusIcon status={message.status} />}
              </span>
            )}
          </div>
        </div>
        {timeOutside && (
          <div className={`bubble-time-outside ${isSent ? 'sent' : 'received'}`} style={{ color: 'var(--timestamp-color)' }}>
            {formattedTime}
            {isSent && <span style={{ marginLeft: 4 }}><StatusIcon status={message.status} /></span>}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatBubble
