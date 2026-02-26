import { useState } from 'react'
import { Settings, ChevronDown, Moon, Eye, Smartphone, Clock, Battery } from 'lucide-react'
import './AppearanceSection.css'

function AppearanceSection({ appearance, setAppearance }) {
  const [open, setOpen] = useState(true)

  const update = (key, value) => {
    setAppearance(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="section">
      <div className="section-header" onClick={() => setOpen(!open)}>
        <div className="section-header-left">
          <Settings size={16} />
          <span>Appearance</span>
        </div>
        <ChevronDown size={16} className={`section-toggle ${open ? 'open' : ''}`} />
      </div>
      {open && (
        <div className="section-content appearance-content">
          {/* Theme */}
          <div className="form-sublabel">Theme</div>

          <div className="form-row">
            <span className="form-label">Mockup dark mode</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={appearance.darkMode}
                onChange={(e) => update('darkMode', e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="form-row">
            <span className="form-label">Transparent background</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={appearance.transparentBg}
                onChange={(e) => update('transparentBg', e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="form-row">
            <span className="form-label">Time format</span>
            <select
              className="select"
              value={appearance.timeFormat}
              onChange={(e) => update('timeFormat', e.target.value)}
            >
              <option value="12">12-hour</option>
              <option value="24">24-hour</option>
            </select>
          </div>

          {/* Layout */}
          <div className="form-sublabel">Layout</div>

          <div className="form-row">
            <span className="form-label">Show header</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={appearance.showHeader}
                onChange={(e) => update('showHeader', e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="form-row">
            <span className="form-label">Show footer</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={appearance.showFooter}
                onChange={(e) => update('showFooter', e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          {/* Device */}
          <div className="form-sublabel">Device</div>

          <div className="form-row">
            <span className="form-label">Phone frame</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={appearance.phoneFrame}
                onChange={(e) => update('phoneFrame', e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="form-row">
            <span className="form-label">Status bar</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={appearance.statusBar}
                onChange={(e) => update('statusBar', e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          {/* Status Bar */}
          {appearance.statusBar && (
            <>
              <div className="form-sublabel">Status Bar</div>

              <div className="form-row">
                <span className="form-label">
                  <Clock size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                  Time
                </span>
                <input
                  className="input input-small"
                  value={appearance.statusBarTime}
                  onChange={(e) => update('statusBarTime', e.target.value)}
                />
              </div>

              <div className="form-row">
                <span className="form-label">
                  <Battery size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                  Battery
                </span>
                <div className="battery-input">
                  <input
                    type="number"
                    className="input input-small"
                    min={0}
                    max={100}
                    value={appearance.battery}
                    onChange={(e) => update('battery', parseInt(e.target.value) || 0)}
                  />
                  <span className="battery-pct">%</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default AppearanceSection
