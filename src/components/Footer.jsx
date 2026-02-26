import { Coffee } from 'lucide-react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="footer-brand">MiniMock</span>
        <span className="footer-tagline">Instant chat mockups. No data saved. No watermark. Easy to use.</span>
      </div>
      <div className="footer-center">
        <a
          href="https://buymeacoffee.com/tusharbhardwaj"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-coffee"
        >
          <Coffee size={14} />
          <span>Fuel Mini Anon's late-night coding</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
