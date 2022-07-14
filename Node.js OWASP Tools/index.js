import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';

const app = express();
const PORT = 3000;

// helmet setup
app.use(helmet());

// rate limit setup
const limiter = new RateLimit({
    windowMs: 15*60*1000, //15 minutes
    max: 100, //limit of number of requests per IP
    delayMs: 0 //no delay until limit hit
});

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb');

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);