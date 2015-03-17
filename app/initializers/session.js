import Session from './../services/session';

export default {
  name: 'session',

  initialize: function(container, app) {
    app.register("session:main", Session);
    ['controller', 'route'].forEach(function(injectable) {
      app.inject(injectable, "session", "session:main");
    });
  }
}
