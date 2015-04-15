import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        login: function() {
            var props = this.getProperties('email', 'password');

            this.session
            .authenticate(props)
            .then(function() {
              if (this.session.get('previouslyAbortedTransition')) {
                this.session.get('previouslyAbortedTransition').retry();
                this.session.set('previouslyAbortedTransition', null);
              } else {
                this.transitionToRoute('protected');
              }
            }.bind(this))
            .catch(function() {
              // Show an error of some sort
            });
        }
    }
});
