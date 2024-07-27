const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const File = require('../model/File');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs=require("fs")
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadsFiles/');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Upload File
router.post('/upload', [auth, upload.single('file')], async (req, res) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        const newFile = new File({
            filename: req.file.filename,
            code,
            user: req.user.id,
        });

        await newFile.save();
        res.json({ msg: 'File uploaded', code });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get User Files
router.get('/', auth, async (req, res) => {
    try {
        const files = await File.find({ user: req.user.id });
        res.json(files);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete File
router.delete('/:filename', auth, async (req, res) => {
    try {
        const filename = req.query.filename; 
        console.log('filename',filename);
        if (!filename) {
            return res.status(400).json({ msg: 'Filename is required' });
        }

        const file = await File.findOne({ filename });

        if (!file) return res.status(404).json({ msg: 'File not found' });

        if (file.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Remove the file from the database
        await File.deleteOne({ filename });

        // Remove the file from the file system
        const filePath = path.join(__dirname, `../uploadsFiles/${filename}`);
        console.log('Filepath ',filePath);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error removing file from file system:', err);
                return res.status(500).send('Error removing file from file system');
            }
            res.json({ msg: 'File removed' });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Download File
router.post('/download/:filename', async (req, res) => {
    try {
        console.log('req.query.filename',req.query.filename);
        const file = await File.findOne({filename:req.query.filename});
        console.log('file ',file);
        if (!file) return res.status(404).json({ msg: 'File not found' });

        if (req.body.code !== file.code) {
            return res.status(401).json({ msg: 'Invalid code' });
        }

        res.download(`uploadsFiles/${file.filename}`);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
