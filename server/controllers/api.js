import Router from 'server/utils/router'

const router = Router()

router.get('/regions', async (req, res, next) => {
  res.json(require('server/constants/regions.json'))
})
router.get('/constellations', async (req, res, next) => {
  res.json(require('server/constants/constellations.json'))
})
router.get('/systems', async (req, res, next) => {
  res.json(require('server/constants/systems.json'))
})
router.get('/maps', async (req, res, next) => {
  res.json(require('server/constants/maps.json'))
})

export default router
