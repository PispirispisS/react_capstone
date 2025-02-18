const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToMongo = require('./db');

const app = express();
const PORT = process.env.PORT || 8181;

// Configuración del motor de vistas (si lo necesitas)
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Middleware
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
connectToMongo();

// Rutas API
app.use('/api/auth', require('./routes/auth'));

// ⚡ Servir archivos estáticos desde `build` para producción
app.use(express.static(path.join(__dirname, 'build')));

// Manejo de rutas desconocidas (redirige a `index.html`)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port http://localhost:${PORT}`);
});
