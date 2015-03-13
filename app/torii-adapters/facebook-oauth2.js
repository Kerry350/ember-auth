import Ember from 'ember';
import request from 'ic-ajax';

export default Ember.Object.extend({
  open: function(authorization) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      request('/api/auth/facebook', {
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(authorization)
      })
      .then(function(data) {
        resolve(data);
      })
      .catch(reject);
    });
  },

  close: function() {
    return Ember.RSVP.resolve();
  }
});
