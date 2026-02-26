// AI Platform Themes Definition

const aiThemes = {
    chatgpt: {
        id: 'chatgpt',
        name: 'ChatGPT',
        font: "'Söhne', 'Inter', -apple-system, sans-serif",

        // Light Mode
        chatBg: '#FFFFFF',
        headerBg: '#FFFFFF',
        headerText: '#0D0D0D',
        userBg: '#F4F4F4',
        userText: '#0D0D0D',
        aiBg: 'transparent',
        aiText: '#0D0D0D',
        inputBg: '#F4F4F4',
        footerBg: '#FFFFFF',

        // Dark Mode
        chatBgDark: '#212121',
        headerBgDark: '#212121',
        headerTextDark: '#ECECEC',
        userBgDark: '#2F2F2F',
        userTextDark: '#ECECEC',
        aiBgDark: 'transparent',
        aiTextDark: '#D1D5DB',
        inputBgDark: '#2F2F2F',
        footerBgDark: '#212121',

        // Branding Elements
        aiLogo: 'chatgpt',
        brandColor: '#10a37f',
        brandSvg: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="platform-icon-svg" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.073zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.5963 3.8558L12.5973 8.3829l2.0201-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4052-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.6067 1.4998-2.6022-1.4998z" />
            </svg>
        ),
        placeholder: 'Message ChatGPT',
        models: [
            { id: 'gpt-4o', name: 'GPT-4o' },
            { id: 'gpt-4', name: 'GPT-4' },
            { id: 'gpt-3.5', name: 'GPT-3.5' }
        ]
    },
    claude: {
        id: 'claude',
        name: 'Claude',
        font: "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif",

        // Light Mode
        chatBg: '#FAF9F5',
        headerBg: '#FAF9F5',
        headerText: '#101010',
        userBg: '#EFEDE5',
        userText: '#101010',
        aiBg: 'transparent',
        aiText: '#101010',
        inputBg: '#F5F4EF',
        footerBg: '#FAF9F5',

        // Dark Mode
        chatBgDark: '#2B2A27',
        headerBgDark: '#2B2A27',
        headerTextDark: '#F2EFE8',
        userBgDark: '#3D3C37',
        userTextDark: '#F2EFE8',
        aiBgDark: 'transparent',
        aiTextDark: '#D1D0C5',
        inputBgDark: '#3A3935',
        footerBgDark: '#2B2A27',

        // Branding Elements
        aiLogo: 'claude',
        brandColor: '#D97757',
        brandSvg: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="platform-icon-svg" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.709 13.676l3.156-1.771.053-.154-.053-.085-.154 0-.527-.033-1.803-.049-1.564-.065-1.515-.081-.381-.081-.357-.471.037-.235.32-.216.459.04 1.015.069 1.523.105 1.104.065 1.636.17h.26l.037-.105-.089-.065-.069-.065-1.576-1.068-1.706-1.128-.894-.65-.483-.329-.244-.309-.105-.673.439-.483.589.04.15.04.597.459 1.275.987 1.664 1.226.244.203.097-.069.012-.049-.109-.183-.906-1.636-.966-1.664-.43-.69-.114-.414c-.04-.17-.069-.313-.069-.487l.499-.678.276-.089.666.089.281.244.414.947.67 1.49 1.04 2.027.304.601.163.557.061.17.105 0v-.097l.085-1.141.158-1.401.154-1.803.053-.508.251-.609.499-.329.39.186.321.459-.044.297-.191 1.239-.374 1.941-.244 1.299h.142l.163-.163.657-.873 1.104-1.381.487-.548.569-.605.365-.288.69 0 .508.755-.227.78-.71.901-.589.764-.845 1.137-.527.91.049.072.126-.012 1.909-.406 1.031-.186 1.23-.211.557.26.061.264-.219.54-1.316.325-1.543.308-2.298.544-.028.021.032.04 1.035.097.443.024h1.084l2.019.15.527.349.316.427-.053.325-.812.414-1.096-.26-2.558-.609-.878-.219-.121 0v.072l.731.715 1.34 1.21 1.678 1.56.085.386-.216.304-.227-.032-1.474-1.109-.569-.499-1.288-1.084-.085 0v.114l.297.434 1.567 2.355.081.722-.114.235-.406.142-.446-.081-.917-1.287-.947-1.45-.764-1.299-.093.053-.45 4.853-.211.248-.487.186-.406-.309-.216-.499.216-.987.26-1.288.211-1.023.191-1.272.114-.422-.008-.028-.093.012-.958 1.316-1.458 1.97-1.153 1.235-.276.109-.479-.248.044-.443.268-.394 1.596-2.031.963-1.259.622-.727-.004-.105h-.037l-4.24 2.753-.755.097-.325-.304.04-.499.154-.163 1.275-.878-.004.004.001.005z" />
            </svg>
        ),
        placeholder: 'Message Claude...',
        models: [
            { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' },
            { id: 'claude-3-opus', name: 'Claude 3 Opus' },
            { id: 'claude-3-haiku', name: 'Claude 3 Haiku' }
        ]
    },
    gemini: {
        id: 'gemini',
        name: 'Gemini',
        font: "'Google Sans', 'Inter', sans-serif",

        // Light Mode
        chatBg: '#FFFFFF',
        headerBg: '#FFFFFF',
        headerText: '#1F1F1F',
        userBg: '#F0F4F9',
        userText: '#1F1F1F',
        aiBg: 'transparent',
        aiText: '#1F1F1F',
        inputBg: '#F0F4F9',
        footerBg: '#FFFFFF',

        // Dark Mode
        chatBgDark: '#131314',
        headerBgDark: '#131314',
        headerTextDark: '#E3E3E3',
        userBgDark: '#282A2C',
        userTextDark: '#E3E3E3',
        aiBgDark: 'transparent',
        aiTextDark: '#C4C7C5',
        inputBgDark: '#1E1F20',
        footerBgDark: '#131314',

        // Branding Elements
        aiLogo: 'gemini',
        brandColor: '#4285F4',
        brandSvg: (
            <svg width="24" height="24" viewBox="0 0 65 65" fill="none" className="platform-icon-svg" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="geminiGrad" x1="18.447" y1="43.42" x2="52.153" y2="15.004" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#4893FC"/>
                        <stop offset="0.27" stopColor="#4893FC"/>
                        <stop offset="0.777" stopColor="#969DFF"/>
                        <stop offset="1" stopColor="#BD99FE"/>
                    </linearGradient>
                </defs>
                <path d="M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z" fill="url(#geminiGrad)"/>
            </svg>
        ),
        placeholder: 'Ask Gemini',
        models: [
            { id: 'gemini-advanced', name: 'Gemini Advanced' },
            { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' },
            { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' }
        ]
    },
    grok: {
        id: 'grok',
        name: 'Grok',
        font: "'Inter', sans-serif",

        // Light Mode
        chatBg: '#FFFFFF',
        headerBg: '#FFFFFF',
        headerText: '#0F1419',
        userBg: '#EFF3F4',
        userText: '#0F1419',
        aiBg: 'transparent',
        aiText: '#0F1419',
        inputBg: '#FFFFFF',
        footerBg: '#FFFFFF',

        // Dark Mode
        chatBgDark: '#000000',
        headerBgDark: '#000000',
        headerTextDark: '#E7E9EA',
        userBgDark: '#202327',
        userTextDark: '#E7E9EA',
        aiBgDark: 'transparent',
        aiTextDark: '#E7E9EA',
        inputBgDark: '#202327',
        footerBgDark: '#000000',

        // Branding Elements
        aiLogo: 'grok',
        brandColor: '#000000',
        brandSvg: (
            <svg width="24" height="24" viewBox="0 0 512 509.641" fill="currentColor" stroke="none" className="platform-icon-svg" xmlns="http://www.w3.org/2000/svg">
                <path d="M213.235 306.019l178.976-180.002v.169l51.695-51.763c-.924 1.32-1.86 2.605-2.785 3.89-39.281 54.164-58.46 80.649-43.07 146.922l-.09-.101c10.61 45.11-.744 95.137-37.398 131.836-46.216 46.306-120.167 56.611-181.063 14.928l42.462-19.675c38.863 15.278 81.392 8.57 111.947-22.03 30.566-30.6 37.432-75.159 22.065-112.252-2.92-7.025-11.67-8.795-17.792-4.263l-124.947 92.341zm-25.786 22.437l-.033.034L68.094 435.217c7.565-10.429 16.957-20.294 26.327-30.149 26.428-27.803 52.653-55.359 36.654-94.302-21.422-52.112-8.952-113.177 30.724-152.898 41.243-41.254 101.98-51.661 152.706-30.758 11.23 4.172 21.016 10.114 28.638 15.639l-42.359 19.584c-39.44-16.563-84.629-5.299-112.207 22.313-37.298 37.308-44.84 102.003-1.128 143.81z"/>
            </svg>
        ),
        placeholder: 'Ask Grok...',
        models: [
            { id: 'grok-2', name: 'Grok 2' },
            { id: 'grok-1.5', name: 'Grok 1.5' }
        ]
    },
    perplexity: {
        id: 'perplexity',
        name: 'Perplexity',
        font: "'Inter', sans-serif",

        // Light Mode
        chatBg: '#FFFFFF',
        headerBg: '#FFFFFF',
        headerText: '#1C1C1C',
        userBg: '#F1F1F1',
        userText: '#1C1C1C',
        aiBg: 'transparent',
        aiText: '#1C1C1C',
        inputBg: '#FFFFFF',
        footerBg: '#FFFFFF',

        // Dark Mode
        chatBgDark: '#202222',
        headerBgDark: '#202222',
        headerTextDark: '#F3F4F6',
        userBgDark: '#2D2D2D',
        userTextDark: '#F3F4F6',
        aiBgDark: 'transparent',
        aiTextDark: '#D1D5DB',
        inputBgDark: '#2D2D2D',
        footerBgDark: '#202222',

        // Branding Elements
        aiLogo: 'perplexity',
        brandColor: '#22B8CD',
        brandSvg: (
            <svg width="24" height="24" viewBox="0 0 512 509.64" fill="currentColor" stroke="none" className="platform-icon-svg" xmlns="http://www.w3.org/2000/svg">
                <path d="M348.851 128.063l-68.946 58.302h68.946v-58.302zm-83.908 48.709l100.931-85.349v94.942h32.244v143.421h-38.731v90.004l-94.442-86.662v83.946h-17.023v-83.906l-96.596 86.246v-89.628h-37.445V186.365h38.732V90.768l95.309 84.958v-83.16h17.023l-.002 84.206zm-29.209 26.616c-34.955.02-69.893 0-104.83 0v109.375h20.415v-27.121l84.415-82.254zm41.445 0l82.208 82.324v27.051h21.708V203.388c-34.617 0-69.274.02-103.916 0zm-42.874-17.023l-64.669-57.646v57.646h64.669zm13.617 124.076v-95.2l-79.573 77.516v88.731l79.573-71.047zm17.252-95.022v94.863l77.19 70.83c0-29.485-.012-58.943-.012-88.425l-77.178-77.268z"/>
            </svg>
        ),
        placeholder: 'Ask anything...',
        models: [
            { id: 'pro-search', name: 'Pro Search' },
            { id: 'sonar-huge', name: 'Sonar Huge' },
            { id: 'sonar-large', name: 'Sonar Large' }
        ]
    }
}

export default aiThemes
