import { useState, useRef } from 'react'
import { ChevronDown, Users, Plus, Trash2, GripVertical, Camera, User } from 'lucide-react'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import './PeopleSection.css'

function SortablePerson({ person, onNameChange, onAvatarChange, onRemove, canRemove, roleLabel }) {
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
    <div ref={setNodeRef} style={style} className="person-card">
      <div className="drag-handle" {...attributes} {...listeners}>
        <GripVertical size={14} />
      </div>
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
    setPeople(prev => [...prev, { id, name: `Person ${prev.length + 1}`, avatar: null, role: 'participant' }])
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

  // In DM mode: first person = sender, second = receiver
  const senderPeople = chatType === 'dm' ? people.filter(p => p.role === 'sender') : []
  const receiverPeople = chatType === 'dm' ? people.filter(p => p.role === 'receiver') : []

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
          {chatType === 'dm' ? (
            <>
              <div className="form-sublabel">Sender</div>
              {senderPeople.map(p => (
                <SortablePerson
                  key={p.id}
                  person={p}
                  onNameChange={updateName}
                  onAvatarChange={updateAvatar}
                  onRemove={removePerson}
                  canRemove={false}
                />
              ))}
              <div className="form-sublabel" style={{ marginTop: 16 }}>
                Receiver
                {chatType === 'dm' && <span className="people-count">{receiverPeople.length}</span>}
              </div>
              {receiverPeople.map(p => (
                <SortablePerson
                  key={p.id}
                  person={p}
                  onNameChange={updateName}
                  onAvatarChange={updateAvatar}
                  onRemove={removePerson}
                  canRemove={false}
                />
              ))}
            </>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={people.map(p => p.id)} strategy={verticalListSortingStrategy}>
                {people.map((p, i) => (
                  <SortablePerson
                    key={p.id}
                    person={p}
                    onNameChange={updateName}
                    onAvatarChange={updateAvatar}
                    onRemove={removePerson}
                    canRemove={people.length > 2}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
          {chatType === 'group' && (
            <button className="btn btn-ghost add-person-btn" onClick={addPerson}>
              <Plus size={14} />
              Add person
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default PeopleSection
