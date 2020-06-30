import routerx from 'express-promise-router';
import artigoController from  '../controllers/ArtigoController';
import auth from '../middlewares/auth';

//cria um objeto
const router = routerx();

router.post('/add',auth.verifySupervisor,artigoController.add);
router.get('/query',auth.verifySupervisor,artigoController.query);
router.get('/queryCodigo',auth.verifyUsuario,artigoController.queryCodigo);
router.get('/list',auth.verifySupervisor,artigoController.list);
router.put('/update',auth.verifySupervisor,artigoController.update);
router.delete('/remove',auth.verifySupervisor,artigoController.remove);
router.put('/activate',auth.verifySupervisor,artigoController.activate);
router.put('/desactivate',auth.verifySupervisor,artigoController.desactivate);

export default router;

