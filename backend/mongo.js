const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
  }
  
  const password = process.argv[2]
  
  const url = `mongodb://sanghoyou:${password}@ac-2parfjc-shard-00-00.optkffg.mongodb.net:27017,ac-2parfjc-shard-00-01.optkffg.mongodb.net:27017,ac-2parfjc-shard-00-02.optkffg.mongodb.net:27017/noteApp?replicaSet=atlas-vml457-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Clusterbator`

  
  mongoose.set('strictQuery',false)
  
  mongoose.connect(url)
  
  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
  })
  
  const Note = mongoose.model('Note', noteSchema)

  Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
  })
  
//   const note = new Note({
//     content: 'HTML is easy',
//     important: true,
//   })
  
//   note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
//   })