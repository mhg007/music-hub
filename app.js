const express = require('express')
const mongoose = require("mongoose")

const albums = require('./routes/albums');
const artists = require('./routes/artists');
const songs = require('./routes/songs');
const genres = require('./routes/genre');
const userRoutes = require('./routes/users')

const app = express();

app.use(express.json());
mongoose.connect('mongodb+srv://tequila:tequila123@cluster0.w66jz.mongodb.net/music-hub-api?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => app.listen(3000))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.set('view engine','ejs')

app.use(express.static('public'));

app.use('/api/albums', albums);
app.use('/api/artists', artists);
app.use('/api/songs', songs);
app.use('/api/genres', genres);
app.use('/api/users', userRoutes);

// Default route for health check
app.get('/', (req, res) => {
  res.send('Welcome to the Music Hub API!');
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});