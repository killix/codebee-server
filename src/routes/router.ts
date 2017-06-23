import { Router } from 'express';

import GraphQL from './GraphQL';

const router = Router();

router.use('/', GraphQL);

// send index.html
// router.get('/*', (req, res) => {
//   res.sendFile('index.html', { root: '../web/dist' });
// });

export default router;
