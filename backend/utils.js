const { google } = require("googleapis");
const multer = require("multer");
const { PassThrough } = require('stream')
const keyfile= require('./googleCredentials.json');
const upload = multer({
    storage: multer.memoryStorage(),
    // limiting the max file size of uploaded file
    limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) }
});

exports.parseFile = upload.single('doc');

//uploads file to google drive folder and returns metadata of file
exports.uploadToDrive = async (file) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: './googleCredentials.json',
        scopes: ['https://www.googleapis.com/auth/drive'],
    });
    const service = google.drive({ version: 'v3', auth });
    let parsedFile = new PassThrough().end(file.buffer);
    try {
        const uploadedFile = await service.files.create({
            requestBody: {
                name: `${file.originalname}`,
                parents: [process.env.GOOGLE_API_FOLDER_ID]
            },
            media: {
                mimeType: `${file.mimetype}`,
                body: parsedFile,
            }
        });
        let uniqueId = uploadedFile.data.id;
        return uniqueId;
    } catch (error) {
        console.log(error)
        throw error;
    }

}
