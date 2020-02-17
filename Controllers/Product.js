const Model = require('../Models/Product');
const form = require('../Helpers/resForm')
const mv = require('mv')
module.exports = {

    getAll : (req,res) =>{
        Model.getAll() 
        .then(status1 => form.getAll(res,status1,200))//langsung diubah ke JSON
        .catch(error => console.log(error))
    },
    
    filterProduct: (req, res) => {
        const name = req.params.name;
        Model.filterProduct(name)
          .then(name => form.filterProduct(res, name, 200)) //langsung diubah ke JSON
          .catch(error => console.log(error));
      },
    
    deleteProduct : (req,res)=>{
        const id = req.params.id
        Model.deleteProduct(id)
        .then(id1=> form.deleteProduct(res,id1,200))
        .catch(error=> console.log(error))
    },
    postProduct : (req,res)=>{
        var img = req.files.image_name
        const fileType = img.mimetype
        var type = ''

    if (fileType !== 'image/png' && fileType !== 'image/gif' && fileType !== 'image/jpeg') {
      return res.status(400).send('file is not in image format')
    }

    if (fileType === 'image/png') {
      type = 'png'
    }
    if (fileType === 'image/gif') {
      type = 'gif'
    }
    if (fileType === 'image/jpeg') {
      type = 'jpg'
    }

    var random_id = Math.floor(Math.random() * 10) + 4

    const image_name = 'img-' + Date.now() + '-' + random_id + '.' + type
        const {name}= req.body
     const data={name,image_name}
      

        Model.postProduct(data,img)
        .then(body1=>form.postProduct(res,body1,200))
        .catch(error=> console.log(error))
    },
    putProduct:(req,res)=>{
        var img = req.files.image_name
        const fileType = img.mimetype
        var type = ''

    if (fileType !== 'image/png' && fileType !== 'image/gif' && fileType !== 'image/jpeg') {
      return res.status(400).send('file is not in image format')
    }

    if (fileType === 'image/png') {
      type = 'png'
    }
    if (fileType === 'image/gif') {
      type = 'gif'
    }
    if (fileType === 'image/jpeg') {
      type = 'jpg'
    }

    var random_id = Math.floor(Math.random() * 10) + 4

    const image_name = 'img-' + Date.now() + '-' + random_id + '.' + type
        const {name}= req.body
     const data={name,image_name}
       
        const id = req.params.id
        Model.putProduct(data,id,img)
        .then(results=> form.putProduct(res,results,200))
        .catch(error=> console.log(error))
    },
 

}