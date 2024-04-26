import express from 'express';
import {ProjectController} from '../controller/controller.js'

const router = express.Router();
const projectController = new ProjectController();

router.use((req,res,next)=>{
    console.log("url: ",req.url);
    next();
})

router.get('/', (req, res) => {
    projectController.getProjects(req, res);
});

router.post('/', (req, res) => {
    projectController.createProject(req, res);
});

router.delete('/project/:id', (req, res) => {
    projectController.deleteProject(req, res);
});

router.get('/project/:id', (req, res) => {
    projectController.openProject(req, res);
});

router.post('/project/:id', (req, res) => {
    projectController.createIssue(req, res);
});

router.get('/issue/:id', (req, res) => {
    projectController.openIssue(req, res);
});

router.get('/issue/resolve/:id', (req, res) => {
    projectController.closeIssue(req, res);
});

router.delete('/issue/:id', (req, res) => {
    projectController.deleteIssue(req, res);
});


export default router;