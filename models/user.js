module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
     name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 20],
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6,100]
      }
    }
  });

   User.associate = function(models) {
     User.hasMany(models.Snips, {
       onDelete: "cascade"
     });
    };

  return User;
};