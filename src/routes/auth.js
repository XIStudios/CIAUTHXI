import express from 'express';
import { register, login, authorize, token } from '../controllers/authController.js';
import { customRegister, customLogin } from '../../ciauthcode/api/colhere/customAuth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/authorize', authorize);
router.post('/token', token);

// Custom endpoints using ciaethcode
router.post('/custom-register', customRegister);
router.post('/custom-login', customLogin);

export default router;
