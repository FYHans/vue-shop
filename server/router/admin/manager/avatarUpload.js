const { MESSAGE, ROOT, UPLOAD_CACHE_DIR, UPLOAD_SAVE_DIR } = require('../../tools');
const path = require('path');
const fs = require('fs');
const Formidable = require('formidable');
module.exports = (req, res) => {
    // 实例化
    const form = new Formidable();
    // 更改缓存路径
    form.uploadDir = path.join(ROOT, UPLOAD_CACHE_DIR);
    // 解析req对象
    form.parse(req, (err, fileds, files) => {
        if (err) {
            return res.join(MESSAGE.uploadParseError);
        }
        // 定义图片的更改路径
        const filePath = UPLOAD_SAVE_DIR +
            path.parse(files.file.path).name.split('_')[1] +
            path.extname(files.file.name);
        // 更换图片位置
        fs.renameSync(files.file.path, path.join(ROOT, filePath), err => {
            if (err) {
                return res.json(MESSAGE.saveUploadError);
            }
            // 返回消息
            res.json({ errno:0, img: filePath})
        })
    })
}