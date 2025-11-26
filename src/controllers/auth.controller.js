import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma  from "../prismaClient.js";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

export const login = async (req, res) => {
  const { email, password } = req.body;
  const users = await prisma.users.findUnique({
    where: { email },
  });

  if (!users) {
    return res.status(401).json({ message: "Credenciales invalidas" });
  }

  const isValid = await bcrypt.compare(password, users.password);

  if (!isValid) {
    return res.status(401).json({ message: "Credenciales invalidas" });
  }

  const token = jwt.sign({ sub: users.id }, process.env.JWT_SECRET, {
    expiresIn: "h1",
  });

  res.json({ token });
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }
    const existeusers = await prisma.users.findUnique({
      where: { email },
    });
    if (existeusers){
        return res.status(409).json({error: "Email already registered "});
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const users = await prisma.users.create({
        data: {
            email,
            password: hashedPassword,
        }
    });

    res.status(201).json({message: "users created", usersId: users.id})

  } catch (error) {
    res.status(500).json({error: "error creating user"})
  }
};
