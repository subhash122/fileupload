const mysql = require('mysql2/promise');

class FilesModel {
    constructor() {
        const DATABASE_CONFIG = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SCHEMA,
            waitForConnections: true,
            connectionLimit: 5,
        }
        this.pool = mysql.createPool(DATABASE_CONFIG)
    }

    async saveFile(fileId, fileName) {
        let link = `https://drive.google.com/uc?id=${fileId}`;
        let query = 'INSERT INTO files ( id, file_link,file_name) VALUE (?,?,?)';
        try {
            let response = await this.pool.query(query, [fileId, link, fileName]);
        } catch (error) {
            throw error;
        }
    }

    async fetchFile(fileid) {
        let connection;
        let query = 'SELECT file_link,file_name FROM files WHERE id = ?'
        try {
            connection = await this.pool.getConnection();
            let [rows, feilds] = await connection.query(query, [fileid]);
            let fileLink = rows[0].file_link;
            let fileName = rows[0].file_name;
            return {
                fileLink,
                fileName,
            }
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }
}

module.exports = new FilesModel();