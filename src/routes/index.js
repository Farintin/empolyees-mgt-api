const Router = require('express-promise-router')

const adminAuth = require('../adminAuth.js')

const router = new Router()
const { validateAdminBody, validateEmployeeBody, schemas } = require('../handlers/routeHandler')
const Controller = require('../controllers/admin')



// router.route('/auth')
  // .post(validateAdminBody(schemas.adminAuth), Controller.signup)
router.route('/auth')
  .post(adminAuth.authenticate('local', { session: false }), validateAdminBody(schemas.adminAuth), Controller.signin)
router.route('/employees')
  .post(adminAuth.authenticate('jwt', { session: false }), validateEmployeeBody(schemas.employeeBody), Controller.createEmployee)

router.route('/admin')
  .get(adminAuth.authenticate('jwt', { session: false }), Controller.admin)
router.route('/employees')
  .get(adminAuth.authenticate('jwt', { session: false }), Controller.employees)
router.route('/employees/:id')
  .get(adminAuth.authenticate('jwt', { session: false }), Controller.employee)

router.route('/employees/:id')
  .put(adminAuth.authenticate('jwt', { session: false }), validateEmployeeBody(schemas.employeeBody), Controller.updateEmployee)

router.route('/employees')
  .delete(adminAuth.authenticate('jwt', { session: false }), Controller.deleteEmployees)
router.route('/employees/:id')
  .delete(adminAuth.authenticate('jwt', { session: false }), Controller.deleteEmployee)



module.exports = router