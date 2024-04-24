import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    issues: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue",
    }],

});

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enums: ["Open", "Closed"],
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },
});

export const Project = mongoose.model("Project", projectSchema);
export const Issue = mongoose.model("Issue", issueSchema);