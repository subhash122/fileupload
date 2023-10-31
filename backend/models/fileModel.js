const sequelize=require('../dbConnect');
const {DataTypes} = require("sequelize");

const File = sequelize.define("files", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true
    },
    file_link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    file_name: {
      type: DataTypes.STRING,
    },
 },{
  timestamps: false,
  tableName: 'files'
 });

module.exports = File;