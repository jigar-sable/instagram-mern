const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);

const deleteFile = async (dirpath, file) => {
    await unlinkAsync(path.join(__dirname, '../../public/uploads/', dirpath) + file)
}

module.exports = deleteFile