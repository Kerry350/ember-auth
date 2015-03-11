import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('pets');
  this.route('settings');
  this.route('login');
  this.route('logout');
});

export default Router;
