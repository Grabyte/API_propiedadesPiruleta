// Importamos las librerías necesarias
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Habilitamos CORS para que nuestra API pueda ser consultada desde cualquier origen
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


// Definimos el puerto en el que nuestra API va a correr
const PORT = process.env.PORT || 5000;

// Ruteo para la raíz de la API
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'api.html'));
});

// Servimos las propiedades estáticas (json) desde el archivo
const propertiesData = require('./properties.json');

// Ruteo para obtener todas las propiedades
app.get('/api/properties', (req, res) => {
  res.json(propertiesData);
});

app.get('/api/properties/summary', (req, res) => {
  const summaryData = propertiesData.map(prop => ({
    id: prop.id,
    titulo: prop.titulo,
    precio: prop.precio,
    moneda: prop.moneda,
    ubicacion: prop.ubicacion.ciudad + ', ' + prop.ubicacion.provincia,
    imagen_destacada: prop.imagen_destacada,
    tipo: prop.tipo,
    operacion: prop.operacion
  }));

  res.json(summaryData);
});

// Ruteo para obtener una propiedad por ID
app.get('/api/properties/:id', (req, res) => {
  const propertyId = parseInt(req.params.id, 10);
  const property = propertiesData.find(prop => prop.id === propertyId);

  if (property) {
    res.json(property);
  } else {
    res.status(404).json({ message: 'Propiedad no encontrada' });
  }
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`API de propiedades corriendo en http://localhost:${PORT}`);
});
