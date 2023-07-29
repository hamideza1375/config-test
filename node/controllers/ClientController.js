// appcontas
// spfa
// app200

const { CategoryModel } = require("../model/ClientModel");


function ClientController() {

  this.category = async (req , res)=>{
    const category = await CategoryModel.find();
    res.status(200).json({value:category})
    }
  

}

module.exports = new ClientController()