import { Request, Response, Router } from 'express';
import UserService from '../services/userService';
import UserDatabaseRepository from '../infra/repository/database/UserDatabaseRepository';
import { auth } from '../middleware/authMiddleware';
import { getErrorMessage } from '../utils/errorUtil';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    try {
        const userRepository = new UserDatabaseRepository();
        const userService = new UserService(userRepository)
        const foundUser = await userService.login(req.body);
        res.status(200).send(foundUser);
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: getErrorMessage(error)
        });
    }
})

router.get('/', auth, async (req: Request, res: Response) => {
    try {
        const userRepository = new UserDatabaseRepository();
        const userService = new UserService(userRepository);
        const users = await userService.list();
        res.status(200).send(users);
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: getErrorMessage(error)
        });
    }
})


router.post('/', auth, async (req: Request, res: Response) => {
    try {
        if (!req.token) throw new Error("Token is not found")
        const userRepository = new UserDatabaseRepository();
        const userService = new UserService(userRepository)
        await userService.create(req.token, req.body);
        res.status(200).send('Inserted successfully');
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: getErrorMessage(error)
        });
    }
})


router.delete('/:id', auth, async (req: Request, res: Response) => {
    try {
        if (!req.token) return
        const userRepository = new UserDatabaseRepository();
        const userService = new UserService(userRepository)
        const users = await userService.remove(req.token, req.params.id);
        res.status(200).send(users);
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: getErrorMessage(error)
        });
    }
})


export { router as userController }