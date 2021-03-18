const { ObjectId } = require('bson');
const Serie = require('../models/Serie')


class SerieController {
  static async find(req,res){
    try {
      const series = await Serie.find()

      res.json(series)
    } catch (err) {
      console.log(err);
    }

  }

  static async findById(req,res){
    try {
      const id = req.params.id
      const objId = ObjectId(id)
      const serie = await Serie.findById(objId)

      res.json(serie)
    } catch (err) {
      console.log(err);
    }
  }


  static async create(req,res){
    try {
      const serie = await Serie.create(req.body)

      res.json(serie.ops)
    } catch (err) {
      console.log(err);
    }
  }

  static async remove(req,res){
    try {
      const id = req.params.id
      const objId = ObjectId(id)
      const result = await Serie.remove(objId)

      res.json(result)
    } catch (err) {
      console.log(err);
    }
  }

  static async update(req,res){
    try {
      const id = req.params.id
      const objId = ObjectId(id)
      const data = {...req.body,tags: [...req.body.tags]}
      for (const key in data) {
        if (data[key]=== undefined || data[key] === '' || data[key] === null || data[key].length === 0 ) {
          delete data[key]
        }
      }
      const options = { upsert: true}
      const updateDoc = {
        $set: data
      }

      // console.log(objId);
      const result = await Serie.update(objId, updateDoc, options)

      res.json(result)

    } catch (err) {
      console.log(err);
    }
  }

}


module.exports = SerieController