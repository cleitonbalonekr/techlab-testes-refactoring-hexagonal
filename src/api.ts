import express from "express";
import {Signup} from "./Signup";
import {AccountDatabaseDao} from "./AccountDao";
import {MysqlDatabaseConnection} from "./DatabaseConnection";
const app = express();
app.use(express.json());

const databaseConnection =  new MysqlDatabaseConnection()

const accountDao =  new AccountDatabaseDao(databaseConnection)

const signup =  new Signup(accountDao)

app.post("/signup", async function (req, res) {
 const response = await signup.execute(req.body);
 // @ts-ignore
  return response < 0? res.status(422).send(response) :res.json(response)
});

app.listen(3001);