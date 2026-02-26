import { forwardRef, useMemo } from 'react'
import { Download } from 'lucide-react'
import StatusBar from './preview/StatusBar'
import ChatHeader from './preview/ChatHeader'
import ChatBubble from './preview/ChatBubble'
import ChatFooterPreview from './preview/ChatFooter'
import './ChatPreview.css'

const ChatPreview = forwardRef(function ChatPreview(
  { theme, people, messages, appearance, chatType, onDownload },
  ref
) {
  const isDark = appearance.darkMode

  const previewStyle = useMemo(() => ({
    '--chat-bg': isDark ? theme.chatBgDark : theme.chatBg,
    '--header-bg': isDark ? theme.headerBgDark : theme.headerBg,
    '--header-text': isDark ? (theme.headerTextDark || theme.headerText) : theme.headerText,
    '--bubble-sent-bg': isDark ? theme.bubbleSentDark : theme.bubbleSent,
    '--bubble-sent-text': isDark ? theme.bubbleSentTextDark : theme.bubbleSentText,
    '--bubble-received-bg': isDark ? theme.bubbleReceivedDark : theme.bubbleReceived,
    '--bubble-received-text': isDark ? theme.bubbleReceivedTextDark : theme.bubbleReceivedText,
    '--bubble-radius': theme.bubbleRadius,
    '--timestamp-color': isDark ? theme.timestampColorDark : theme.timestampColor,
    '--input-bg': isDark ? theme.inputBgDark : theme.inputBg,
    '--footer-bg': isDark ? theme.footerBgDark : theme.footerBg,
    '--status-read': theme.statusRead,
    '--status-delivered': theme.statusDelivered,
    '--status-sent': theme.statusSent,
    fontFamily: theme.font,
  }), [theme, isDark])

  // Determine receiver (for DM header)
  const receiver = chatType === 'dm'
    ? people.find(p => p.role === 'receiver') || people[1]
    : null

  return (
    <div className="preview-container">
      <div className="preview-wrapper">
        <div
          ref={ref}
          className={`preview-phone ${appearance.phoneFrame ? 'with-frame' : ''} ${appearance.transparentBg ? 'transparent-bg' : ''}`}
          style={previewStyle}
          data-platform={theme.id}
        >
          {appearance.statusBar && (
            <StatusBar
              time={appearance.statusBarTime}
              battery={appearance.battery}
              theme={theme}
              isDark={isDark}
            />
          )}
          {appearance.showHeader && (
            <ChatHeader
              theme={theme}
              isDark={isDark}
              chatType={chatType}
              people={people}
              receiver={receiver}
            />
          )}
          <div className="preview-messages">
            {messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg}
                people={people}
                theme={theme}
                isDark={isDark}
                timeFormat={appearance.timeFormat}
              />
            ))}
          </div>
          {appearance.showFooter && (
            <ChatFooterPreview theme={theme} isDark={isDark} />
          )}
        </div>
      </div>
      <button className="btn-download" onClick={onDownload}>
        <Download size={16} />
        Download
      </button>
    </div>
  )
})

export default ChatPreview
