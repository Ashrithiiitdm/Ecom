import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());

//Api endpoints
app.get('/', (req, res) => {
    res.send('Hello World');

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

});