module.exports = function(sequelize, DataTypes) {
  var Coder = sequelize.define("Coder", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    }

    Coder.associate = function(models) {
    Coder.hasMany(models.Snips, {
      onDelete: "cascade"
    });
  };

  return Coder;
};