import express from 'express';

const router = express.Router();

router.get('/version', (req, res) => {
    return res.status(200).json({version:'7.0.1'});
})


export default router;