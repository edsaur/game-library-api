import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a title"],
        trim: true,
        maxLength: [100, "title cannot be more than 100 characters"],
    },
    genre: {
        type: String,
        required: [true, "Please add a genre"],
        trim: true,
        maxLength: [100, "Genre cannot be more than 100 characters"],
    },
    platform: {
        type: String,
        required: [true, "Please add an platform"],
        trim: true,
        maxLength: [200, "Platform cannot be more than 200 characters"],
    },
    releaseYear: {
        type: Number,
        required: [true, "Please add a price"],
        trim: true,
        minLength: [4, "Release year cannot be less than 4 characters"],
        maxLength: [4, "Release year cannot be more than 4 characters"],
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        trim: true,
        maxLength: [1000, "Description cannot be more than 1000 characters"],
    },
}, { timestamps: true });

export default mongoose.model("Game", gameSchema);