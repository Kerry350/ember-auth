export default {
    name: 'session',

    initialize: function(container, application) {
        ['route', 'controller', 'component', 'adapter'].forEach(function(item) {
            application.inject(item, 'session', 'service:session');
        });
    }
};

