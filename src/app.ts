import "reflect-metadata";
import { Request, Response } from "express";
import { createConnection } from "typeorm";

import { Maestro } from "./entity/Maestro";
import { Turno } from "./entity/Turno";
import { Grupo } from "./entity/Grupo";
const express = require("express");
const app = express();
const port = 3000;
const host = "localhost";
const swipl = require("swipl");
const cors = require("cors");
createConnection().then(async (connection) => {
  app.use(express.json());
  app.use(cors());
  app.get("/", async (req: Request, res: Response) => {
    try {
      const goal = "maestros(X).";
      const ret = swipl.call(`consult(src/main)`);
      res.send(swipl.call(goal));
    } catch (error) {
      res.send(error);
    }
  });

  app.get("/maestros", async (req: Request, res: Response) => {
    try {
      const { grupo } = req.query;
      let where = {};
      if (grupo) where = { grupo };

      const maestrosRepository = connection.getRepository(Maestro);
      const maestros = await maestrosRepository.find({ where });
      res.send(maestros);
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  });

  app.get("/turnos", async (req: Request, res: Response) => {
    try {
      const turnosRepository = connection.getRepository(Turno);
      const turnos = await turnosRepository.find();
      res.send(turnos);
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  });

  app.get("/grupos", async (req: Request, res: Response) => {
    try {
      const { turno } = req.query;
      let where = {};
      if (turno) where = { turno };

      const gruposRepository = connection.getRepository(Grupo);
      const grupos = await gruposRepository.find(where);
      res.send(grupos);
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  });

  app.listen(port, host, () => {
    console.log(`App Listening at http://${host}:${port}`);
  });
});
