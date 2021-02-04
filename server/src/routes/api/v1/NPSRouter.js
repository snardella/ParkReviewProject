import express from "express";

import OpenNPSClient from "../../../apiClient/OpenNPSClient.js";

const NPSRouter = new express.Router();

NPSRouter.get("/", (req, res) => {
  OpenNPSClient.getNPSData().then((data) => {
    if (data.error) {
      console.log(`Error from Open NPS: ${data.error}`);
    } else {
      const parsedResponse = JSON.parse(data);
      res.set({ "Content-Type": "application/json" }).status(200).json(parsedResponse);
    }
  });
});

export default NPSRouter;
