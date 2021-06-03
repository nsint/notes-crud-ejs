const router = require("express").Router();
const Notes = require('../models/Notes');

router.get('/', async (req, res) => {
    const notes = await Notes.find();
    res.render('notes', {
        notes
    });
});

router.post('/add-note', async (req, res) => {
    const { title, description } = req.body;
    const newNote = {
        title: title,
        description: description,
        completed: false
    };
    const note = new Notes(newNote);
    await note.save();
    res.redirect('/')
});

router.get('/delete/:id', async (req,res) => {
    const { id } = req.params;
    const Note = await Notes.findOne({ _id: id });
    if(Note) {
        Note.delete();
        res.redirect('/')
    } else {
        res.redirect('/')
    }
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const note = await Notes.findOne({ _id: id });
    res.render('edit-note', {
        note
    });
});

router.post('/edit-note/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const updateNote = {
        title: title,
        description: description,
        completed: false
    }
    const note = await Notes.updateOne({ _id: id }, { $set: updateNote });
    res.redirect('/')
});

router.get('/complete/:id', async (req, res) => {
    const { id } = req.params;
    const note = await Notes.findOne({ _id: id });
    const setNote = {
        title: note.title,
        description: note.description,
        completed: true
    }
    const noted = await Notes.updateOne({ _id: id }, { $set: setNote });
    res.redirect('/')
})

module.exports = router;