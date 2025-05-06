const { fetchNotes, createNote, editNote, deleteNote, updateIsPinned, searchNote } = require('../services/noteService');

const handleFetchNotes = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: true, message: 'Unauthorized' });
    }

    const userId = req.user.id;
    const { current = 1, pageSize = 10 } = req.query;

    try {
        const currentPage = parseInt(current);
        const limit = parseInt(pageSize);

        const { notes, meta } = await fetchNotes({ userId, currentPage, limit })
        return res.json({
            error: false,
            meta,
            notes,
            message: 'All notes retrieved successfully'
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: error.message
        });
    }
}

const handleCreateNote = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: true, message: 'Unauthorized' });
    }

    const userId = req.user.id;
    const { title, content, tags } = req.body;

    if (!title) {
        return res.status(400).json({ error: true, message: 'Title is required' });
    }
    if (!content) {
        return res.status(400).json({ error: true, message: 'Content is required' });
    }

    try {

        const note = await createNote({ userId, title, content, tags })
        return res.status(201).json({
            error: false,
            note,
            message: 'Note added successfully'
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: `Internal Server Error: ${error.message}`
        });
    }
}

const handleEditNote = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: true, message: 'Unauthorized' });
    }
    if (!req.params || !req.params.noteId) {
        return res.status(400).json({ error: true, message: 'Invalid note ID' });
    }

    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const userId = req.user.id;

    if (!title && !content && !tags) {
        return res.status(400).json({ error: true, message: 'No change provided' });
    }

    try {
        const note = await editNote({ userId, noteId, title, content, tags, isPinned });

        if (!note) {
            return res.status(404).json({ error: true, message: 'Note not found' });
        }

        return res.json({
            error: false,
            note,
            message: 'Note updated successfully'
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: `Internal Server Error: ${error.message}`
        })
    }
}

const handleDeleteNote = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: true, message: 'Unauthorized' });
    }

    const noteId = req.params.noteId;
    const userId = req.user.id;

    try {
        const note = await deleteNote({ noteId, userId })

        if (!note) {
            return res.status(401).json({ error: true, message: 'Note not found' });
        }

        return res.json({
            error: false,
            message: 'Note deleted successfully'
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        });
    }
}

const handleUpdatePinned = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: true, message: 'Unauthorized' });
    }
    if (!req.params || !req.params.noteId) {
        return res.status(400).json({ error: true, message: 'Invalid note ID' });
    }

    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const userId = req.user.id;

    try {
        const note = await updateIsPinned({ noteId, userId, isPinned });

        if (!note) {
            return res.status(401).json({ error: true, message: 'Note not found' });
        }

        return res.json({
            error: false,
            note,
            message: 'Note updated successfully'
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: `Internal Server Error: ${error.message}`
        });
    }
}

const handleSearchNote = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: true, message: 'Unauthorized' });
    }
    if (!req.query) {
        return res.status(400).json({ error: true, message: 'Search query is required' });
    }

    const userId = req.user.id;
    const { query } = req.query;

    try {
        const notes = await searchNote({ userId, query });
        return res.json({
            error: false,
            notes,
            message: 'Notes matching the search query retrieved successfully'
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: `Internal Server Error: ${error.message}`
        });
    }
}

module.exports = {
    handleFetchNotes,
    handleCreateNote,
    handleEditNote,
    handleDeleteNote,
    handleUpdatePinned,
    handleSearchNote
};