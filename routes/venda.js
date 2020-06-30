import routerx from 'express-promise-router';
import vendaController from '../controllers/VendaController';
import auth from '../middlewares/auth';

const router=routerx();

router.post('/add',auth.verifyVendedor,vendaController.add);
router.get('/query',auth.verifyVendedor,vendaController.query);
router.get('/list',auth.verifyVendedor,vendaController.list);
router.get('/grafico12Meses',auth.verifyUsuario,vendaController.grafico12Meses);
router.get('/consultaPorDatas',auth.verifyUsuario,vendaController.consultaPorDatas);
/*
router.put('/update',auth.verifyAlmacenero,vendaController.update);
router.delete('/remove',auth.verifyAlmacenero,vendaController.remove);
*/
router.put('/activate',auth.verifyVendedor,vendaController.activate);
router.put('/desactivate',auth.verifyVendedor,vendaController.desactivate);

export default router;