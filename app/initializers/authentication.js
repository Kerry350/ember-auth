import config from './../config/environment';
import OAuth2 from 'simple-auth-oauth2/authenticators/oauth2';

export default {
  name: 'authentication',

  initialize: function() {
    OAuth2.reopen({
      makeRequest: function (url, data) {
        data.client_id = config.clientId; // The clientId which represents our application
        return this._super(url, data);
      }
    });
  }
}
