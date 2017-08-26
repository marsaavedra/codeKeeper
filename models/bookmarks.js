module.exports = function(sequelize, DataTypes) {
    var Bookmarks = sequelize.define("Bookmarks",{
      
    });

  Bookmarks.associate = function(models) {
    Bookmarks.belongsTo(models.Snips, {
      foreignKey: {
        allowNull: false
      }
    });
  }

  Bookmarks.associate = function(models) {
    Bookmarks.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  }
  return Bookmarks;
};