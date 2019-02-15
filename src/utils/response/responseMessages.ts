import errors from './errors';

let messages = {
    1: {
        msg: 'Phone or password is incorrect',
        detail: 'response://wwww.taxi.com/api/doc/client2'
    },
    2: {
        msg: 'User not found'
    },
    3: {
        auth: false,
        msg: 'No token provided.'
    },
    4: {
        msg: 'No user found for the given token.'
    },
    5: {
        msg: 'Missing authentication credentials.'
    },
    6: {
        msg: 'Page not found.'
    },
    7: {
        msg: 'Image does\'t exist.'
    },
    8: {
        msg: 'File mimeType isn\'t correct.'
    }
}

messages[errors.USER_ALREADY_EXISTS] = {
    msg: 'User already exists'
};

export default messages;