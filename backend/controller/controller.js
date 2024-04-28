import {Project} from "../model/model.js";
import {Issue} from "../model/model.js";

export class ProjectController {

    constructor() {
        this.project = Project;
        this.issue = Issue;
    }

    async getProjects(req, res) {
        try{
            const projects = await this.project.find({});
            res.render('index.ejs', {projects});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    async createProject(req, res) {
        try {
            const name = req.body.projectName;
            const description = req.body.projectDescription;
            const author = req.body.projectAuthor;
            const date = this.formatDate(new Date());
            const project = new this.project({name, description, author, date});
            const result = await project.save();
            //console.log(result);
            res.status(201).send('Project created successfully');
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        
        }    
    }

    async deleteProject(req, res) {
        try {
            const {id} = req.params;
            const project = await this.project.findByIdAndDelete(id);
            //delete issues corresponding to the same project id
            const issues = await this.issue.find({project: id});
            for (let issue of issues) {
                await this.issue.findByIdAndDelete(issue._id);
            }
            res.status(200).redirect('/');
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    async openProject(req, res) {
        try{
            const {id} = req.params;
            //console.log("id:",id);
            const project = await this.project.findById(id);
            let issues = await this.issue.find({project: id});
            res.render('project.ejs',{issues,project});
        }catch(error){
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    async createIssue(req, res) {
        try{
            console.log("new issue controller");
            const id = req.body.projectId;
            const title = req.body.issueName;
            const description = req.body.issueDescription;
            const author = req.body.issueAuthor;
            const status = req.body.issueStatus || "Open";
            const timestamp = this.formatDate(new Date());
            const project = await this.project.findById(id);
            const label = req.body.issueLabel;
            //console.log("Issue:",title, description, status, author, timestamp, project);
            const issue = new this.issue({title, description, label, status, author, timestamp, project});
            const result = await issue.save();
            project.issues.push(issue.id);
            await project.save();
            //console.log("project:",project);
            //res.status(201).redirect('/project/'+id);
        }catch(error){
            console.log(error);
            res.status(500).json({ message: error.message });
        }

    }

    async closeIssue(req, res) {
        try{
            const {id} = req.params;
            const issue = await this.issue.findById(id);
            issue.status = "Closed";
            await issue.save();
            res.status(200).redirect('/project/'+issue.project);
        }catch(error){
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    } 

    async deleteIssue(req, res) {
        try{
            const {id} = req.params;
            const issue = await this.issue.findByIdAndDelete(id);
            const project = await this.project.findById(issue.project);
            project.issues.pull(issue.id);
            await project.save();
            res.status(200).redirect('/');
        }catch(error){
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    } 

    async openIssue(req, res){
        try{
            const {id} = req.params;
            //console.log("id:",id);
            const issue = await this.issue.findById(id);
            const project = await this.project.findById(issue.project);
            res.render('issue.ejs',{issue, project});
        }catch(err){
            console.log(err);
            res.status(500).send(err.message);
        }
    }


    formatDate(date) {
        console.log("date:", date);
        if (date) {
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          const formattedDate = `${day}/${month}/${year}`;
          return formattedDate;
        }
      }
}