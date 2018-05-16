import Commit from './commit'
import Redux from './redux'

import JsonResponse from 'server/utils/json-response'

export default function(app) {
  app.response.json = JsonResponse(app.response.json)
  Commit(app)
  Redux(app)
}
