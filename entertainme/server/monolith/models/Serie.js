const {getDb} = require('../config/mongoDb')


class Serie {
  static find(){
    return getDb().collection('Series').find().toArray()
  }

  static findById(objId){
    return getDb().collection('Series').find({_id:objId}).toArray()
  }

  static create(input){
    return getDb().collection('Series').insertOne(input)
  }

  static remove(objId){
    return getDb().collection('Series').deleteOne({_id:objId})
  }

  static update(objId,updateDoc,options){
    return getDb().collection('Series').updateOne({_id: objId}, updateDoc, options)
  }


}


module.exports = Serie