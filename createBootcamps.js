const { Bootcamp } = require('./models'); // Asegúrate de importar correctamente el modelo

const bootcamps = [
  {
    title: 'Introduciendo El Bootcamp De React',
    cue: 10,
    description: 'React es la librería más usada en JavaScript para el desarrollo de interfaces.',
  },
  {
    title: 'Bootcamp Desarrollo Web Full Stack',
    cue: 12,
    description: 'Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS.',
  },
  {
    title: 'Bootcamp Big Data, Inteligencia Artificial & Machine Learning',
    cue: 18,
    description: 'Domina Data Science, Big Data, AI y ML.',
  },
];

async function createBootcamps() {
  try {
    // Crear los bootcamps
    await Bootcamp.bulkCreate(bootcamps);
    console.log('Bootcamps creados con éxito!');
  } catch (error) {
    console.error('Error al crear los Bootcamps:', error);
  }
}

createBootcamps();

