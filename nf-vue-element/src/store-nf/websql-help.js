
/**
 * webSQL 的封装，基于 promise 便于操作
 * * 建立数据库
 * * 封装sql实现增删改查
 */
export default class webSQLHelp {
  constructor (dbName, ver, description) { // constructor是一个构造方法，用来接收参数
    this.dbName = dbName // this代表的是实例对象
    this.ver = ver
    this.description = description
    this.db = window.openDatabase(this.dbName, this.ver, this.description, 2 * 1024 * 1024)
  }

  /**
   * 打开指定的webSQL数据库
   * @returns 数据库的实例
   */
  openDb () {
    return this.db
  }

  /**
   * 创建表
   * @param { string } tableName 表名
   * @param { object } columns 表的对象，比如{name:'jyk', age: 12}
   * @returns 成功或者失败
   */
  createTable (tableName, columns) {
    const promise = new Promise((resolve, reject) => {
      // console.log('this.db', this.db)
      // 记录字段名称，不设置类型了。
      const cols = []
      for (const key in columns) {
        if (key.indexOf('date') >= 0) {
          cols.push(key + ' DATETIME ')
        } else {
          cols.push(key)
        }
      }
      const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (ID INTEGER PRIMARY KEY ASC, ${cols.join(',')} )`
      // console.log('createSQL：', sql)
      // 调用事务，建立表
      this.db.transaction((tx) => {
        tx.executeSql(sql, [], (tx, results) => {
          // console.log(tx, results)
          resolve(results)
        }, (tx, err) => {
          console.log('createTable -sql:', sql, tx, err)
          reject(err)
        })
      })
    })

    return promise
  }

  /**
   * 插入数据
   * @param { string } tableName 表名
   * @param { object } object 保存的对象
   * @returns 新增的ID值
   */
  insert (tableName, object) {
    const promise = new Promise((resolve, reject) => {
      // 记录字段名称
      const colNames = []
      // 记录字段对应的值
      const colValues = []
      // 记录字段对应的占位符合
      const cols = []
      // 变量对象，记录 key和 value
      for (const key in object) {
        colNames.push(key)
        // colValues.push('"' + object[key] + '"')
        colValues.push(object[key])
        cols.push('?')
      }
      const sql = `INSERT INTO ${tableName}
        ( ${colNames.join(',')} ) VALUES ( ${cols.join(',')} )`

      // console.log('insertSQL：', sql)
      this.db.transaction((tx) => {
        tx.executeSql(sql, colValues, (tx, results) => {
          // console.log(tx, results)
          // 成功了，返回给调用者
          resolve(results.insertId)
        }, (tx, err) => {
          console.log('insert -sql:', sql, colValues, tx, err)
          reject(err)
        })
      })
    })

    return promise
  }

  /**
   * 修改数据
   * @param { String } tableName 表名
   * @param { Object } object 要修改的对象值
   * @param { Number } idValue 修改依据，id 的值
   * @returns 修改影响的行数
   */
  update (tableName, object, idValue) {
    const promise = new Promise((resolve, reject) => {
      // 记录字段名称
      const colNames = []
      // 记录字段对应的值
      const colValues = []
      // 变量对象，记录 key和 value
      for (const key in object) {
        colNames.push(key + '=? ')
        colValues.push(object[key])
      }
      // 加入查询条件
      colValues.push(idValue)

      const sql = `UPDATE ${tableName} SET ${colNames.join(',')} WHERE id=?`

      // console.log('updateSQL：', sql)
      // console.log('updateSQL2：', colValues)
      this.db.transaction((tx) => {
        tx.executeSql(sql, colValues, (tx, results) => {
          console.log(tx, results)
          // 成功了，返回给调用者 影响行数
          resolve(results.rowsAffected)
        }, (tx, err) => {
          console.log('update-sql:', sql, colValues, tx, err)
          reject(err)
        })
      })
    })

    return promise
  }

  /**
   * 删除一条记录
   * @param { String } tableName 表名
   * @param { Number } idValue 删除依据
   * @returns 删除状态
   */
  delete (tableName, idValue) {
    const promise = new Promise((resolve, reject) => {
      const sql = `DELETE FROM ${tableName} WHERE id=?`
      this.db.transaction((tx) => {
        tx.executeSql(sql, [idValue], (tx, results) => {
          // console.log(tx, results)
          // 成功了，返回给调用者 影响行数
          resolve(results.rowsAffected)
        }, (tx, err) => {
          console.log('delete-sql:', sql, tx, err)
          reject(err)
        })
      })
    })

    return promise
  }

  /**
   * 查询数据
   * @param { string } tableName 要查询的表名
   * @param { object } showCols 显示字段
   * @param { object } query 查询条件
   * @returns 查询结果，数组形式
   */
  select (tableName, showCols, query, page) {
    this.findKind = {
      // 字符串
      401: ' {col} = ? ',
      402: ' {col} <> ? ',
      403: ' {col} like ? ',
      404: ' {col} not like ? ',
      405: ' {col} like ? ', // 起始于
      406: ' {col} like ? ', // 结束于
      // 数字
      411: ' {col} = ? ',
      412: ' {col} <> ? ',
      413: ' {col} > ? ',
      414: ' {col} >= ? ',
      415: ' {col} < ? ',
      416: ' {col} <= ? ',
      417: ' {col} between ? and ? ',
      // 日期
      421: ' {col} = ? ',
      422: ' {col} <> ? ',
      423: ' {col} > ? ',
      424: ' {col} >= ? ',
      425: ' {col} < ? ',
      426: ' {col} <= ? ',
      427: ' {col} between ? and ? ',
      // 范围
      441: ' {col} in (?)'
    }
    const promise = new Promise((resolve, reject) => {
      const _whereCol = [] // 查询字段
      const _whereValue = [] // 查询参数
      const limit = [] // 分页，可以不设置
      const order = [] // 排序，可以不设置
      if (typeof page === 'undefined') {
        limit.push('')
        order.push('')
      } else {
        if (typeof page.pageIndex !== 'undefined') {
          // 用 limit 实现分页
          const index = page.pageSize * (page.pageIndex - 1)
          limit.push(' limit ')
          limit.push(index)
          limit.push(',')
          limit.push(page.pageSize)
        } else if (typeof page.orderBy !== 'undefined') {
          // 设置排序字段和方式
          order.push(' order by ')
          order.push(page.orderBy)
          order.push(page.isAsc ? ' asc ' : ' desc ')
        }
      }
      // 设置查询条件
      for (const key in query) {
        const val = query[key]
        _whereCol.push(this.findKind[val[0]].replace('{col}', key))
        switch (val[0]) {
          case 403: // like
          case 404: // not like
            _whereValue.push('%' + val[1] + '%')
            break
          case 405: // like a%
            _whereValue.push(val[1] + '%')
            break
          case 406: // like %a
            _whereValue.push('%' + val[1])
            break
          case 417: // between 数字
          case 427: // between 日期
            _whereValue.push(...val[1])
            break
          case 441: // in
            _whereCol[_whereCol.length - 1] =
              _whereCol[_whereCol.length - 1]
                .replace('?', val[1].map(a => '?').join(','))
            _whereValue.push(...val[1])
            break
          default:
            _whereValue.push(val[1])
            break
        }
      }
      // 如果没有查询添加，设置 1=1 占位
      if (_whereCol.length === 0) {
        _whereCol.push(' 1=1 ')
      }
      // 拼接查询语句
      const sql = `SELECT * FROM ${tableName} WHERE ${_whereCol.join(' and ')} ${order.join('')} ${limit.join('')}`
      this.db.transaction((tx) => {
        tx.executeSql(sql, _whereValue, (tx, results) => {
          // console.log(tx, results)
          // 成功了，返回给调用者 记录集合
          resolve(results.rows)
        }, (tx, err) => {
          console.log('select-sql:', sql, tx, err)
          reject(err)
        })
      })
    })

    return promise
  }

  /**
   * 删除表
   * @param { String } tableName 表名
   * @returns 删除状态
   */
  deleteTable (tableName) {
    const promise = new Promise((resolve, reject) => {
      const sql = `DROP TABLE ${tableName}`
      this.db.transaction((tx) => {
        tx.executeSql(sql, [], (tx, results) => {
          console.log(tx, results)
          // 成功了，返回给调用者 影响行数
          resolve(results)
        }, (tx, err) => {
          console.log('deleteTable-sql:', sql, tx, err)
          reject(err)
        })
      })
    })

    return promise
  }

  /**
   * 删除数据库，好像不好用
   * @param { String } dbName 数据库名称
   * @returns 删除状态
   */
  deleteDataBase (dbName) {
    const promise = new Promise((resolve, reject) => {
      const sql = `DROP database [${dbName}]`
      this.db.transaction((tx) => {
        tx.executeSql(sql, [], (tx, results) => {
          // console.log(tx, results)
          // 成功了，返回给调用者 影响行数
          resolve(results)
        }, (tx, err) => {
          console.log('deleteDataBase-sql:', sql, tx, err)
          reject(err)
        })
      })
    })

    return promise
  }

  /**
   * 把表看做对象，进行增删改查的操作，obj可以作为指针。
   * @param { string } tableName 表名
   * @param { object } obj 数据对象
   * @returns 表的实例，实现增删改查
   */
  CreateTableObject = (tableName, obj) => {
    // 建表
    this.createTable(tableName, obj)

    /**
    * 表的添加数据
    * @param { object } object 要添加的对象，不填则使用Create时的对象
    * @returns 新纪录ID
    */
    const insert = (object = obj) => {
      return this.insert(tableName, object)
    }

    /**
     * 表修改数据
     * @param { object } object 要添加的对象，不填则使用Create时的对象
     * @param { number } idValue 要修改的记录ID
     * @returns 影响行数
     */
    const update = (object = obj, idValue) => {
      return this.insert(tableName, object, idValue)
    }

    /**
     * 表的删除数据
     * @param {number} idValue 要删除的记录ID
     * @returns 影响行数
     */
    const del = (idValue) => {
      return this.delete(tableName, idValue)
    }

    /**
     * 表的查询数据，单表查询，可以设置各种查询条件，可以分页和排序
     * @param { object } showCols 显示的字段
     * @param { object } query 查询条件
     * @param { object } page 分页和排序
     * @returns 查询结果，json数组形式
     */
    const select = (showCols, query, page) => {
      return this.deleteTable(tableName, showCols, query, page)
    }
    return {
      insert,
      update,
      del,
      select
    }
  }
}
