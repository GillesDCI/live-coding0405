//importing express library to build webservers. 
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


//importing routes 
import teaRoutes from './routes/teaRoutes.js';
import userRoutes from './routes/userRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import orderRoutes from './routes/orderRoutes.js';


dotenv.config();

//declare app which allows us to use the web app functionalities.
const app = express();

//allows us to send json information to the server (this is configuration)
app.use(express.json());

//connect to the database 
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`)
.then(() => {console.log("we are connected to the database.")})
.catch((error) => { console.log('an error occurred while connecting ot the db', error)})
//configure routes 
app.use('/api/teas', teaRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/orders', orderRoutes);

//listening for requests on port 3001
app.listen(3001, ()=> {
    console.log("The server is listening for requests....");
})