module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });


    User.associate = function(models) {
    User.hasMany(models.Snips, {
      onDelete: "cascade"
    });
  };

  return User;
};