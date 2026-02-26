import { Menu, ChevronDown, PenSquare, Search, MoreHorizontal, Plus } from 'lucide-react'
import './AIStyles.css'

export default function AIChatHeader({ theme, isDark, model, person }) {
  const getLogo = () => {
    const selectedModelName = theme.models?.find(m => m.id === model)?.name || theme.name

    switch(theme.id) {
      case 'chatgpt':
        return (
          <div className="header-center" style={{ fontWeight: 600, fontSize: '16px', color: isDark ? '#ECECEC' : '#0D0D0D' }}>
            {theme.name} <span style={{ color: isDark ? '#B4B4B4' : '#676767', marginLeft: '4px' }}>{selectedModelName.replace('ChatGPT ', '')}</span>
            <ChevronDown size={14} style={{ marginLeft: '4px', color: isDark ? '#B4B4B4' : '#676767' }} />
          </div>
        )
      case 'claude':
        return (
          <div className="header-center" style={{ gap: '4px' }}>
            <span style={{ fontFamily: "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif", fontWeight: 500, fontSize: '15px' }}>{selectedModelName}</span>
            <ChevronDown size={14} className="text-muted" />
          </div>
        )
      case 'gemini':
        return (
          <div className="header-center" style={{ gap: '6px' }}>
            <span style={{ fontWeight: 500, fontSize: '16px' }}>Gemini</span>
            {selectedModelName.toLowerCase().includes('advanced') && (
              <span style={{ background: isDark ? '#282A2C' : '#E8F0FE', color: isDark ? '#A8C7FA' : '#0B57D0', fontSize: '11px', padding: '2px 8px', borderRadius: '12px', fontWeight: 500 }}>Advanced</span>
            )}
            {!selectedModelName.toLowerCase().includes('advanced') && (
               <span style={{ fontSize: '14px', color: isDark ? '#A8C7FA' : '#0B57D0', marginLeft: '2px' }}>{selectedModelName.replace('Gemini ', '')}</span>
            )}
            <ChevronDown size={14} className="text-muted" />
          </div>
        )
      case 'grok':
        return (
          <div className="header-center" style={{ gap: '4px' }}>
            <span style={{ fontWeight: 700, fontSize: '18px' }}>{selectedModelName}</span>
            <ChevronDown size={14} className="text-muted" />
          </div>
        )
      case 'perplexity':
        return (
          <div className="header-center" style={{ gap: '6px' }}>
            <span style={{ fontWeight: 600, fontSize: '16px' }}>{selectedModelName}</span>
            <ChevronDown size={14} className="text-muted" />
          </div>
        )
      default:
        return <span className="font-semibold">{theme.name}</span>
    }
  }

  return (
    <div className={`ai-header ${isDark ? 'dark' : ''}`} style={{
      background: isDark ? theme.headerBgDark : theme.headerBg,
      borderBottomColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
    }}>
      <div className="header-left">
        <Menu size={24} className="text-primary cursor-pointer" />
      </div>

      {getLogo()}

      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {theme.id === 'chatgpt' && <PenSquare size={22} color={isDark ? '#ECECEC' : '#0D0D0D'} strokeWidth={1.5} />}
        
        {/* Render User Avatar if provided, otherwise User Name Initial */}
        {['claude', 'gemini', 'perplexity'].includes(theme.id) && (
          person?.avatar ? (
            <div style={{ width: theme.id === 'gemini' ? '32px' : theme.id === 'perplexity' ? '30px' : '28px', height: theme.id === 'gemini' ? '32px' : theme.id === 'perplexity' ? '30px' : '28px', borderRadius: '50%', overflow: 'hidden' }}>
              <img src={person.avatar} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <>
              {theme.id === 'claude' && <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: isDark ? '#444' : '#E5E5E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: isDark ? '#FFF' : '#000' }}>{person?.name?.[0]?.toUpperCase() || 'U'}</div>}
              {theme.id === 'gemini' && <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A73E8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 500, fontSize: '14px' }}>{person?.name?.[0]?.toUpperCase() || 'U'}</div>}
              {theme.id === 'perplexity' && <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#22B8CD', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '14px' }}>{person?.name?.[0]?.toUpperCase() || 'U'}</div>}
            </>
          )
        )}
        
        {theme.id === 'grok' && <PenSquare size={20} color={isDark ? '#E7E9EA' : '#0F1419'} />}
      </div>
    </div>
  )
}
