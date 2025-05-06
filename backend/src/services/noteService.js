const Note = require("../models/Note");


const fetchNotes = async ({ userId, currentPage, limit }) => {
    if (!Number.isInteger(currentPage) || currentPage < 1) {
        throw new Error('Invalid current page');
    }
    if (!Number.isInteger(limit) || limit < 1) {
        throw new Error('Invalid page size');
    }

    const total = await Note.countDocuments({ userId });
    const pages = Math.ceil(total / limit);

    const notes = await Note.find({ userId })
        .sort({ isPinned: -1, _id: 1 })
        .skip((currentPage - 1) * limit)
        .limit(limit);

    return {
        meta: {
            current: currentPage,
            pageSize: limit,
            pages,
            total
        },
        notes
    };
}

const createNote = async ({ userId, title, content, tags }) => {
    const note = await Note.create({
        title,
        content,
        tags: tags || [],
        userId
    });

    return note;
}

const editNote = async ({ userId, noteId, title, content, tags, isPinned }) => {
    const note = await Note.findOne({ _id: noteId, userId });

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();

    return note;
}

const deleteNote = async ({ noteId, userId }) => {
    const note = await Note.findOne({ _id: noteId, userId });
    await Note.deleteOne({ _id: noteId, userId });

    return note;
}

const updateIsPinned = async ({ noteId, userId, isPinned }) => {
    const note = await Note.findOne({ _id: noteId, userId });
    note.isPinned = isPinned;

    await note.save();
    return note;
}

const searchNote = async ({ userId, query }) => {
    const notes = await Note.find({
        userId,
        $or: [
            { title: { $regex: new RegExp(query, "i") } },
            { content: { $regex: new RegExp(query, "i") } }
        ],
    });

    return notes;
}

module.exports = {
    fetchNotes,
    createNote,
    editNote,
    deleteNote,
    updateIsPinned,
    searchNote
}