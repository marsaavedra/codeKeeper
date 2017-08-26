module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 20]
      }
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 20]
      }
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Snips, {
      onDelete: "cascade"
    });
  };

  User.associate = function(models) {
    User.hasMany(models.Bookmarks, {
      onDelete: "cascade"
    });
  };

  return User;
};