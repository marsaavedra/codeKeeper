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
      allowNull: false
    },

    description: {
      type: DataTypes.STRING
    },

    language: {
      type: DataTypes.STRING,
      allowNull: false
    },

    privacy: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Snips.associate = function(models) {
    Snips.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Snips.associate = function(models) {
    Snips.hasMany(models.Bookmarks, {
      onDelete: "cascade"
    });
  };

  return Snips;
};
