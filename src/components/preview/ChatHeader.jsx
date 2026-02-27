import {
  ChevronLeft, ArrowLeft, Phone, Video, MoreVertical, MoreHorizontal,
  Search, Pin, Users, Info, Hash, ChevronDown, Bell, Settings,
  Shield, UserPlus
} from 'lucide-react'
import './ChatHeader.css'

/* Platform-specific header action icons */
function HeaderActions({ platformId, chatType }) {
  switch (platformId) {
    case 'whatsapp':
      return chatType === 'group'
        ? <><Video size={22} /><ChevronDown size={16} /><MoreVertical size={22} /></>
        : <><Video size={22} /><Phone size={22} /><MoreVertical size={22} /></>

    case 'instagram':
      return <><Phone size={20} /><Video size={20} /></>

    case 'discord':
      return <><Pin size={18} /><Users size={18} /><Search size={18} /><Bell size={18} /></>

    case 'x':
      return <Info size={20} />

    case 'teams':
      return <><Video size={20} /><Phone size={20} /><MoreHorizontal size={20} /></>

    case 'slack':
      return <><Users size={18} /><Pin size={18} /><MoreVertical size={18} /></>

    case 'snapchat':
      return <><Phone size={20} /><Video size={20} /></>

    case 'telegram':
      return <><Phone size={20} /><MoreVertical size={20} /></>

    case 'reddit':
      return <Info size={20} />

    case 'linkedin':
      return <><Video size={20} /><MoreHorizontal size={20} /></>

    default:
      return <><Video size={18} /><Phone size={18} /></>
  }
}

/* Platform-specific back button */
function BackButton({ platformId }) {
  switch (platformId) {
    case 'whatsapp':
      return <ArrowLeft size={24} />
    case 'instagram':
      return <ArrowLeft size={24} />
    case 'telegram':
      return <ArrowLeft size={24} />
    case 'snapchat':
      return <ChevronLeft size={28} style={{ marginLeft: -8 }} />
    default:
      return <ChevronLeft size={24} />
  }
}

function ChatHeader({ theme, isDark, chatType, people, receiver, groupData }) {
  const bgColor = isDark ? theme.headerBgDark : theme.headerBg
  const textColor = isDark ? (theme.headerTextDark || theme.headerText) : theme.headerText
  const name = chatType === 'dm' ? (receiver?.name || 'Chat') : (groupData?.name || 'Group Chat')
  const avatar = chatType === 'dm' ? receiver?.avatar : groupData?.avatar

  // Platforms that support verified badges in chat header
  const verifiedPlatforms = ['instagram', 'x', 'telegram']
  const showVerified = chatType === 'dm' && receiver?.verified && verifiedPlatforms.includes(theme.id)

  const VerifiedIcon = () => (
    <svg width="14" height="14" viewBox="0 0 22 22" fill="none" style={{ marginLeft: 4, flexShrink: 0 }}>
      <circle cx="11" cy="11" r="11" fill="#1D9BF0"/>
      <path d="M9.5 14.25L6.25 11L7.3 9.95L9.5 12.15L14.7 6.95L15.75 8L9.5 14.25Z" fill="white"/>
    </svg>
  )

  let statusText = ''
  if (chatType === 'dm') {
    statusText = theme.onlineText
  } else {
    if (theme.id === 'whatsapp') {
      statusText = people.map(p => p.name).join(', ')
    } else if (['discord', 'slack', 'telegram', 'teams'].includes(theme.id)) {
      statusText = `${people.length} members`
    } else if (theme.id === 'instagram') {
      statusText = 'Active now'
    } else {
      statusText = ''
    }
  }

  const isChannelStyle = theme.id === 'discord' || theme.id === 'slack'

  return (
    <div className={`chat-header chat-header-${theme.id}`} style={{ background: bgColor, color: textColor }}>
      <div className="chat-header-left">
        {!isChannelStyle && <BackButton platformId={theme.id} />}
        {isChannelStyle ? (
          <div className="chat-header-channel">
            <Hash size={20} strokeWidth={2.5} />
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
              <div className="chat-header-name-row">
                <span className="chat-header-name">{name}</span>
                {showVerified && <VerifiedIcon />}
              </div>
              {statusText && (
                <span className="chat-header-status" style={{
                  opacity: 0.7, fontSize: 11,
                  whiteSpace: 'nowrap', overflow: 'hidden',
                  textOverflow: 'ellipsis', maxWidth: '170px'
                }}>
                  {statusText}
                </span>
              )}
            </div>
          </>
        )}
      </div>
      <div className="chat-header-actions">
        <HeaderActions platformId={theme.id} chatType={chatType} />
      </div>
    </div>
  )
}

export default ChatHeader
