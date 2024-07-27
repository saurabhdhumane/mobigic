const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/file_upload_project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));


app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
