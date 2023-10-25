const db = require('../../database/models');

const { unlinkSync, existsSync } = require("fs");

module.exports = (req,res) => {    
    
    db.Product.destroy({
        where : {
            id : req.params.id
        }
    })
    .then(() => {
        return res.redirect('/admin')
    })
    .catch(error => console.log(error))
}