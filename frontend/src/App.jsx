import { useState, useEffect } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'

import noteService from './services/Notes'
import loginService from './services/Login'

const App = () => {
  const [user, setUser] = useState(null)

  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
    const loggedUserJSON = localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({username, password})

      localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      
      noteService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong credentials!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const createNote = noteObject => {
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
      
    console.log('button clicked', event.target)
  }

  const toggleImportanceOf = (id) => {
    const selectedNote = notes.find(note => note.id === id)
    const changedNote = {...selectedNote, important: !selectedNote.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(error => {
        setErrorMessage(`the note ${selectedNote.content} was already deleted from server`)
        // alert(`the note ${selectedNote.content} was already deleted from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      
      <Notification message={errorMessage}/>

      {user === null ?
        <Togglable buttonLabel="show login form">
          <LoginForm
          handleLogin={handleLogin}
          />
        </Togglable> :
        <div>
          <p>{user.name} logged-in</p>
            <Togglable buttonLabel="new note">
              <NoteForm
              createNote={createNote}
              />
            </Togglable>
        </div>
      }
      <div>
        <button onClick = {() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <Footer />
    </div>
  )
}

export default App