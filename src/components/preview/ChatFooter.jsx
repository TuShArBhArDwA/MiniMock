import { Smile, Send, Mic } from 'lucide-react'
import './ChatFooter.css'

function ChatFooterPreview({ theme, isDark }) {
  const bgColor = isDark ? theme.footerBgDark : theme.footerBg
  const inputBg = isDark ? theme.inputBgDark : theme.inputBg
  const textColor = isDark ? (theme.headerTextDark || '#999') : '#999'

  return (
    <div className="chat-footer-preview" style={{ background: bgColor }}>
      <div className="chat-footer-inner">
        <Smile size={22} style={{ color: textColor, opacity: 0.5, flexShrink: 0 }} />
        <div className="chat-input-fake" style={{ background: inputBg }}>
          <span style={{ color: textColor, opacity: 0.5 }}>Type a message</span>
        </div>
        <Mic size={22} style={{ color: textColor, opacity: 0.5, flexShrink: 0 }} />
      </div>
    </div>
  )
}

export default ChatFooterPreview
