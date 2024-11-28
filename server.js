const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db.config');
const { User, Bootcamp } = require('./models');  // Asegúrate de que los modelos están correctamente importados
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// Conectar a la base de datos PostgreSQL
sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err.message);
  });

// Crear las tablas (si no existen) y luego insertar los usuarios y los Bootcamps
sequelize.sync({ force: false }).then(async () => {
  // Crear usuarios
  const usersData = [
    { firstName: 'Mateo', lastName: 'Díaz', email: 'mateo.diaz@correo.com' },
    { firstName: 'Santiago', lastName: 'Mejías', email: 'santiago.mejias@correo.com' },
    { firstName: 'Lucas', lastName: 'Rojas', email: 'lucas.rojas@correo.com' },
    { firstName: 'Facundo', lastName: 'Fernandez', email: 'facundo.fernandez@correo.com' }
  ];

  try {
    await User.bulkCreate(usersData);
    console.log('Usuarios creados con éxito');
  } catch (err) {
    console.error('Error al crear los usuarios:', err.message);
  }

  // Crear Bootcamps
const bootcampsData = [
  { title: 'Bootcamp React', description: 'Introducción al Bootcamp de React', cue: 10 },
  { title: 'Bootcamp Full Stack', description: 'Bootcamp de Desarrollo Web Full Stack', cue: 20 },
  { title: 'Bootcamp Big Data', description: 'Big Data, IA y Machine Learning', cue: 30 }
];


  try {
    await Bootcamp.bulkCreate(bootcampsData);
    console.log('Bootcamps creados con éxito');
  } catch (err) {
    console.error('Error al crear los Bootcamps:', err.message);
  }

  // Relacionar usuarios con Bootcamps (ejemplo de asignación)
  const bootcamp1 = await Bootcamp.findOne({ where: { title: 'Bootcamp Big Data' } });
  const bootcamp2 = await Bootcamp.findOne({ where: { title: 'Bootcamp React' } });
  const bootcamp3 = await Bootcamp.findOne({ where: { title: 'Bootcamp Full Stack' } });

  const user1 = await User.findOne({ where: { email: 'mateo.diaz@correo.com' } });
  const user2 = await User.findOne({ where: { email: 'santiago.mejias@correo.com' } });
  const user3 = await User.findOne({ where: { email: 'lucas.rojas@correo.com' } });

  // Asignando usuarios a los Bootcamps
  await bootcamp1.addUsers([user1, user2, user3]);
  await bootcamp2.addUsers([user1, user2]);
  await bootcamp3.addUsers([user1, user3]);
  console.log('Usuarios asignados a los Bootcamps');
});

// Rutas de ejemplo para interactuar con los controladores

// Consultar el Bootcamp por ID e incluir los usuarios
app.get('/bootcamp/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const bootcamp = await Bootcamp.findOne({
      where: { id },
      include: {
        model: User,
        through: { attributes: [] }  // Excluir la tabla intermedia
      }
    });

    if (bootcamp) {
      res.json(bootcamp);
    } else {
      res.status(404).json({ message: 'Bootcamp no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al consultar el Bootcamp', error: error.message });
  }
});

// Listar todos los Bootcamps con sus usuarios
app.get('/bootcamps', async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll({
      include: {
        model: User,
        through: { attributes: [] }
      }
    });
    res.json(bootcamps);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar los Bootcamps', error: error.message });
  }
});

// Consultar un usuario por ID, incluyendo los Bootcamps
app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id },
      include: {
        model: Bootcamp,
        through: { attributes: [] }
      }
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al consultar el Usuario', error: error.message });
  }
});

// Listar todos los usuarios con sus Bootcamps
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Bootcamp,
        through: { attributes: [] }
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar los Usuarios', error: error.message });
  }
});

// Actualizar el usuario por ID
app.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;

  try {
    const user = await User.findByPk(id);

    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el Usuario', error: error.message });
  }
});

// Eliminar un usuario por ID
app.delete('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (user) {
      await user.destroy();
      res.json({ message: `Usuario con id=${id} eliminado` });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el Usuario', error: error.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
