const router = require('express').Router();
const Note = require("../models/Note");
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req,res) => {
    res.render('notes/add');
});

router.post('/notes/add', isAuthenticated, async (req,res) => {
    const {title, description, public} = req.body;
    const errors = [];

    if(!title) {
        errors.push({text: "Por favor escriba un título"});
    }
    if(!description) {
        errors.push({text: "Por favor escriba una descripción"});
    }
    if(errors.length > 0) {
        res.render('notes/add', {
            errors,
            title,
            description,
            public
        });
    } else {
        const newNote = new Note({title, description, public});
        newNote.user = req.user.id;
        await newNote.save();
        req.flash("success_msg", "Nota agregada");
        res.redirect("/notes");
    }
});

router.get('/notes/edit/:id', isAuthenticated, async (req,res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit', {note});
});

router.put('/notes/edit/:id', async (req,res) => {
    const {title, description, public} = req.body;

    await Note.findByIdAndUpdate(req.params.id, {
        title, 
        description,
        public
    });
    req.flash("success_msg", "Nota editada");
    res.redirect("/notes");
});

router.delete('/notes/delete/:id', isAuthenticated, async (req,res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Nota eliminada");
    res.redirect("/notes");
});

router.get('/notes', isAuthenticated, async (req,res) => {
    const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
    const publicNotes = await Note.find({user:{$ne: req.user.id}, public: true}).sort({date: 'desc'}).populate('user');
    res.render("notes/notes", {notes, publicNotes});
});

module.exports = router;