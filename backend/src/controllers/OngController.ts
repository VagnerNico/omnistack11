import { Request, Response } from 'express';
import crypto from 'crypto';
import connection from '../database/connection';

export async function index(request: Request, response: Response) {
  const ongs = await connection('ongs').select('*');
  return response.json(ongs);
};

export async function create(request: Request, response: Response) {
  const { city, name, email, whatsapp, uf } = request.body;
  const id = crypto.randomBytes(6).toString('HEX');

  await connection('ongs').insert({
    id,
    city,
    name,
    email,
    whatsapp,
    uf,
  });

  return response.json({ id });
};
