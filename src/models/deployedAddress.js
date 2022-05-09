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

const latest = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${table} ORDER BY id DESC LIMIT 1`, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0]);
            }
        });
    });
}

module.exports = {
    create: create,
    latest: latest,
}