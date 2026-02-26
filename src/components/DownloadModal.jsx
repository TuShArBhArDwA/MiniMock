import { useState, useEffect } from 'react'
import { X, ImageDown } from 'lucide-react'
import './DownloadModal.css'

function DownloadModal({ isOpen, onClose, onDownload, defaultFileName }) {
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    if (isOpen) {
      setFileName(defaultFileName)
    }
  }, [isOpen, defaultFileName])

  if (!isOpen) return null

  const handleDownload = () => {
    onDownload(fileName || defaultFileName)
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleDownload()
    if (e.key === 'Escape') onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Download mockup</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <label className="modal-label">File name</label>
          <div className="modal-input-wrapper">
            <input
              type="text"
              className="modal-input"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <span className="modal-input-ext">.png</span>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-download-btn" onClick={handleDownload}>
            <ImageDown size={16} />
            Download image
          </button>
        </div>
      </div>
    </div>
  )
}

export default DownloadModal
