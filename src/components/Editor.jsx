import PlatformSelector from './PlatformSelector'
import TypeSelector from './TypeSelector'
import PeopleSection from './PeopleSection'
import MessagesSection from './MessagesSection'
import AppearanceSection from './AppearanceSection'
import './Editor.css'

function Editor({
  platform, setPlatform,
  chatType, setChatType,
  groupData, setGroupData,
  people, setPeople,
  messages, setMessages,
  appearance, setAppearance,
}) {
  return (
    <aside className="editor">
      <div className="editor-scroll">
        <PlatformSelector platform={platform} setPlatform={setPlatform} />
        <TypeSelector chatType={chatType} setChatType={setChatType} groupData={groupData} setGroupData={setGroupData} setPeople={setPeople} />
        <PeopleSection people={people} setPeople={setPeople} chatType={chatType} platform={platform} />
        <MessagesSection messages={messages} setMessages={setMessages} people={people} />
        <AppearanceSection appearance={appearance} setAppearance={setAppearance} />
      </div>
    </aside>
  )
}

export default Editor
