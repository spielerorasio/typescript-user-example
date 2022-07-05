// const express = require('express');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// const port = process.env.PORT;

// app.get('/', (req, res) => {
//   res.send('Express + TypeScript Server');
// });

// app.listen(port, () => {
//   console.log(`[server]: Server is running at https://localhost:${port}`);
// });


import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser  from 'body-parser';
import { User } from "./user";
import { UserController } from './controller/user_controller'

export const router  = express.Router();

//const router: Router = express.Router();


dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});


app.get('/user/:id',  async  (req: Request, res: Response) => {
  let result = await UserController.getUser(req, res);
  if(result instanceof User) {
    res.send(JSON.stringify(result , null, 2));
  }
  res.send("result = " + result);
});


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


router.post("/user", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    let user = await UserController.addUser(req, res);
    if(user !== undefined && (user !== null)){
      res.status(201).json(user.getId());
      return;
    }
    res.status(500).send('fail to add user with '+req.body);

   
  } catch (e) {
    res.status(500).send(e);
  }
});

app.use("/", router);

app.listen(port, () => {
  console.log(`[server]: typescript Server is running at https://localhost:${port}`);
});