import express from 'express';

const app = express();
app.use(express.json());

let notes = [
    { id: 1, title: 'Node শেখা' },
    { id: 2, title: 'Express শেখা' },
];
let nextId = 3;

app.get('/', (req, res) => {
    res.send('new server create');
})

// all read
app.get('/notes', (req, res) => {
    res.status(200).json(notes);
})

// one read
app.get('/notes/:id', (req, res) => {
    const note = notes.find(note => note.id === Number(req.params.id));
    if (!note) return res.status(404).json({messgae: "Note not found!"});
    res.status(200).json(note);
})

// note create
app.post('/notes', (req, res) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ messgae: 'Title is required!' });
    }
    const note = { id: nextId++, title:title.trim() };
    notes.push(note);
    res.status(201).json(note);
})

// note update
app.put('/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ messgae: 'Title is required!' });
    }
    const note = notes.find(note => note.id === id);
    if (!note) return res.status(404).json({ messgae: 'Not found the note' });

    note.title = title.trim();
    res.json(note);
})

// note delete
app.delete('/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = notes.map(note => note.id === id);
    if (index === -1)
        return res.status(404).json({ message: 'Note not found' });
    notes.splice(index, 1);
    res.status(204).end();
})



const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running port on ${port}`);
})