module.exports = function(sequelize, DataTypes) {
    var Bookmarks = sequelize.define("Bookmarks",{
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10, 200]
            }
        }
    });

    Bookmarks.associate = function(models) {
        Bookmarks.belongsTo(models.Snips, {
            foreignKey: {
                allowNull: false
            }
        });

        Bookmarks.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
     }
    return Bookmarks;
}