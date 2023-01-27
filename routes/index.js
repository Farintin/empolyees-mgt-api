const Router = require('express-promise-router')

// const adminAuth = require('../adminAuth.js')

const router = new Router()
const {validateEmployeeBody, schemas } = require('../handlers/routeHandler')
const Controller = require('../controllers/admin')



// router.route('/auth')
  // .post(validateAdminBody(schemas.adminAuth), Controller.signup)
// router.route('/auth')
  // .post(adminAuth.authenticate('local', { session: false }), validateAdminBody(schemas.adminAuth), Controller.signin)
router.route('/employees')
  .post(validateEmployeeBody(schemas.employeeBody), Controller.createEmployee)

// router.route('/admin')
  // .get(Controller.admin)
router.route('/employees')
  .get(Controller.employees)
router.route('/employees/:id')
  .get(Controller.employee)

router.route('/employees/:id')
  .put(validateEmployeeBody(schemas.employeeBody), Controller.updateEmployee)

router.route('/employees')
  .delete(Controller.deleteEmployees)
router.route('/employees/:id')
  .delete(Controller.deleteEmployee)



module.exports = router