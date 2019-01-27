const path = require('path');
const users = require('./user');
const { mergeSchemas } = require('graphql-tools');


module.exports = mergeSchemas({
    schemas: [
        users
    ],
});