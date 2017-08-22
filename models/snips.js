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
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    liked: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
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
