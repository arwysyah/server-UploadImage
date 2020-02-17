const db = require('../Configs/db');//karena ini tempatnya query jadi kita butuh akses database
const fs = require('fs')
const mv = require('mv')
module.exports = {
    getAll : ()=> { 
        return new Promise((resolve,reject)=>{
            db.query('SELECT * from products ',(error, status1)=>{
                if (!error)
                    resolve(status1,200)//mencobanya di console.log dulu
                 else
                   reject(error)
                });
        })
    },


filterProduct : (name)=> { 
    return new Promise((resolve,reject)=>{
        db.query("SELECT * FROM product WHERE name LIKE CONCAT('%', ?,  '%')",[name],(error, status1)=>{
            if (!error)
                resolve(status1)//mencobanya di console.log dulu
             else
               reject(error)
            });
    })
  },

    deleteProduct : id => {
    
        
      
        return new Promise((resolve,reject)=>{
            db.query('select * from products where id_products = ?', id, (err, img) => {
                fs.unlink('upload/' + img[0].image_name, (err) => {
                  if (err) {
                    reject(err)
                  }
                })
              })
            db.query('DELETE FROM products where id_products = ?',[id],(error,id1)=>{
        
                if (!error)
                resolve("Delete Succesfully",id1)//mencobanya di console.log dulu
                else
                reject(error)
            });
        })
    },
    postProduct : (body,img) =>{
        return new Promise((resolve,reject)=> {
            img.mv('upload/' + body.image_name, (err) => {
                if (err) return 
                console.log('upload success')
              })
            db.query('INSERT INTO products  set ?', [body],(error,body1)=>{
                if (!error)
                resolve(body1)
                else
                reject(error)
            });
        })
    },
    putProduct :(body,id,img)=>{
        return new Promise ((resolve,reject)=>{
            if (body.image_name) {
                db.query('select * from products where id_products = ?', id, (err, img) => {
                  fs.unlink('upload/' + img[0].image_name, (err) => {
                    if (err) {
                      reject(err)
                    }
                  })
                })
            }
            img.mv('upload/' + body.image_name, (err) => {
                if (err) return 
                console.log('upload success')
              })
            db.query('UPDATE  products  set ? where id_products = ?', [body,id],(error,results)=>{
            if (!error)
                resolve(results)
            else
            reject(error)
        });
        
        })
    },

    
};