import crypto from "crypto";
import express from "express";
import mysql from 'promise-mysql'
import { validateCpf as validate } from "./validateCpf";
const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
  let result;
  const connection = await  mysql.createConnection({
    user: 'root',
    password: 'root',
    database: 'app'
  })
  try {
    const id = crypto.randomUUID();

    const [acc] = await connection.query("select * from app.account where email = ?", [req.body.email]);
    console.log(acc);
    if (!acc) {

      if (req.body.name.match(/[a-zA-Z] [a-zA-Z]+/)) {
        if (req.body.email.match(/^(.+)@(.+)$/)) {

          if (validate(req.body.cpf)) {
            if (req.body.isDriver) {
              if (req.body.carPlate.match(/[A-Z]{3}[0-9]{4}/)) {
                await connection.query("insert into app.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values (?, ?, ?, ?, ?, ?, ?)", [id, req.body.name, req.body.email, req.body.cpf, req.body.carPlate, !!req.body.isPassenger, !!req.body.isDriver]);

                const obj = {
                  accountId: id
                };
                result = obj;
              } else {
                // invalid car plate
                result = -5;
              }
            } else {
              await connection.query("insert into app.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values (?, ?, ?, ?, ?, ?, ?)", [id, req.body.name, req.body.email, req.body.cpf, req.body.carPlate, !!req.body.isPassenger, !!req.body.isDriver]);

              const obj = {
                accountId: id
              };
              result = obj;
            }
          } else {
            // invalid cpf
            result = -1;
          }
        } else {
          // invalid email
          result = -2;
        }

      } else {
        // invalid name
        result = -3;
      }

    } else {
      // already exists
      result = -4;
    }
    if (typeof result === "number") {
      res.status(422).send(result + "");
    } else {
      res.json(result);
    }
  } finally {
    await connection.end()
  }
});

app.listen(3000);