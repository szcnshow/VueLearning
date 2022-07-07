
export default class webSQLObject {
  constructor (dbName, ver, description, tableName, object) { // constructor是一个构造方法，用来接收参数
    this.dbName = dbName // this代表的是实例对象
    this.ver = ver
    this.description = description
    this.tableName = tableName
    this.object = object
    this.db = window.openDatabase(this.dbName, this.ver, this.description, 2 * 1024 * 1024)
  }

  insert () {
    console.log(this.object)
  }
}
