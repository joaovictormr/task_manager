const express       = require('express');
const app           = express();
const tasksRoutes   = require('./routes/tasks');
const connectDB     = require('./db/connect');
const notFound      = require('./middleware/not-found');
const errorHandlerMiddleware      = require('./middleware/error-handler');

require('dotenv').config();


app.use(express.json());
app.use(express.static('./public'));
app.use('/api/v1/tasks', tasksRoutes);
app.use(errorHandlerMiddleware);
app.use(notFound);
const port = process.env.PORT || 3000;

const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`listening on port ${port}...`)
        });
    }catch (error) {
        console.log(error);
    }
};

start();

