import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'api',

  headers: function() {
    return {
      "Authorization" : "Bearer " + this.get('authentication.token')
    }
  }.property('authentication.token')
});

