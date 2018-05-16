import Router from 'server/utils/router'

const router = Router()

router.get('*', async (req, res, next) => {
  res.render('html')
})

export default router
