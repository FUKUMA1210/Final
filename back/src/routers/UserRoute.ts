import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();
const userController = new UserController();


router.get("/", async (req, res) => {
  await userController.getAllUsers(req, res);
});

router.post("/", async (req, res) => {
  await userController.addUser(req, res);
});

export default router;
