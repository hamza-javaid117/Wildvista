import express from "express";
import { loginUser } from "../controllers/login.controller.js";

const Loginrouter = express.Router();

Loginrouter.post("/login", loginUser);

export default Loginrouter;

