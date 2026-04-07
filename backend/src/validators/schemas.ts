import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const schema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  try {
    schema.parse(req.body);
    return next();
  } catch (error: any) {
    return res.status(400).json({ errors: error.issues || error.errors || [{ message: error.message }] });
  }
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const schema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  try {
    schema.parse(req.body);
    return next();
  } catch (error: any) {
    return res.status(400).json({ errors: error.issues || error.errors || [{ message: error.message }] });
  }
};

export const validateGenerate = (req: Request, res: Response, next: NextFunction) => {
  const schema = z.object({
    topic: z.string().min(3, 'Topic must be at least 3 characters'),
    platform: z.enum(['twitter', 'instagram', 'facebook', 'linkedin']),
    persona: z.string().min(3, 'Persona must be at least 3 characters'),
  });

  try {
    schema.parse(req.body);
    return next();
  } catch (error: any) {
    return res.status(400).json({ errors: error.issues || error.errors || [{ message: error.message }] });
  }
};

