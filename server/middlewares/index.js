import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import Redux from './redux'
import favicon from './favicon'
import Authentication from './authentication'
import Commit from './commit'
import DtmUrl from './dtm-url'

import JsonResponse from 'server/utils/json-response'

export default function(app) {
  app.response.json = JsonResponse(app.response.json)
  favicon(app)
  Commit(app)
  DtmUrl(app)
  app.use(bodyParser.json({limit: '10mb'}));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  Authentication(app)
  Redux(app)
}
