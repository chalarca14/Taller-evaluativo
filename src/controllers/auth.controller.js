import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const JWT_SECRET = process.env.JWT_SECRET;

// -------------------------------------------------------------
// CONTROLADOR: REGISTRO DE USUARIO (SIGNUP)
// -------------------------------------------------------------
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    
    // 1. Verificar si el usuario ya existe
    const userExists = await prisma.users.findUnique({
      where: { email }
    });
    console.log("----------------------------");

    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // 2. Hashear la contraseña
    // bcrypt.hash(contraseña, número_de rondas)
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("----------------------------");
    
    // 3. Crear el usuario en la base de datos
    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword
      }
    });

    // 4. Generar un token JWT para el usuario recién creado
    const token = jwt.sign(
      { userId: newUser.id },   // Payload (lo que viaja dentro del token)
      JWT_SECRET,               // Clave secreta
      { expiresIn: '1h' }       // Tiempo que dura el token
    );

    // 5. Devolver usuario + token
    return res.status(201).json({
      message: 'Usuario creado correctamente',
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

// -------------------------------------------------------------
// CONTROLADOR: INICIO DE SESIÓN (LOGIN)
// -------------------------------------------------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Buscar usuario por email
    const user = await prisma.users.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // 2. Comparar contraseña ingresada vs contraseña hasheada en BD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // 3. Generar token
    const token = jwt.sign(
      { userId: user.id },     // Payload
      JWT_SECRET,              // Clave secreta
      { expiresIn: '1h' }      // Tiempo de expiración
    );

    // 4. Responder con token
    return res.json({
      message: 'Inicio de sesión exitoso',
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};