const posted = { type: 'hours', value: 1 };
const platform = 'whatsapp';

function getRelativeTime(posted, platform = 'instagram') {
    if (!posted || typeof posted !== 'object') {
        posted = { type: 'hours', value: 1, customText: '' }
    }

    if (posted.type === 'custom') {
        return posted.customText || ''
    }

    if (platform === 'whatsapp') {
        let offsetMs = 0
        if (posted.type === 'minutes') offsetMs = (posted.value || 1) * 60000
        else if (posted.type === 'hours') offsetMs = (posted.value || 1) * 3600000

        const date = new Date(Date.now() - offsetMs)
        const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })

        // WhatsApp Format: "Today, 14:30" or "Yesterday, 09:15"
        const nowDay = new Date().setHours(0, 0, 0, 0)
        const postedDay = new Date(date).setHours(0, 0, 0, 0)
        const diffDay = Math.round((nowDay - postedDay) / (1000 * 60 * 60 * 24))

        if (diffDay === 0) return `Today, ${timeStr}`
        if (diffDay === 1) return `Yesterday, ${timeStr}`
        return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${timeStr}`
    }

    // Instagram Format
    if (posted.type === 'now') return 'just now'
    if (posted.type === 'minutes') return `${posted.value || 1}m`
    if (posted.type === 'hours') return `${posted.value || 1}h`
    return 'just now'
}

console.log("Output is:", getRelativeTime(posted, platform));
