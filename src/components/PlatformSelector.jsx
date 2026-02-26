import { useState } from 'react'
import { Smartphone, ChevronDown } from 'lucide-react'
import './PlatformSelector.css'

const platforms = [
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬' },
  { id: 'instagram', name: 'Instagram', icon: '📷' },
  { id: 'discord', name: 'Discord', icon: '🎮' },
  { id: 'x', name: 'X', icon: '𝕏' },
  { id: 'teams', name: 'Microsoft Teams', icon: '🟪' },
  { id: 'slack', name: 'Slack', icon: '#️⃣' },
  { id: 'snapchat', name: 'Snapchat', icon: '👻' },
  { id: 'telegram', name: 'Telegram', icon: '✈️' },
  { id: 'reddit', name: 'Reddit', icon: '🤖' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
]

function PlatformSelector({ platform, setPlatform }) {
  const [open, setOpen] = useState(true)
  const selected = platforms.find(p => p.id === platform)

  return (
    <div className="section">
      <div className="section-header" onClick={() => setOpen(!open)}>
        <div className="section-header-left">
          <Smartphone size={16} />
          <span>App</span>
          <span className="section-selected">{selected?.name}</span>
        </div>
        <ChevronDown size={16} className={`section-toggle ${open ? 'open' : ''}`} />
      </div>
      {open && (
        <div className="section-content">
          <div className="platform-grid">
            {platforms.map((p) => (
              <button
                key={p.id}
                className={`platform-btn ${platform === p.id ? 'active' : ''}`}
                onClick={() => setPlatform(p.id)}
              >
                <span className="platform-icon">{p.icon}</span>
                <span className="platform-name">{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PlatformSelector
