const mongoose = require('mongoose');

const checklistSchema = mongoose.Schema({
    name: {type: String, required: true},
    done: {type: Boolean, default: false},
    checklist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Checklist',
        required: true
    }
});

module.exports = mongoose.model('Task', checklistSchema);