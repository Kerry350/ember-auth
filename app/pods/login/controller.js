import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        login: function() {
            var props = this.getProperties('email', 'password');

            this.authentication
                .authenticate(props)
                .then(function() {
                  if (this.authentication.get('previouslyAbortedTransition')) {
                    this.authentication.get('previouslyAbortedTransition').retry();
                    this.authentication.set('previouslyAbortedTransition', null);
                  } else {
                    this.transitionToRoute('settings');
                  }
                }.bind(this))
                .catch(function() {
                  // Show an error of some sort
                });
        }
    }
});
