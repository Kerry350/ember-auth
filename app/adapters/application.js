import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'api',

  headers: function() {
    return {
      "Authorization" : "Token " + this.get('session.token')
    };
  }.property('session.token')
});

