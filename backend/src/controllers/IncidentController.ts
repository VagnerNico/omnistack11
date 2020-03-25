import { Request, Response } from 'express';
import connection from '../database/connection';

export async function index(request: Request, response: Response) {
  const { page = 1 } = request.query;

  const [count] = await connection('incidents').count();

  const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select([
      'incidents.*',
      'ongs.city',
      'ongs.email',
      'ongs.name',
      'ongs.uf',
      'ongs.whatsapp',
    ]);

  response.header('X-Total-Count', count['count(*)']);

  return response.json(incidents);
};

export async function create(request: Request, response: Response) {
  const { description, title, value } = request.body;
  const ong_id = request.headers.authorization;
  const [id] = await connection('incidents').insert({
    description,
    ong_id,
    title,
    value,
  });

  return response.json({ id });
};

export async function deleteIncident(request: Request, response: Response) {
  const { id } = request.params;
  const ong_id = request.headers.authorization;

  const incident = await connection('incidents').where('id', id).select('ong_id').first();
  if (incident.ong_id !== ong_id) {
    return response.status(401).json({
      error: 'Operation not permitted.'
    });
  }
  await connection('incidents').where('id', id).delete();
  return response.status(204).send();
}
