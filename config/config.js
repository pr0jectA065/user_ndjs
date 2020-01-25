module.exports = {
    secret: 'salted-hash'
};


var config = {
    production: {
        notifications: {
            endpoint: "localhost:4000",
            from_email: 'pr0jecta065@gmail.com'
        }
    },
    default: {
        notifications: {
            endpoint: "localhost:4000",
            from_email: 'pr0jecta065@gmail.com'
        }
    },
    development: {
        notifications: {
            endpoint: "localhost:4000",
            from_email: 'pr0jecta065@gmail.com'
        }
    }
}

module.exports.get = function get(env) {
    return config[env] || config.default;
}