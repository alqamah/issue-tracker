import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  issues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Issue" }],
});

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enums: ["Open", "Closed"], required: true },
  timestamp: { type: Date, default: Date.now },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
});

function formatDate(date) {
  console.log("asdasd", date);
  if (date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
}

projectSchema.post('find', function(docs, next) {
  for (const project of docs) {
    const formattedDate = formatDate(project.date);
    console.log("fomatter",formattedDate);
    project.date = formattedDate;
  }
  next();
});

export const Project = mongoose.model("Project", projectSchema);
export const Issue = mongoose.model("Issue", issueSchema);