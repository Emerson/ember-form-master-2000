import config from './config/environment';
import EmberRouter from '@ember/routing/router';

var Router = EmberRouter.extend({
  location: config.locationType
});

Router.map(function() {
});

export default Router;
