import { Mic, Paperclip, ArrowUp, Camera, Headphones, Phone, CirclePlus, Globe } from 'lucide-react'
import './AIStyles.css'

export default function AIChatFooter({ theme, isDark }) {
  return (
    <div className={`ai-footer ${isDark ? 'dark' : ''}`} style={{
      background: isDark ? theme.footerBgDark : theme.footerBg,
      borderTopColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
    }}>
      <div className={`ai-input-container ${theme.id} ${isDark ? 'dark' : ''}`} style={{
        background: isDark ? theme.inputBgDark : theme.inputBg,
      }}>
        
        {theme.id === 'chatgpt' && (
          <button className="ai-btn-icon text-muted">
            <CirclePlus size={22} color={isDark ? '#ECECEC' : '#0D0D0D'} strokeWidth={1.5} />
          </button>
        )}
        
        {theme.id === 'claude' && (
          <button className="ai-btn-icon text-muted">
            <Paperclip size={20} color={isDark ? '#F2EFE8' : '#101010'} />
          </button>
        )}

        {theme.id === 'perplexity' && (
          <button className="ai-btn-icon text-muted" style={{ display: 'flex', alignItems: 'center', gap: '4px', background: isDark ? '#333' : '#F1F1F1', padding: '4px 10px', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold' }}>
            <Globe size={14} /> Focus
          </button>
        )}

        <div className="ai-input-wrapper">
          <input 
            type="text" 
            className="ai-input" 
            placeholder={theme.placeholder} 
            readOnly 
            style={{ 
              color: isDark ? 'white' : 'black',
            }}
          />
        </div>

        {theme.id === 'gemini' && (
          <>
            <button className="ai-btn-icon text-muted">
              <Mic size={20} color={isDark ? '#E3E3E3' : '#1F1F1F'} />
            </button>
            <button className="ai-btn-icon text-muted">
              <Camera size={20} color={isDark ? '#E3E3E3' : '#1F1F1F'} />
            </button>
          </>
        )}
        
        {/* Send Button */}
        {theme.id === 'chatgpt' && (
          <div className="ai-btn-icon">
            <Headphones size={22} color={isDark ? '#ECECEC' : '#0D0D0D'} strokeWidth={1.5} />
          </div>
        )}
        
        {theme.id === 'claude' && (
          <div className={`ai-send-btn`} style={{ width: '28px', height: '28px', background: isDark ? '#F2EFE8' : '#292521', color: isDark ? '#292521' : '#F2EFE8' }}>
            <ArrowUp size={16} strokeWidth={3} />
          </div>
        )}

        {theme.id === 'perplexity' && (
          <div className="ai-send-btn perplexity-send" style={{ background: '#22B8CD', width: '28px', height: '28px' }}>
            <ArrowUp size={16} strokeWidth={3} color="white" />
          </div>
        )}

        {theme.id === 'grok' && (
          <div className="ai-send-btn grok-send" style={{ background: isDark ? 'white' : 'black', color: isDark ? 'black' : 'white', width: '28px', height: '28px' }}>
            <ArrowUp size={16} strokeWidth={3} />
          </div>
        )}
      </div>
    </div>
  )
}
