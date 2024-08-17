import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    content: {
        type: String,
        default: ""
    }
}, { timestamps: true })

const noteModel = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default noteModel;