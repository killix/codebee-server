import { Router } from 'express';

import graphql from './graphql';

const router = Router();

router.use('/', graphql);

// send index.html
// router.get('/*', (req, res) => {
//   res.sendFile('index.html', { root: '../web/dist' });
// });

export default router;
