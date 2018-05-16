import childProcess from 'child_process'

export default (app) => {
  try {
    app.locals.commit = childProcess.execSync('git rev-parse HEAD').toString().trim().substr(0, 8);
  } catch(e) {
    app.locals.commit = Date.now();
  }
};
