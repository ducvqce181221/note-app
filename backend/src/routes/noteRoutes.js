const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/jwt');
const { handleFetchNotes, handleCreateNote, handleEditNote, handleDeleteNote, handleUpdatePinned, handleSearchNote } = require('../controllers/NoteController');


router.get('/get-all-notes', verifyToken, handleFetchNotes);
router.get('/search-note', verifyToken, handleSearchNote);
router.post('/add-note', verifyToken, handleCreateNote);
router.put('/edit-note/:noteId', verifyToken, handleEditNote);
router.put('/update-note-pinned/:noteId', verifyToken, handleUpdatePinned);
router.delete('/delete-note/:noteId', verifyToken, handleDeleteNote);


module.exports = router;