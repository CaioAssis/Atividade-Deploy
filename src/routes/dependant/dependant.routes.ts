import { Router } from 'express'
import DependantController from '../../controllers/dependant/dependant.controller'
import authMiddleware from '../../middlewares/auth.middleware'

const dependantRoutes = Router()

dependantRoutes.post('/', authMiddleware, DependantController.store)
dependantRoutes.get('/', authMiddleware, DependantController.index)
dependantRoutes.get('/:id', authMiddleware, DependantController.show)
dependantRoutes.delete('/:id', authMiddleware, DependantController.delete)
dependantRoutes.put('/:id', authMiddleware, DependantController.update)

export default dependantRoutes