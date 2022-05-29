'use strict';

class ClientUtils {
    isAN(value) {
        return !isNaN(value) && (value instanceof Number||typeof value === 'number');
    };
}

module.exports = new ClientUtils();