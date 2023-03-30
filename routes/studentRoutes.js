const router = require('express').Router();
const studentController = require('../controllers/studentController');

router.post('', studentController.createStudent);
router.get('', studentController.getAll);
router.get('/search/:search', studentController.getByEmail);
router.post('/assign-subject/:id', studentController.assignSubject);
router.get('/:id', studentController.getOne);
router.patch('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);


module.exports = router; 
 