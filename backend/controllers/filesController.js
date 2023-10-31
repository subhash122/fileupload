const filesDao = require('../dao/filesDao.js')
const { uploadToDrive } = require('../utils.js')
const axios = require('axios')
const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

class FilesController {

    static async uploadFile(req, res, next) {
        let file = req.file;
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'no file found.please provide the file' });
            }

            if (!allowedTypes.includes(file.mimetype)) {
                return res.status(400).json({ error: 'Invalid file type. please provide valid file' });
            }
            let fileId = await uploadToDrive(file);
            await filesDao.saveFile(fileId, file.originalname);
            let downloadLink = `${req.protocol}://${req.get('host')}/file/${fileId}`
            res.status(200).json({
                fileLink: downloadLink,
            })
        } catch (error) {
            res.status(500).json({ message: error.toString() })
        }

    }

    static async getFile(req, res, next) {
        let fileId = req.params.id;

        try {
            if (!fileId) {
                return res.status(400).json({ error: 'Please provide the proper file path.' });
            }
            const { fileLink, fileName } = await filesDao.fetchFile(fileId);
            const response = await axios.get(fileLink, {
                responseType: 'stream',
            });

            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
            res.setHeader('Content-Type', response.headers['content-type']);
            response.data.pipe(res);
        }
        catch (error) {
            res.status(500).json({ message: error.toString() })
        }
    }
}

module.exports = FilesController;