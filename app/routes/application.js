import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    logout: function() {
      this.get('session').invalidate();
    },

    loginWithThirdParty: function(provider) {
      this.get('session').authenticate('authenticator:torii-provider', {
        torii: this.get('torii'),
        provider: provider
      });
    }
  }
});
