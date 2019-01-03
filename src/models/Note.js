const mongoose = require("mongoose");
const{Schema} = mongoose;

const NoteSchema = new Schema({
    title: {type: String, required:true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    public: {type: Boolean, default: false}
});

module.exports = mongoose.model('Note', NoteSchema);