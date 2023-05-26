const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Recipe",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      health_score: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      steps: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
