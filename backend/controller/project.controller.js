import {Project} from "../model/model.js";

export class ProjectController {

    constructor() {
        this.project = Project;
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

            const project = new this.project({name, description, author});
            const result = await project.save();
            console.log(result);
            res.status(201).send('Project created successfully');
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        
        }    
    }

    async deleteProject(req, res) {
        try {
            const {id} = req.params;
            await this.project.findByIdAndDelete(id);
            res.status(200).redirect('/');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async openProject(req, res) {
        try{
            const {id} = req.params;
            //res.status(200).redirect('/issue?id='+id);
            res.json({
                msg: "open-project for",
                id
            })
        }catch(error){
            res.status(500).json({ message: error.message });
        }
    }

}