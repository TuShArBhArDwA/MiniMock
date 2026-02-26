import { ChevronLeft, Phone, Video, User, MoreVertical } from 'lucide-react'
import './ChatHeader.css'

function ChatHeader({ theme, isDark, chatType, people, receiver }) {
  const bgColor = isDark ? theme.headerBgDark : theme.headerBg
  const textColor = isDark ? (theme.headerTextDark || theme.headerText) : theme.headerText
  const name = chatType === 'dm' ? (receiver?.name || 'Chat') : 'Group Chat'
  const participant = chatType === 'dm' ? receiver : null
  const onlineText = theme.onlineText

  return (
    <div className="chat-header" style={{ background: bgColor, color: textColor }}>
      <div className="chat-header-left">
        <ChevronLeft size={22} />
        <div className="chat-header-avatar">
          {participant?.avatar ? (
            <img src={participant.avatar} alt={participant.name} />
          ) : (
            <div className="chat-header-avatar-placeholder" style={{ color: textColor }}>
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="chat-header-info">
          <span className="chat-header-name">{name}</span>
          {onlineText && (
            <span className="chat-header-status" style={{ opacity: 0.7, fontSize: 11 }}>
              {onlineText}
            </span>
          )}
        </div>
      </div>
      <div className="chat-header-actions">
        <Video size={18} />
        <Phone size={18} />
      </div>
    </div>
  )
}

export default ChatHeader
