module.exports = function(sequelize, DataTypes) {
  var Snips = sequelize.define("Snips", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 200]
      }
    },

    Snippet: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lanquage: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    liked: {
      type: DataTypes.INT,
      allowNull: false,
    }
  });

  Post.associate = function(models) {
    Snips.belongsTo(models.Coder, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Snips;
};
