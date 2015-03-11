import AuthenticationService from './../services/authentication';

export default {
    name: 'authentication',

    initialize: function(container, application) {
        application.register('authentication:main', AuthenticationService);

        ['route', 'controller', 'component', 'adapter'].forEach(function(item) {
            application.inject(item, 'authentication', 'authentication:main');
        });
    }
};

