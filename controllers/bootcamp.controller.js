const Bootcamp = require('../models/bootcamp.model'); 
const User = require('../models/user.model'); 

// Crear y guardar un nuevo Bootcamp
exports.createBootcamp = async (req, res) => {
  try {
    const { name, description, location } = req.body;

    // Crear el nuevo Bootcamp
    const bootcamp = await Bootcamp.create({
      name,
      description,
      location,
    });

    res.status(201).json(bootcamp);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el Bootcamp', error: err.message });
  }
};

// Agregar un usuario al Bootcamp
exports.addUser = async (req, res) => {
  try {
    const bootcampId = req.params.bootcampId;
    const userId = req.params.userId;

    const bootcamp = await Bootcamp.findByPk(bootcampId);
    const user = await User.findByPk(userId);

    if (!bootcamp || !user) {
      return res.status(404).json({ message: 'Bootcamp o usuario no encontrado' });
    }

    // Agregar el usuario al Bootcamp (relación muchos a muchos)
    await bootcamp.addUser(user);

    res.status(200).json({ message: 'Usuario agregado al Bootcamp' });
  } catch (err) {
    res.status(500).json({ message: 'Error al agregar el usuario al Bootcamp', error: err.message });
  }
};

// Obtener un Bootcamp por ID
exports.findById = async (req, res) => {
  try {
    const bootcampId = req.params.id;

    // Obtener el Bootcamp con sus usuarios asociados
    const bootcamp = await Bootcamp.findByPk(bootcampId, {
      include: User  // Incluir los usuarios asociados al Bootcamp
    });

    if (!bootcamp) {
      return res.status(404).json({ message: 'Bootcamp no encontrado' });
    }

    res.status(200).json(bootcamp);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el Bootcamp', error: err.message });
  }
};

// Obtener todos los Bootcamps incluyendo los usuarios
exports.findAll = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll({
      include: User  // Incluir los usuarios asociados a los Bootcamps
    });

    res.status(200).json(bootcamps);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los Bootcamps', error: err.message });
  }
};



