import {
  Smile, Mic, Send, Camera, Paperclip, Plus,
  Heart, Image, Gift, ImagePlus, IndianRupee,
  Sticker, AtSign
} from 'lucide-react'
import './ChatFooter.css'

function ChatFooterPreview({ theme, isDark, chatType }) {
  const bgColor = isDark ? theme.footerBgDark : theme.footerBg
  const inputBg = isDark ? theme.inputBgDark : theme.inputBg
  const mutedColor = isDark ? '#999' : '#999'
  const iconStyle = { color: mutedColor, opacity: 0.5, flexShrink: 0 }
  const platformId = theme.id

  const renderFooter = () => {
    switch (platformId) {
      case 'whatsapp':
        return (
          <div className="chat-footer-inner">
            <div className="chat-input-fake chat-input-pill" style={{ background: inputBg, gap: '10px' }}>
              <Smile size={24} style={{ color: mutedColor, opacity: 0.6, flexShrink: 0 }} />
              <span style={{ flex: 1, color: mutedColor, opacity: 0.6, fontSize: 16 }}>Message</span>
              <Paperclip size={22} style={{ color: mutedColor, opacity: 0.6, flexShrink: 0 }} />
              <IndianRupee size={21} style={{ color: mutedColor, opacity: 0.6, flexShrink: 0 }} />
              <Camera size={22} style={{ color: mutedColor, opacity: 0.6, flexShrink: 0 }} />
            </div>
            <div className="chat-footer-send-circle" style={{ background: '#00a884', width: '46px', height: '46px' }}>
              <Mic size={22} style={{ color: '#111b21' }} />
            </div>
          </div>
        )

      case 'instagram':
        return (
          <div className="chat-footer-inner">
            <div className="chat-footer-icon-btn" style={{ background: isDark ? '#262626' : '#efefef', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Camera size={20} style={{ color: isDark ? '#fff' : '#262626' }} />
            </div>
            <div className="chat-input-fake chat-input-pill" style={{ background: inputBg, border: isDark ? '1px solid #363636' : '1px solid #dbdbdb' }}>
              <span style={{ flex: 1, color: mutedColor, opacity: 0.6, fontSize: 14 }}>Message...</span>
              <Mic size={20} style={iconStyle} />
              <Image size={20} style={iconStyle} />
              <Sticker size={20} style={iconStyle} />
            </div>
          </div>
        )

      case 'discord':
        return (
          <div className="chat-footer-inner">
            <div className="chat-input-fake chat-input-rect" style={{ background: '#40444b', borderRadius: '8px' }}>
              <Plus size={22} style={{ color: '#b9bbbe', opacity: 0.7, flexShrink: 0 }} />
              <span style={{ flex: 1, color: '#72767d', fontSize: 15 }}>Message #{chatType === 'group' ? 'general' : 'chat'}</span>
              <Gift size={20} style={{ color: '#b9bbbe', opacity: 0.7, flexShrink: 0 }} />
              <Smile size={20} style={{ color: '#b9bbbe', opacity: 0.7, flexShrink: 0 }} />
            </div>
          </div>
        )

      case 'x':
        return (
          <div className="chat-footer-inner">
            <div className="chat-input-fake chat-input-pill" style={{ background: inputBg, border: isDark ? '1px solid #38444d' : '1px solid #cfd9de' }}>
              <Image size={20} style={{ color: '#1d9bf0', flexShrink: 0 }} />
              <span style={{ flex: 1, color: mutedColor, opacity: 0.6, fontSize: 14 }}>Start a new message</span>
            </div>
            <Send size={20} style={{ color: '#1d9bf0', flexShrink: 0 }} />
          </div>
        )

      case 'teams':
        return (
          <div className="chat-footer-inner">
            <div className="chat-input-fake chat-input-rect" style={{ background: inputBg, border: isDark ? '1px solid #3b3a39' : '1px solid #edebe9', borderRadius: '6px' }}>
              <span style={{ flex: 1, color: mutedColor, opacity: 0.5, fontSize: 14 }}>Type a new message</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Smile size={20} style={iconStyle} />
              <Paperclip size={20} style={iconStyle} />
              <Sticker size={20} style={iconStyle} />
            </div>
          </div>
        )

      case 'slack':
        return (
          <div className="chat-footer-inner">
            <div className="chat-input-fake chat-input-rect" style={{ background: inputBg, border: isDark ? '1px solid #49494e' : '1px solid #868686', borderRadius: '8px' }}>
              <Plus size={18} style={{ ...iconStyle, opacity: 0.7 }} />
              <span style={{ flex: 1, color: isDark ? '#ababad' : '#616061', fontSize: 14 }}>Message #{chatType === 'group' ? 'general' : 'chat'}</span>
              <AtSign size={18} style={{ ...iconStyle, opacity: 0.7 }} />
              <Smile size={18} style={{ ...iconStyle, opacity: 0.7 }} />
            </div>
          </div>
        )

      case 'snapchat':
        return (
          <div className="chat-footer-inner">
            <Camera size={28} style={{ color: isDark ? '#fff' : '#000', flexShrink: 0 }} />
            <div className="chat-input-fake chat-input-pill" style={{ background: inputBg, border: '1px solid #ddd' }}>
              <span style={{ flex: 1, color: mutedColor, fontSize: 14 }}>Send a chat</span>
            </div>
            <Mic size={24} style={{ color: isDark ? '#fff' : '#000', flexShrink: 0 }} />
            <Smile size={24} style={{ color: isDark ? '#fff' : '#000', flexShrink: 0 }} />
          </div>
        )

      case 'telegram':
        return (
          <div className="chat-footer-inner">
            <Smile size={24} style={{ color: mutedColor, opacity: 0.5, flexShrink: 0 }} />
            <div className="chat-input-fake chat-input-rect" style={{ background: inputBg, borderRadius: '20px' }}>
              <span style={{ flex: 1, color: mutedColor, opacity: 0.5, fontSize: 15 }}>Message</span>
              <Paperclip size={22} style={{ color: mutedColor, opacity: 0.5, flexShrink: 0 }} />
            </div>
            <Mic size={24} style={{ color: mutedColor, opacity: 0.5, flexShrink: 0 }} />
          </div>
        )

      case 'reddit':
        return (
          <div className="chat-footer-inner">
            <div className="chat-input-fake chat-input-pill" style={{ background: inputBg, border: isDark ? '1px solid #343536' : '1px solid #edeff1' }}>
              <span style={{ flex: 1, color: mutedColor, opacity: 0.5, fontSize: 14 }}>Message</span>
            </div>
            <Send size={20} style={{ color: '#ff4500', flexShrink: 0 }} />
          </div>
        )

      case 'linkedin':
        return (
          <div className="chat-footer-inner">
            <div className="chat-input-fake chat-input-rect" style={{ background: inputBg, border: isDark ? '1px solid #3a3a3a' : '1px solid #c0c0c0', borderRadius: '8px' }}>
              <Plus size={20} style={iconStyle} />
              <span style={{ flex: 1, color: mutedColor, opacity: 0.6, fontSize: 14 }}>Write a message...</span>
              <Smile size={20} style={iconStyle} />
              <ImagePlus size={20} style={iconStyle} />
            </div>
            <Send size={20} style={{ color: '#0a66c2', flexShrink: 0 }} />
          </div>
        )

      default:
        return (
          <div className="chat-footer-inner">
            <Smile size={22} style={iconStyle} />
            <div className="chat-input-fake chat-input-pill" style={{ background: inputBg }}>
              <span style={{ flex: 1, color: mutedColor, opacity: 0.5, fontSize: 14 }}>Type a message</span>
            </div>
            <Mic size={22} style={iconStyle} />
          </div>
        )
    }
  }

  return (
    <div className={`chat-footer-preview chat-footer-${platformId}`} style={{ background: bgColor }}>
      {renderFooter()}
    </div>
  )
}

export default ChatFooterPreview
