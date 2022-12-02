import bodyParser from 'body-parser';
import express from 'express';
const app = express();
import db from './db';
import { mongoconnection } from './db';
mongoconnection();
import adminroute from './router/adminroute';
import customerroute from './router/customerroute'
import invoiceroute from './router/invoiceroute'
import cors from 'cors'
app.use(bodyParser.urlencoded(
    {
        extended:true
    }
));
app.use(bodyParser.json());
app.use(cors({origin:"*"}))

app.use("/admin",adminroute)
app.use("/customer",customerroute)
app.use("/invoice",invoiceroute)
export default app;