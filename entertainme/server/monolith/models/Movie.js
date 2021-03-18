const {getDb} = require('../config/mongoDb')


class Movie {
  static find(){
    return getDb().collection('Movies').find().toArray()
  }

  static findById(id){
    return getDb().collection('Movies').find({_id: id}).toArray()
  }

  static create(input){
    return getDb().collection('Movies').insertOne(input)
  }

  static remove(objId){
    return getDb().collection('Movies').deleteOne({_id:objId})
  }

  static update(objId, updateDoc,options){
    return getDb().collection('Movies').updateOne({_id: objId}, updateDoc, options)
  }


}


module.exports = Movie