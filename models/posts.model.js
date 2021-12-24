import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = Schema({
    token: { type: String, required: true },
    username: { type: String, required: true },
    caption: { type: String, required: true },
    postUrl: { type: String, required: true },
}, { timestamps: true });

const FarmPost = mongoose.model('FarmPost', postSchema);
export default FarmPost