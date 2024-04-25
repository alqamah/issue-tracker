import express from 'express';
import {ProjectController} from '../controller/project.controller.js'

const router = express.Router();
const projectController = new ProjectController();

router.use((req,res,next)=>{
    //console.log("url: ",req.url);
    next();
})

router.get('/', (req, res) => {
    projectController.getProjects(req, res);
});

router.post('/', (req, res) => {
    projectController.createProject(req, res);
});

router.delete('/:id', (req, res) => {
    projectController.deleteProject(req, res);
});

router.get('/:id', (req, res) => {
    projectController.openProject(req, res);
});

export default router;