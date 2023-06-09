const mysql = require('mysql2');

class FilesModel {
    constructor() {
        const DATABASE_CONFIG = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SCHEMA,
        }
        this.connection = mysql.createConnection(DATABASE_CONFIG).promise();
    }

    async saveFile(fileId, fileName) {
        let link = `https://drive.google.com/uc?id=${fileId}`;
        let query = 'INSERT INTO files ( id, file_link,file_name) VALUE (?,?,?)';
        try {
            let response = await this.connection.query(query, [fileId, link, fileName]);
        } catch (error) {
            throw error;
        }
    }

    async fetchFile(fileid) {
        let query = 'SELECT file_link,file_name FROM files WHERE id = ?'
        try {
            let [rows, feilds] = await this.connection.query(query, [fileid]);
            let fileLink = rows[0].file_link;
            let fileName = rows[0].file_name;
            return {
                fileLink,
                fileName,
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new FilesModel();