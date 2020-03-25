import express from 'express';
import * as SessionController from './controllers/SessionController';
import * as OngController from './controllers/OngController';
import * as IncidentsController from './controllers/IncidentController';
import * as PorfileController from './controllers/ProfileController';

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', PorfileController.index);

routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.deleteIncident);

export default routes;
