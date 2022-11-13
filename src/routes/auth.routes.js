import { Router }   from 'express';
const router = Router();

import * as authCtrl from '../controllers/auth.controller.js';
import { verifySignup } from '../middlewares/index.js';


router.post('/signup',[
    verifySignup.checkDuplicateUsernameOrEmail,
    verifySignup.checkRolesExisted   
],authCtrl.signUp);
router.post('/signin',authCtrl.signIn);
router.get('/profile',)



export default router;
