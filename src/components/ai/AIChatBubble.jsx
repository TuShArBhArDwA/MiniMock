import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ThumbsUp, ThumbsDown, Copy, RotateCcw, MoreVertical, Volume2, Share, SlidersHorizontal, ArrowRightLeft, BookOpen, Search } from 'lucide-react'
import './AIStyles.css'

export default function AIChatBubble({ message, theme, isDark, isLast }) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className={`ai-bubble-row user ${theme.id} ${isDark ? 'dark' : ''}`}>
        <div className="ai-bubble-content user-content">
          {message.image && (
             <img src={message.image} alt="User upload" style={{ maxWidth: '100%', borderRadius: '12px', marginBottom: message.text ? '8px' : '0' }} />
          )}
          {message.text}
        </div>
      </div>
    )
  }

  /* ───────────────────────────────────────────────
     AI Assistant Row
     Each platform re-creates its real mobile layout:
     • ChatGPT  – small logo left-aligned, text below
     • Claude   – logo + "Claude" label, text below
     • Gemini   – sparkle top-left, text below
     • Grok     – X logo top-left, text below
     • Perplexity – logo top-left, text below
     All use a tight flex-row with avatar pinned top-left
  ────────────────────────────────────────────── */

  const renderAvatar = () => (
    <div className={`ai-av ${theme.id}`}>
      {theme.brandSvg ? (
        <div style={{ 
          width: theme.id === 'gemini' ? 22 : theme.id === 'claude' ? 16 : 14, 
          height: theme.id === 'gemini' ? 22 : theme.id === 'claude' ? 16 : 14, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: theme.id === 'gemini' ? undefined : '#FFF' 
        }}>
          {theme.brandSvg}
        </div>
      ) : (
        <span className="text-white font-bold text-xs">{theme.name[0]}</span>
      )}
    </div>
  )

  // Only Gemini shows the avatar beside AI responses
  const showAvatar = theme.id === 'gemini'

  return (
    <div className={`ai-bubble-row assistant ${theme.id} ${isDark ? 'dark' : ''}`}>
      {/* Main response container */}
      <div className={`ai-response-row ${showAvatar ? '' : 'no-avatar'}`}>
        {showAvatar && (
          <div className="ai-avatar-col">
            {renderAvatar()}
          </div>
        )}
        <div className="ai-content-col">

          <div className="ai-bubble-content assistant-content markdown-body">
            {message.image && (
               <img src={message.image} alt="AI output" style={{ maxWidth: '100%', borderRadius: '12px', marginBottom: message.text ? '12px' : '0' }} />
            )}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.text}
            </ReactMarkdown>
          </div>

          {/* Action Row - Platform Specific */}
          <div className="ai-action-row">
            {theme.id === 'chatgpt' && (
              <>
                <button className="ai-action-btn"><Volume2 size={16} /></button>
                <button className="ai-action-btn"><Copy size={15} /></button>
                <button className="ai-action-btn"><RotateCcw size={15} /></button>
                <button className="ai-action-btn"><ThumbsDown size={15} /></button>
              </>
            )}
            
            {theme.id === 'claude' && (
              <>
                <button className="ai-action-btn"><Copy size={15} /></button>
                <button className="ai-action-btn"><RotateCcw size={15} /></button>
                <button className="ai-action-btn" style={{ marginLeft: '4px' }}><ThumbsUp size={15} /></button>
                <button className="ai-action-btn"><ThumbsDown size={15} /></button>
              </>
            )}

            {theme.id === 'gemini' && (
              <>
                <button className="ai-action-btn"><Volume2 size={16} /></button>
                <button className="ai-action-btn"><ThumbsUp size={16} /></button>
                <button className="ai-action-btn"><ThumbsDown size={16} /></button>
                <button className="ai-action-btn"><SlidersHorizontal size={15} /></button>
                <button className="ai-action-btn"><Share size={15} /></button>
                <button className="ai-action-btn"><MoreVertical size={16} /></button>
              </>
            )}

            {theme.id === 'grok' && (
              <>
                <button className="ai-action-btn"><Volume2 size={16} /></button>
                <button className="ai-action-btn"><Copy size={15} /></button>
                <button className="ai-action-btn"><ThumbsUp size={15} /></button>
                <button className="ai-action-btn"><ThumbsDown size={15} /></button>
                <button className="ai-action-btn"><RotateCcw size={15} /></button>
                <button className="ai-action-btn"><Share size={15} /></button>
              </>
            )}

            {theme.id === 'perplexity' && (
              <>
                <button className="ai-action-btn" style={{ background: isDark ? '#2D2D2D' : '#F1F1F1', padding: '4px 8px', borderRadius: '16px', display: 'flex', gap: '4px', fontSize: '11px', fontWeight: 600 }}>
                  <BookOpen size={13} /> Sources
                </button>
                <button className="ai-action-btn"><Copy size={15} /></button>
                <button className="ai-action-btn"><Share size={15} /></button>
                <button className="ai-action-btn"><RotateCcw size={15} /></button>
                <button className="ai-action-btn"><MoreVertical size={15} /></button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
