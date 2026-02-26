import {
  Smile, Mic, Send, Camera, Paperclip, Plus,
  Heart, Image, Gift, Sticker, ImagePlus
} from 'lucide-react'
import './ChatFooter.css'

function ChatFooterPreview({ theme, isDark, chatType }) {
  const bgColor = isDark ? theme.footerBgDark : theme.footerBg
  const inputBg = isDark ? theme.inputBgDark : theme.inputBg
  const mutedColor = isDark ? (theme.headerTextDark || '#999') : '#999'
  const iconStyle = { color: mutedColor, opacity: 0.5, flexShrink: 0 }
  const platformId = theme.id

  const renderFooter = () => {
    switch (platformId) {
      case 'whatsapp':
        return (
          <div className="chat-footer-inner">
            <div className="chat-input-fake chat-input-pill" style={{ background: inputBg }}>
              <Smile size={20} style={iconStyle} />
              <span style={{ flex: 1, color: mutedColor, opacity: 0.5, fontSize: 14 }}>Type a message</span>
              <Paperclip size={20} style={iconStyle} />
              <Camera size={20} style={iconStyle} />
            </div>
            <div className="chat-footer-send-circle" style={{ background: isDark ? '#005c4b' : '#075e54' }}>
              <Mic size={20} style={{ color: '#fff' }} />
            </div>
          </div>
        )

      case 'instagram':
        return (
          <div className="chat-footer-inner">
            <Camera size={22} style={iconStyle} />
            <div className="chat-input-fake chat-input-pill" style={{ background: inputBg }}>
              <span style={{ flex: 1, color: mutedColor, opacity: 0.5, fontSize: 14 }}>Message...</span>
            </div>
            <Heart size={22} style={iconStyle} />
          </div>
        )

      case 'discord':
        return (
          <div className="chat-footer-inner">
            <Plus size={20} style={{ ...iconStyle, opacity: 0.7 }} />
            <div className="chat-input-fake chat-input-rect" style={{ background: inputBg }}>
              <span style={{ flex: 1, color: '#72767d', fontSize: 14 }}>Message #{chatType === 'group' ? 'general' : 'chat'}</span>
              <Smile size={20} style={{ ...iconStyle, opacity: 0.7 }} />
              <Gift size={20} style={{ ...iconStyle, opacity: 0.7 }} />
            </div>
          </div>
        )

      case 'x':
        return (
          <div className="chat-footer-inner">
            <div className="chat-input-fake chat-input-pill" style={{ background: inputBg }}>
              <span style={{ flex: 1, color: mutedColor, opacity: 0.5, fontSize: 14 }}>Start a new message</span>
              <Image size={18} style={iconStyle} />
            </div>
          </div>
        )

      case 'teams':
        return (
          <div className="chat-footer-inner">
            <div className="chat-input-fake chat-input-rect" style={{ background: inputBg }}>
              <span style={{ flex: 1, color: mutedColor, opacity: 0.5, fontSize: 14 }}>Type a new message</span>
              <Smile size={18} style={iconStyle} />
            </div>
            <Send size={18} style={iconStyle} />
          </div>
        )

      case 'slack':
        return (
          <div className="chat-footer-inner">
            <div className="chat-input-fake chat-input-rect" style={{ background: inputBg, border: '1px solid rgba(128,128,128,0.2)' }}>
              <Plus size={18} style={iconStyle} />
              <span style={{ flex: 1, color: mutedColor, opacity: 0.5, fontSize: 14 }}>Message #{chatType === 'group' ? 'general' : 'chat'}</span>
              <Smile size={18} style={iconStyle} />
            </div>
          </div>
        )

      case 'snapchat':
        return (
          <div className="chat-footer-inner">
            <Camera size={22} style={iconStyle} />
            <div className="chat-input-fake chat-input-pill" style={{ background: inputBg }}>
              <span style={{ flex: 1, color: mutedColor, opacity: 0.5, fontSize: 14 }}>Send a chat</span>
            </div>
            <Send size={18} style={iconStyle} />
          </div>
        )

      case 'telegram':
        return (
          <div className="chat-footer-inner">
            <Paperclip size={20} style={iconStyle} />
            <div className="chat-input-fake chat-input-rect" style={{ background: inputBg }}>
              <span style={{ flex: 1, color: mutedColor, opacity: 0.5, fontSize: 14 }}>Message</span>
              <Smile size={20} style={iconStyle} />
            </div>
            <Mic size={20} style={iconStyle} />
          </div>
        )

      case 'reddit':
        return (
          <div className="chat-footer-inner">
            <div className="chat-input-fake chat-input-pill" style={{ background: inputBg }}>
              <span style={{ flex: 1, color: mutedColor, opacity: 0.5, fontSize: 14 }}>Message</span>
            </div>
            <Send size={18} style={iconStyle} />
          </div>
        )

      case 'linkedin':
        return (
          <div className="chat-footer-inner">
            <div className="chat-input-fake chat-input-rect" style={{ background: inputBg, border: '1px solid rgba(128,128,128,0.2)' }}>
              <Plus size={18} style={iconStyle} />
              <span style={{ flex: 1, color: mutedColor, opacity: 0.5, fontSize: 14 }}>Write a message...</span>
              <Smile size={18} style={iconStyle} />
              <ImagePlus size={18} style={iconStyle} />
            </div>
            <Send size={18} style={iconStyle} />
          </div>
        )

      default:
        return (
          <div className="chat-footer-inner">
            <Smile size={22} style={iconStyle} />
            <div className="chat-input-fake chat-input-pill" style={{ background: inputBg }}>
              <span style={{ color: mutedColor, opacity: 0.5 }}>Type a message</span>
            </div>
            <Mic size={22} style={iconStyle} />
          </div>
        )
    }
  }

  return (
    <div className="chat-footer-preview" style={{ background: bgColor }}>
      {renderFooter()}
    </div>
  )
}

export default ChatFooterPreview
