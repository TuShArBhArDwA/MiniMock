import './StatusBar.css'

// Calculate whether a hex color is light or dark
function isLightColor(hex) {
  if (!hex) return false
  const c = hex.replace('#', '')
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  // Using perceived luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5
}

function StatusBar({ time, battery, headerBg }) {
  // Auto detect: light header → black icons, dark header → white icons
  const textColor = isLightColor(headerBg) ? '#000000' : '#ffffff'

  return (
    <div className="status-bar" style={{ color: textColor, background: headerBg }}>
      <span className="status-time">{time}</span>
      <div className="status-right">
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill="currentColor" opacity="0.4"/>
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="currentColor"/>
          <rect x="9" y="2" width="3" height="10" rx="0.5" fill="currentColor"/>
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="currentColor"/>
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 10.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" fill="currentColor" transform="translate(0,-2)"/>
          <path d="M4.5 8.5C5.5 7 6.5 6.5 8 6.5s2.5.5 3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M2 5.5C3.5 3 5.5 2 8 2s4.5 1 6 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
        {/* Battery */}
        <div className="status-battery">
          <div className="battery-shell">
            <div
              className="battery-fill"
              style={{ width: `${Math.min(Math.max(battery, 0), 100)}%` }}
            />
          </div>
          <div className="battery-tip" />
        </div>
      </div>
    </div>
  )
}

export default StatusBar
