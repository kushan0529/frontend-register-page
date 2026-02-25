import mongoose from 'mongoose';
import { NOTE } from '../models/user-model.js';

const control = {};

control.list = async (req, res) => {
    try {
        const listofnotes = await NOTE.find({ user: req.userId });
        res.json(listofnotes);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

control.create = async (req, res) => {
    const body = req.body;
    try {
        const note = new NOTE({ ...body, user: req.userId });
        await note.save();
        res.json(note);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

control.show = async (req, res) => {
    const noteId = req.params.noteId;
    try {
        const note = await NOTE.findOne({ _id: noteId, user: req.userId });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

control.update = async (req, res) => {
    const body = req.body;
    const noteId = req.params.noteId;
    try {
        const note = await NOTE.findOneAndUpdate({ _id: noteId, user: req.userId }, body, { new: true });
        if (!note) {
            return res.status(404).json({});
        }
        res.json(note);
    } catch (err) {
        res.status(400).json({ error: 'something went wrong' });
    }
};

control.delete = async (req, res) => {
    const noteId = req.params.noteId;
    try {
        const note = await NOTE.findOneAndDelete({ _id: noteId, user: req.userId });
        res.json(note);
    } catch (err) {
        res.status(400).json({ error: 'something went wrong' });
    }
};

export default control;