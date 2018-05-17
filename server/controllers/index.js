import Router from 'server/utils/router'
import ApiController from './api'

const router = Router()

router.use('/api', ApiController)

router.get('*', async (req, res, next) => {
  res.render('html')
})

export default router
