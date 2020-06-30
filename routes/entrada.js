import routerx from 'express-promise-router';
import EntradaController from  '../controllers/EntradaController';
import auth from '../middlewares/auth';

//cria um objeto
const router = routerx();

router.post('/add',auth.verifySupervisor,EntradaController.add);
router.get('/query',auth.verifySupervisor,EntradaController.query);
router.get('/list',auth.verifySupervisor,EntradaController.list);
router.get('/grafico12Meses',auth.verifyUsuario,EntradaController.grafico12Meses);
router.get('/consultaPorDatas',auth.verifySupervisor,EntradaController.consultaPorDatas);
/*
router.put('/update',auth.verifySupervisor,EntradaController.update);
router.delete('/remove',auth.verifySupervisor,EntradaController.remove);
*/
router.put('/activate',auth.verifySupervisor,EntradaController.activate);
router.put('/desactivate',auth.verifySupervisor,EntradaController.desactivate);

export default router;

