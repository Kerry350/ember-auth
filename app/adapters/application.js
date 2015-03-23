import DS from 'ember-data';

var ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'api/v1'
});

export default ApplicationAdapter;
