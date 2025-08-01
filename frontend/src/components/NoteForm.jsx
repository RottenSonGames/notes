import { useState, useEffect, useRef } from 'react'

const NoteForm = ({ createNote }) => {
  const inputRef = useRef()
  const [newNote, setNewNote] = useState('')

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const addNote = event => {
    event.preventDefault()

    createNote({
      content: newNote,
      important: true,
    })

    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          ref={inputRef}
          value={newNote}
          onChange={event => setNewNote(event.target.value)}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm