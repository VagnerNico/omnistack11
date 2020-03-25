import { Request, Response } from 'express';
import connection from '../database/connection';

export async function index(request: Request, response: Response) {
  const ong_id = request.headers.authorization;
  const incidents = await connection('incidents').where('ong_id', ong_id).select('*');

  return response.json(incidents);
}
