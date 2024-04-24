import express from 'express';


const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World, ISSUE');
});

router.post('/', (req, res) => {
    res.send('Hello World, ISSUE');
});

export default router;