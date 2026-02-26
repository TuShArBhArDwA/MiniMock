import { useState, useRef } from 'react'
import { ChevronDown, Users, Plus, Trash2, GripVertical, Camera, User, Info } from 'lucide-react'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import './PeopleSection.css'

function SortablePerson({ person, onNameChange, onAvatarChange, onRemove, canRemove, hideDrag }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: person.id })
  const fileRef = useRef(null)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleAvatar = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onAvatarChange(person.id, ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div ref={setNodeRef} style={style} className={`person-card ${hideDrag ? 'no-drag' : ''}`}>
      {!hideDrag && (
        <div className="drag-handle" {...attributes} {...listeners}>
          <GripVertical size={14} />
        </div>
      )}
      <div className="person-avatar" onClick={() => fileRef.current?.click()}>
        {person.avatar ? (
          <img src={person.avatar} alt={person.name} />
        ) : (
          <User size={16} />
        )}
        <div className="avatar-overlay"><Camera size={10} /></div>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleAvatar} />
      </div>
      <input
        className="input person-name"
        value={person.name}
        onChange={(e) => onNameChange(person.id, e.target.value)}
        placeholder="Name"
      />
      {canRemove && (
        <button className="btn-icon" onClick={() => onRemove(person.id)}>
          <Trash2 size={14} />
        </button>
      )}
    </div>
  )
}

function PeopleSection({ people, setPeople, chatType }) {
  const [open, setOpen] = useState(true)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      setPeople((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id)
        const newIndex = items.findIndex(i => i.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const addPerson = () => {
    const id = `p${Date.now()}`
    setPeople(prev => [...prev, { id, name: `Person ${prev.length + 1}`, avatar: null, role: 'receiver' }])
  }

  const removePerson = (id) => {
    setPeople(prev => prev.filter(p => p.id !== id))
  }

  const updateName = (id, name) => {
    setPeople(prev => prev.map(p => p.id === id ? { ...p, name } : p))
  }

  const updateAvatar = (id, avatar) => {
    setPeople(prev => prev.map(p => p.id === id ? { ...p, avatar } : p))
  }

  const senderPeople = people.filter(p => p.role === 'sender')
  const receiverPeople = people.filter(p => p.role === 'receiver')

  return (
    <div className="section">
      <div className="section-header" onClick={() => setOpen(!open)}>
        <div className="section-header-left">
          <Users size={16} />
          <span>People</span>
          <span className="section-badge">{people.length}</span>
        </div>
        <ChevronDown size={16} className={`section-toggle ${open ? 'open' : ''}`} />
      </div>
      {open && (
        <div className="section-content">
          <div className="form-sublabel group-info-label">
            SENDER <Info size={14} className="info-icon" />
          </div>
          {senderPeople.map(p => (
            <SortablePerson
              key={p.id}
              person={p}
              onNameChange={updateName}
              onAvatarChange={updateAvatar}
              onRemove={removePerson}
              canRemove={false}
              hideDrag={true}
            />
          ))}

          <div className="form-sublabel group-info-label" style={{ marginTop: 20 }}>
            RECEIVER <Info size={14} className="info-icon" />
            <span className="people-count">{receiverPeople.length}</span>
          </div>
          
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={receiverPeople.map(p => p.id)} strategy={verticalListSortingStrategy}>
              {receiverPeople.map(p => (
                <SortablePerson
                  key={p.id}
                  person={p}
                  onNameChange={updateName}
                  onAvatarChange={updateAvatar}
                  onRemove={removePerson}
                  canRemove={chatType === 'group' && receiverPeople.length > 1}
                  hideDrag={chatType === 'dm' || receiverPeople.length <= 1}
                />
              ))}
            </SortableContext>
          </DndContext>

          {chatType === 'group' && (
            <div className="add-person-container">
              <button className="btn add-person-btn-outline" onClick={addPerson}>
                <Plus size={14} />
                Add person
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PeopleSection
