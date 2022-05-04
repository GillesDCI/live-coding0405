import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();


router.get('/', async (req,res) => {
    const orders = await Order.find().populate('user');
    res.status(200).json(orders);
});
//using skip and limit to go through pages
router.get('/paging/:skip/:limit', async (req, res) => {
    const orders = await Order.find({})
    .populate('user')
    .skip(Number(req.params.skip)) //skip this many documents.
    .limit(Number(req.params.limit)) //limit the amount of documents to this limit.
    
    return res.status(200).json(orders);
});

router.get('/paging', async(req, res) => {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10 

    //example page = 2 and pageSize = 3
    // (2-1) = 1 * 3 = skip(3)
    //example page = 3 and pageSize = 3
    // (3-1) = 2 * 3 = skip(6)
    //example page = 4 and pageSize = 3
    // (4-1) = 3 * 3 = skip(9)
    const skipRows = (page - 1) * pageSize;

    const orders = await Order.find({})
    .populate('user')
    .skip(skipRows)
    .limit(pageSize)

    return res.status(200).json(orders);
});

//Get the order by userID
router.get('/byuser/:userid', async(req, res) => {
    const orders = await Order.find({user:req.params.userid})
    res.status(200).json(orders);
});

//Create a new order 
router.post('/add',async (req, res) => {
    try {
        const resultOrder =  await Order.create({
            orderDescription:req.body.orderDescription,
            totalPrice:req.body.totalPrice,
            vat:req.body.vat,
            totalPriceInclVat: req.body.totalPriceInclVat,
            user: req.body.userID //we post the user ID this is a reference to the user document that's connected to this order.
        })

        return res.status(200).json({message:'Order was created', createdOrder:resultOrder})
    } catch (error) {
        return res.status(400).json({message:'Error happened', error:error})
    }


});

export default router;