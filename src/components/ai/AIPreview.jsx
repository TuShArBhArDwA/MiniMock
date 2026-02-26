import { forwardRef, useMemo } from 'react'
import { Download } from 'lucide-react'
import StatusBar from '../preview/StatusBar'
import AIChatHeader from './AIChatHeader'
import AIChatFooter from './AIChatFooter'
import AIChatBubble from './AIChatBubble'
import aiThemes from '../../themes/aiThemes.jsx'

const AIPreview = forwardRef(function AIPreview(
  { platform, model, person, messages, appearance, onDownload },
  ref
) {
  const isDark = appearance.darkMode
  const theme = aiThemes[platform]

  const previewStyle = useMemo(() => ({
    '--chat-bg': isDark ? theme.chatBgDark : theme.chatBg,
    '--header-bg': isDark ? theme.headerBgDark : theme.headerBg,
    '--header-text': isDark ? theme.headerTextDark : theme.headerText,
    '--user-bg': isDark ? theme.userBgDark : theme.userBg,
    '--user-text': isDark ? theme.userTextDark : theme.userText,
    '--ai-bg': isDark ? theme.aiBgDark : theme.aiBg,
    '--ai-text': isDark ? theme.aiTextDark : theme.aiText,
    '--input-bg': isDark ? theme.inputBgDark : theme.inputBg,
    '--footer-bg': isDark ? theme.footerBgDark : theme.footerBg,
    fontFamily: theme.font,
  }), [theme, isDark])

  return (
    <div className="preview-container">
      <div className="preview-wrapper">
        <div
          ref={ref}
          className={`preview-phone ${appearance.phoneFrame ? 'with-frame' : ''} ${appearance.transparentBg ? 'transparent-bg' : ''}`}
          style={previewStyle}
          data-platform={platform}
        >
          {appearance.statusBar && (
            <StatusBar
              time={appearance.statusBarTime}
              battery={appearance.battery}
              headerBg={isDark ? theme.headerBgDark : theme.headerBg}
            />
          )}
          
          {appearance.showHeader && (
            <AIChatHeader theme={theme} isDark={isDark} model={model} person={person} />
          )}

          <div className="preview-messages ai-messages">
            {messages.map((msg, index) => (
              <AIChatBubble
                key={msg.id}
                message={msg}
                theme={theme}
                isDark={isDark}
                isLast={index === messages.length - 1}
              />
            ))}
          </div>

          {appearance.showFooter && (
            <AIChatFooter theme={theme} isDark={isDark} />
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

export default AIPreview
