const router = require('express').Router();
const teacherController = require('../controllers/teacherController');

router.post('', teacherController.createTeacher);
router.get('', teacherController.getAll);
router.post('/assign-subject/:id', teacherController.assignSubject);
router.get('/:id', teacherController.getOne);
router.patch('/:id', teacherController.updateTeacher);
router.delete('/:id', teacherController.deleteTeacher);


module.exports = router;
 