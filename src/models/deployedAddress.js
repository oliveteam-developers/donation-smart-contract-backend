const db = require('../config/database');

const table = 'deployed_address';

const create = (data) => {
    return new Promise((resolve, reject) => {
        if (data) {
            db.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        }
    });
}

module.exports = {
    create: create
}