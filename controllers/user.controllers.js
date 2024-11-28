// Crear y guardar usuario
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body; // Corrige para usar el nombre correcto en el modelo

    // Crear el nuevo usuario
    const user = await User.create({
      firstName,
      lastName,
      email
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el usuario', error: err.message });
  }
};

