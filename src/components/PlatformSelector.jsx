import { useState } from 'react'
import { Smartphone, ChevronDown } from 'lucide-react'
import {
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconBrandDiscordFilled,
  IconBrandX,
  IconBrandTeams,
  IconBrandSlack,
  IconBrandSnapchat,
  IconBrandTelegram,
  IconBrandReddit,
  IconBrandLinkedin
} from '@tabler/icons-react'
import './PlatformSelector.css'

const platforms = [
  { id: 'whatsapp', name: 'WhatsApp', icon: <IconBrandWhatsapp stroke={1.5} size={20} className="platform-icon-svg" /> },
  { id: 'instagram', name: 'Instagram', icon: <IconBrandInstagram stroke={1.5} size={20} className="platform-icon-svg" /> },
  { id: 'discord', name: 'Discord', icon: <IconBrandDiscordFilled size={20} className="platform-icon-svg" /> },
  { id: 'x', name: 'X', icon: <IconBrandX stroke={1.5} size={20} className="platform-icon-svg" /> },
  { id: 'teams', name: 'Microsoft Teams', icon: <IconBrandTeams stroke={1.5} size={20} className="platform-icon-svg" /> },
  { id: 'slack', name: 'Slack', icon: <IconBrandSlack stroke={1.5} size={20} className="platform-icon-svg" /> },
  { id: 'snapchat', name: 'Snapchat', icon: <IconBrandSnapchat stroke={1.5} size={20} className="platform-icon-svg" /> },
  { id: 'telegram', name: 'Telegram', icon: <IconBrandTelegram stroke={1.5} size={20} className="platform-icon-svg" /> },
  { id: 'reddit', name: 'Reddit', icon: <IconBrandReddit stroke={1.5} size={20} className="platform-icon-svg" /> },
  { id: 'linkedin', name: 'LinkedIn', icon: <IconBrandLinkedin stroke={1.5} size={20} className="platform-icon-svg" /> },
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
