const express = require('express');
const router = express.Router();
const servicosController = require('./../controllers/servicosController');

router.get('/servicos', servicosController.index)
router.get('/servicos/cadastro', servicosController.store)
router.post('/servicos', servicosController.save)
router.get('/servicos/:id/edit', servicosController.edit)
router.put('/servicos/:id', servicosController.update)
router.delete('/servicos/:id', servicosController.delete)


// router.route('/servicos')
//     .get('', servicosController.index)
//     .get('/cadastro', servicosController.store)
//     .post('', servicosController.save)
//     .get('/:id/edit', servicoController.edit)
//     .put('/:id', servicoController.update)
//     .delete('/:id', servicoController.delete)



module.exports = router;
