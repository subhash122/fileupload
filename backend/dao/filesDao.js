const File = require("../models/fileModel");

class filesDao {

    async saveFile(fileId, fileName) {
        let link = `https://drive.google.com/uc?id=${fileId}`;
        try {
            const file = await File.create({ id: fileId, file_name: fileName, file_link: link });
        } catch (error) {
            throw error;
        }
    }

    async fetchFile(fileid) {
        try {
            const fetchedFile = await File.findOne({ where: { id: fileid } });
            const { file_link, file_name } = fetchedFile.dataValues
            return {
                fileLink: file_link,
                fileName: file_name
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new filesDao();