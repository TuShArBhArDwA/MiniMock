import { forwardRef } from 'react'
import { Download } from 'lucide-react'
import './EmailStyles.css'

/**
 * Parses email body text and replaces **text** with redacted black bars.
 */
function renderRedactedBody(text) {
  if (!text) return null
  // Split by **...**  pattern
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2)
      return (
        <span key={i} className="redacted-text" title="Redacted">
          {inner}
        </span>
      )
    }
    return <span key={i}>{part}</span>
  })
}

function formatDateTime(datetimeStr) {
  if (!datetimeStr) return ''
  try {
    const d = new Date(datetimeStr)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const day = days[d.getDay()]
    const date = d.getDate()
    const month = months[d.getMonth()]
    const year = d.getFullYear()
    const hours = d.getHours()
    const minutes = d.getMinutes().toString().padStart(2, '0')
    const seconds = '00'
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const h12 = hours % 12 || 12
    return `${day}, ${date} ${month} ${year} ${h12}:${minutes}:${seconds} ${ampm} +0000`
  } catch {
    return datetimeStr
  }
}

function formatQuoteDate(datetimeStr) {
  if (!datetimeStr) return ''
  try {
    const d = new Date(datetimeStr)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = months[d.getMonth()]
    const date = d.getDate()
    const year = d.getFullYear()
    const hours = d.getHours()
    const minutes = d.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const h12 = hours % 12 || 12
    return `${month} ${date}, ${year}, at ${h12}:${minutes} ${ampm}`
  } catch {
    return datetimeStr
  }
}

function getDisplayName(participant, forHeader = false) {
  if (!participant) return 'Unknown'
  const name = participant.redactName
    ? '█'.repeat(Math.max(participant.name.length, 6))
    : participant.name
  const email = participant.redactEmail
    ? '█'.repeat(Math.max(participant.email.length, 10))
    : participant.email
  if (forHeader) {
    return `${name} <${email}>`
  }
  return { name, email }
}

function getRecipients(participants, senderId) {
  return participants
    .filter(p => p.id !== senderId)
    .map(p => {
      const display = getDisplayName(p, false)
      return `"${display.name}" <${display.email}>`
    })
    .join(', ')
}

/**
 * Recursive component to render nested email quotes.
 */
function NestedEmailQuote({ emails, participants, currentIndex }) {
  if (currentIndex >= emails.length) return null

  const email = emails[currentIndex]
  const sender = participants.find(p => p.id === email.fromId) || participants[0]
  if (!sender) return null

  const senderDisplay = getDisplayName(sender, false)

  return (
    <div className="email-quote-wrapper">
      <div className="email-quote-header">
        On {formatQuoteDate(email.datetime)}, {senderDisplay.name} &lt;<a href={`mailto:${senderDisplay.email}`} className="email-quote-link">{senderDisplay.email}</a>&gt; wrote:
      </div>
      <div className="email-quoted-block">
        <div className="email-quote-body">
          {(email.body || '').split('\n').map((line, i) => (
            <p key={i} className="email-body-line">
              {line === '' ? <br /> : renderRedactedBody(line)}
            </p>
          ))}
        </div>
        <NestedEmailQuote 
          emails={emails} 
          participants={participants} 
          currentIndex={currentIndex + 1} 
        />
      </div>
    </div>
  )
}

const EmailPreview = forwardRef(function EmailPreview(
  { subject, attachment, participants, emails, onDownload },
  ref
) {
  if (!emails.length) {
    return (
      <div className="preview-area">
        <div className="email-preview-wrapper" ref={ref}>
          <div className="email-preview-container">
            <div className="email-empty">
              <p>Add an email to the thread to see the preview.</p>
            </div>
          </div>
        </div>
        <button className="download-btn" onClick={onDownload}>
          <Download size={18} />
          Download
        </button>
      </div>
    )
  }

  // Latest email = last in array (newest at bottom of editor = top of preview)
  const latestEmail = emails[emails.length - 1]
  const latestSender = participants.find(p => p.id === latestEmail.fromId) || participants[0]

  // Older emails = all except the last, in reverse chronological order (for quoting)
  const olderEmails = emails.slice(0, -1).reverse()

  return (
    <div className="preview-area">
      <div className="email-preview-wrapper" ref={ref}>
        <div className="email-preview-container">

          {/* Latest email — full headers */}
          <div className="email-header-block">
            <div className="email-header-row">
              <span className="email-header-label">From:</span>
              <span className="email-header-value">{getDisplayName(latestSender, true)}</span>
            </div>
            <div className="email-header-row">
              <span className="email-header-label">To:</span>
              <span className="email-header-value">{getRecipients(participants, latestEmail.fromId)}</span>
            </div>
            <div className="email-header-row">
              <span className="email-header-label">Subject:</span>
              <span className="email-header-value">{subject || '(no subject)'}</span>
            </div>
            <div className="email-header-row">
              <span className="email-header-label">Date:</span>
              <span className="email-header-value">{formatDateTime(latestEmail.datetime)}</span>
            </div>
            {attachment && (
              <div className="email-header-row">
                <span className="email-header-label">Attachment:</span>
                <span className="email-header-value">
                  <a href="#" className="email-attachment-link" onClick={(e) => e.preventDefault()}>
                    {attachment}
                  </a>
                </span>
              </div>
            )}
          </div>

          <hr className="email-separator" />

          {/* Latest email body */}
          <div className="email-body">
            {(latestEmail.body || '').split('\n').map((line, i) => (
              <p key={i} className="email-body-line">
                {line === '' ? <br /> : renderRedactedBody(line)}
              </p>
            ))}
          </div>

          {/* Quoted older emails — threaded replies (Recursive) */}
          {olderEmails.length > 0 && (
            <NestedEmailQuote 
              emails={olderEmails} 
              participants={participants} 
              currentIndex={0} 
            />
          )}

        </div>
      </div>

      <button className="download-btn" onClick={onDownload}>
        <Download size={18} />
        Download
      </button>
    </div>
  )
})

export default EmailPreview
