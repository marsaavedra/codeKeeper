module.exports = function(sequelize, DataTypes) {
  var Snips = sequelize.define("Snips", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 200]
      }
    },

    snippet: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

    description: {
      type: DataTypes.STRING
    },

    language: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

    privacy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  });

  Snips.associate = function(models) {
     Snips.belongsTo(models.User, {
        foreignKey: {
            allowNull: false
        }
    });
  };

  return Snips;
};
