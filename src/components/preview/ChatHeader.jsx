import {
  ChevronLeft, Phone, Video, MoreVertical, MoreHorizontal,
  Search, Pin, Users, Info, Hash, Paperclip, AtSign
} from 'lucide-react'
import './ChatHeader.css'

// Platform-specific right-side action icons
function HeaderActions({ platformId }) {
  switch (platformId) {
    case 'whatsapp':
      return <><Video size={18} /><Phone size={18} /><MoreVertical size={18} /></>
    case 'instagram':
      return <><Phone size={18} /><Video size={18} /></>
    case 'discord':
      return <><Pin size={18} /><Users size={18} /><Search size={18} /></>
    case 'x':
      return <><Info size={18} /></>
    case 'teams':
      return <><Video size={18} /><Phone size={18} /><MoreHorizontal size={18} /></>
    case 'slack':
      return <><Users size={18} /><Pin size={18} /><MoreVertical size={18} /></>
    case 'snapchat':
      return <><Phone size={18} /><Video size={18} /></>
    case 'telegram':
      return <><Phone size={18} /><MoreVertical size={18} /></>
    case 'reddit':
      return <><Info size={18} /></>
    case 'linkedin':
      return <><Video size={18} /><MoreHorizontal size={18} /></>
    default:
      return <><Video size={18} /><Phone size={18} /></>
  }
}

function ChatHeader({ theme, isDark, chatType, people, receiver, groupData }) {
  const bgColor = isDark ? theme.headerBgDark : theme.headerBg
  const textColor = isDark ? (theme.headerTextDark || theme.headerText) : theme.headerText
  const name = chatType === 'dm' ? (receiver?.name || 'Chat') : (groupData?.name || 'Group Chat')
  const avatar = chatType === 'dm' ? receiver?.avatar : groupData?.avatar

  let statusText = ''
  if (chatType === 'dm') {
    statusText = theme.onlineText
  } else {
    if (theme.id === 'whatsapp') {
      statusText = people.map(p => p.name).join(', ')
    } else if (theme.id === 'discord' || theme.id === 'slack' || theme.id === 'telegram') {
      statusText = `${people.length} members`
    } else if (theme.id === 'instagram') {
      statusText = 'Active now'
    } else if (theme.id === 'teams') {
      statusText = `${people.length} members`
    } else {
      statusText = ''
    }
  }

  // Discord & Slack use a channel/hash style instead of avatar
  const isChannelStyle = theme.id === 'discord' || theme.id === 'slack'

  return (
    <div className={`chat-header chat-header-${theme.id}`} style={{ background: bgColor, color: textColor }}>
      <div className="chat-header-left">
        {!isChannelStyle && <ChevronLeft size={22} />}
        {isChannelStyle ? (
          <div className="chat-header-channel">
            <Hash size={18} />
            <span className="chat-header-name">{name}</span>
          </div>
        ) : (
          <>
            <div className="chat-header-avatar">
              {avatar ? (
                <img src={avatar} alt={name} />
              ) : (
                <div className="chat-header-avatar-placeholder" style={{ color: textColor }}>
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="chat-header-info">
              <span className="chat-header-name">{name}</span>
              {statusText && (
                <span className="chat-header-status" style={{ opacity: 0.7, fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                  {statusText}
                </span>
              )}
            </div>
          </>
        )}
      </div>
      <div className="chat-header-actions">
        <HeaderActions platformId={theme.id} />
      </div>
    </div>
  )
}

export default ChatHeader
