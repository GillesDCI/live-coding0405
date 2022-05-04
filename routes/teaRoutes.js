import express from 'express';
import Tea from './../models/Tea.js';

//declare the router module 
const router = express.Router();

//using GET (get list of teas)
router.get('/', async (req, res) => {
    const teas = await Tea.find().sort({name:1});
    //status code 200 OK     //send the teas converted into json
    return res.status(200).json(teas);
});

//using GET request with id parameter (request parameter)
router.get('/:id', async (req, res) => {
    //look for the tea in the tea array that has this id
    const tea = await Tea.findById(req.params.id);

    //No tea with such id 
    if(!tea){
     return res.status(404).json("Tea not found");
    }

    //everything went ok (status code 200) and sen dthe tea we found in the array. 
    return res.status(200).json(tea);

})
//get all teas by category
router.get('/category/:category', async (req, res) => {
    const teas = await Tea.find({category:req.params.category});

    return res.status(200).json(teas);
})

//POST request to create a new tea
router.post('/add', async (req ,res) => {

    console.log("the body is", req.body)

    try {
 
    //create a new tea object
    const resultTea = await Tea.create({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        tags:req.body.tags
    })


    //enter the tea inside the array.
    return res.status(201).json({message:'Tea created',createdTea:resultTea})
    } catch (error) {
      return res.status(500).json({message:'Error happened',error:error.toString()})
    }
})

//PATCH request to update the name of the tea. 
router.patch('/update/:id', async (req, res) => {
    //look for the tea in the tea array that has the :id from the entry point. 
    //const tea = teas.find(tea => tea.id == req.params.id);
    try {
        //find a tea by id and update using the second parameter (name:req.body.name etc.)
        const tea = await Tea.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            description:req.body.description, 
            category:req.body.category
        },{new:true, runValidators:true});
    
    
        if(!tea){
            //sending 404 we can't find the resource (the tea)
            return res.status(404).json("Tea not found");
        }
    
        //return status code 200
        return res.status(200).json({updatedTea:tea});
    } catch (error) {
       return res.status(500).json({message:'Error happened',error:error.toString()})
    }

});
//Update a description of a tea by name
router.patch('/update/description/:name', async (req, res) => {
    try {
        //find a tea by id and update using the second parameter (name:req.body.name etc.)
        const tea = await Tea.findOneAndUpdate({name:req.params.name},{
            description:req.body.description
        },{new:true, runValidators:true})
    
    
        if(!tea){
            //sending 404 we can't find the resource (the tea)
            return res.status(404).json("Tea not found");
        }
    
        //return status code 200
        return res.status(200).json({updatedTea:tea});
    } catch (error) {
       return res.status(500).json({message:'Error happened',error:error.toString()})
    }
})

//DELETE request 
router.delete('/delete/:id', async (req, res) => {
    //find tea by id and delete the document. 
    try {
        const tea = await Tea.findByIdAndDelete(req.params.id);
 
        if(!tea){
         //sending 404 we can't find the resource (the tea)
         return res.status(404).json("Tea not found");
        }
      
        //return a response statuscode 200 it worked out and show the new list of teas
        return res.status(200).json({message:'Tea Deleted', deleteInfo:tea});
    } catch (error) {
       return res.status(500).json({message:'Error happened',error:error.toString()})
        
    }
 });
//DELETE
 router.delete('/delete/category/:category', async (req, res) => {
    try {
        const deleteResult = await Tea.deleteMany({category:req.params.category});
    
        //return a response statuscode 200 it worked out and show the new list of teas
        return res.status(200).json({message:'Tea Deleted', deleteInfo:deleteResult});
    } catch (error) {
       return res.status(500).json({message:'Error happened',error:error.toString()})
        
    }
 });



export default router;
