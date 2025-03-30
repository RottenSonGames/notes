const Note = ({ note, toggleImportance }) => {
const label = note.important ? 'currently important, make unimportant' : 'currently unimportant, make important'

    return (
      <li className='note'>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
      </li>
    )
  }
  
  export default Note