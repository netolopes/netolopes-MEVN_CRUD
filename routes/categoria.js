import routerx from 'express-promise-router';
import categoriaController from  '../controllers/CategoriaController';
import auth from '../middlewares/auth';

//cria um objeto
const router = routerx();

router.post('/add',auth.verifySupervisor,categoriaController.add);
//router.post('/add',categoriaController.add);
router.get('/query',auth.verifySupervisor,categoriaController.query);
router.get('/list',auth.verifySupervisor,categoriaController.list);
router.put('/update',auth.verifySupervisor,categoriaController.update);
router.delete('/remove',auth.verifySupervisor,categoriaController.remove);
router.put('/activate',auth.verifySupervisor,categoriaController.activate);
router.put('/desactivate',auth.verifySupervisor,categoriaController.desactivate);

export default router;

