import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";

const router = express.Router();

router.post("/login", async (req, res) =>{
    const { email, password} = req.body;
    const user = await Prisma.user.findUnique({
        where: {email}
    });

    if (!user) {
        return res.status(401).json({ message: "Credenciales invalidas"});
    }

    const isValid =await bcrypt.compare(password, user.password); 

    if (!isValid) {
        return res.status(401).json({ message: "Credenciales invalidas"});
    }

    const token = jwt.sign( {sub: user.id}, process.env.JWT_SECRET, { expiresIn: "h1"});

    res.json({ Token })
});

export default router;

