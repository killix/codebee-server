import { Router } from 'express';
import * as helmet from 'helmet';

import GraphQL from './GraphQL';

const router = Router();

router.use(helmet());
router.use('/', GraphQL);

// send index.html
// router.get('/*', (req, res) => {
//   res.sendFile('index.html', { root: '../web/dist' });
// });

export default router;
