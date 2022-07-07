const { json } = require('express');
const sqlite3 = require('sqlite3');
const crypt = require('crypto');

var toLocalTime = function(time) {
  var d = new Date(time);
  var offset = (new Date().getTimezoneOffset() / 60) * -1;
  var n = new Date(d.getTime() + offset);
  return n;
};

/** 返回新增，修改，删除的操作结果，如果res不为undefined，直接返回到html客户端，否则返回到调用过程
 * @param {keyvalue} paras -包含下面内容
 * @param {response} res - 返回html前端（如果为undefined，
 * @param {integer} change_count 
 * @param {string} err 
 * @param {integer} last_id 
 * @returns 
 */
  const return_operate_result = (paras) =>{
  const {res, changes, err, last_id, opmethod} = paras;
  if(typeof(res) == "undefined") {
    if (err) {
      return {status:404, message: err.message}
    } else {
      if(changes === 0) {
        return {status:404, message: `no data ${opmethod}`}
      } else if(typeof(last_id) == "undefined") {
        return { status:200, message: "OK" };
      } else {
        return {status:200, message: "OK", data:last_id}
      }
    }
  } else {
    if (err) {
      res.status(200).json({ message: err });
    } else {          
      if(changes === 0) {
        res.status(404).json({ message: `no data ${opmethod}` });
      } else if(typeof(last_id) == "undefined") {
          res.status(200).json({ message: "OK" });
      } else {
        res.status(200).json({ message: "OK", data: last_id });
      }
    }
  }
}

class common_curd {
  constructor(dbname) {
    this.dbname = dbname;

    //查询并直接返回结果到客户端
    this.common_query = (sqlstr, res) => {
      const db = new sqlite3.Database(this.dbname);
      db.serialize(() => {
        db.all(sqlstr,
          [],
          function(err, rows = []){
            //如果返回数据有updatetime，则转换为本地日期格式
            if(typeof(rows) != 'undefined' && rows.length > 0 && 'updateTime' in rows[0]) {
              rows.forEach(element => {
                element['updateTime'] = toLocalTime(element['updateTime'])
              });
            }
            //res为undefined, 返回调用过程
            if(typeof(res) == 'undefined') {
              if (err) {
                return {status:404, message: err.message };
              } else if(rows.length == 0) {
                return {status:404, message: 'data not found' };
              } else {
                return {status:200, data:rows, message: 'OK' };
              }
            } else {
              if (err) {
                res.status(404).json({ status: err.message });
              } else if(rows.length == 0) {
                res.status(404),json({message: "data not found"});
              } else {
                res.status(200).json(rows);
              }
            }
          })
        });
      db.close();
    };

   /**
    * 构造新增的SQL语句和数据数组
    * @param {string} table_name - 目标数据表
    * @param {keyvalue} col_datas - http传入的插入数据
    * @returns [SQL语句, 数据数组] 
    */
    this.prepare_post_cmd = (table_name, col_datas) => {
      const sqlstr = `insert into ${table_name} (` + Array.from(Object.keys(col_datas)).join(',') + ")";
      const valuestr = "values (" + Array(Object.keys(col_datas).length).fill('?') +")";
      return [sqlstr + valuestr, Array.from(Object.values(col_datas))]
    };


    /**
     * 新增数据
     * @param {string} table_name  - 目标数据表
     * @param {keyvalue} col_datas  - http传入的插入数据
     * @param {Response} res  - http反馈
     */
    this.common_post = (table_name, col_datas, res) => {
      const db = new sqlite3.Database(this.dbname);
      db.serialize(() => {
        const [sqlstr, datas] = this.prepare_post_cmd(table_name, col_datas);
        const cmd = db.prepare(sqlstr);
        cmd.run(datas, function(err){
          return_operate_result({'err': err, 'changes':this.changes, 'res':res, 'last_id':this.lastID, 'opmethod':'inserted'});
        });
        cmd.finalize(); 
      });
      db.close();
    };

    // /**
    //  * 新增数据
    //  * @param {string} table_name  - 目标数据表
    //  * @param {keyvalue} col_datas  - http传入的插入数据
    //  * @param {Response} res  - http反馈
    //  */
    // this.common_post = (table_name, col_datas, res) => {
    //   const db = new sqlite3.Database(this.dbname);
    //   db.serialize(() => {
    //     const [sqlstr, datas] = this.prepare_post_cmd(table_name, col_datas);
    //     const cmd = db.prepare(sqlstr);
    //     cmd.run(datas, function(err){
    //       if (err) {
    //         if(typeof(res) == "undefined")
    //           return {status:404, message: err.message}
    //         else
    //           res.status(404).json({ status: err.message });
    //       } else {
    //         if(this.changes === 0)
    //           res.status(404).json({ status: 'insert data failed' });
    //         else
    //           res.status(200).json({ id: this.lastID });
    //         }
    //       });
    //       cmd.finalize(); 
    //     });
    //     db.close();
    //   };

  
   /**创建修改SQL数据，输入：table_name: 表格名称, col_datas: 修改字段的名称和值(keyvalue), cond_str:条件语句,返回：SQL语句和值数组
    * 
    * @param {string} table_name - 目标数据表
    * @param {keyvalue} col_datas - http传入的修改数据
    * @param {string} cond_str - 不包含where的条件字符串
    * @returns [SQL语句, 数据数组] 
    */
    this.prepare_put_cmd = (table_name, col_datas, cond_str) => {
      let sqlstr = `update ${table_name} set ` + Array.from(Object.keys(col_datas)).join('=?,');
      sqlstr += '=?';
      sqlstr += " where " + cond_str;
      return [sqlstr, Array.from(Object.values(col_datas))]
    };
        
    /**
     * 修改数据
     * @param {string} table_name - 目标数据表
     * @param {keyvalue} col_datas - http传入的修改数据
     * @param {string} cond_str - 不包含where的条件字符串
     * @param {Response} res  - http反馈
     */
    this.common_put = (table_name, col_datas, cond_str, res) => {
      const db = new sqlite3.Database(this.dbname);
      db.serialize(() => {
        const [sqlstr, datas] = this.prepare_put_cmd(table_name, col_datas, cond_str);
        const cmd = db.prepare(sqlstr);
        cmd.run(datas, function(err){
          return_operate_result({'err': err, 'changes':this.changes, 'res':res, 'opmethod':'modified'});
        });
        cmd.finalize(); 
      });
      db.close();
    };

    // this.common_put = (table_name, col_datas, cond_str, res) => {
    //   const db = new sqlite3.Database(this.dbname);
    //   db.serialize(() => {
    //     const [sqlstr, datas] = this.prepare_put_cmd(table_name, col_datas, cond_str);
    //     const cmd = db.prepare(sqlstr);
    //     cmd.run(datas, function(err){
    //       if (err) {
    //         res.status(404).json({ status: err.message });
    //       } else {
    //         if(this.changes === 0)
    //           res.status(404).json({ message: 'id not found' });
    //         else
    //           res.status(200).json({ message: 'OK' });
    //       }
    //     });
    //     cmd.finalize(); 
    //   });
    //   db.close();
    // };

    /**
     * 删除数据
     * @param {string} table_name - 目标数据表
     * @param {string} cond_str - 不包含where的条件字符串
     * @param {Response} res  - http反馈
     */
     this.common_delete = (table_name, cond_str, res) => {
      const db = new sqlite3.Database(this.dbname);
      db.serialize(() => {
        const cmd = db.prepare(`delete from ${table_name} where ${cond_str}`);
        cmd.run( function(err) {
          return_operate_result({'err': err, 'changes':this.changes, 'res':res, 'opmethod':'deleted'});
        });
        cmd.finalize(); 
      });
      db.close();
    };

    // this.common_delete = (table_name, cond_str, res) => {
    //   const db = new sqlite3.Database(this.dbname);
    //   db.serialize(() => {
    //     const cmd = db.prepare(`delete from ${table_name} where ${cond_str}`);
    //     cmd.run( function(err) {
    //       if (err) {
    //         res.status(404).json({ status: err.message });
    //       } else {
    //         if(this.changes === 0)
    //           res.status(404).json({ status: 'id not found' });
    //         else
    //           res.status(200).json({ status: 'OK' });
    //       }
    //     });
    //     cmd.finalize(); 
    //   });
    //   db.close();
    // };

    this.hashPassword = (user_name, raw_password) =>{
      return crypt.createHash('sha256').update(user_name+raw_password).digest('base64');
    };    
    
    this.comparePassword = (user_name, raw_password, table_name, pwd_query) =>{
      const curHashedPwd = hashPassword(user_name,raw_password);
      const db = new sqlite3.Database(this.dbname);
      db.serialize(() => {
        const cmd = db.prepare(`select password from ${table_name} where ${pwd_query}`);
        cmd.run( function(err, rows = []){
          if (err) {
            return {status: 500, message:err}
          } else {
            if(this.changes === 0 || rows.length == 0)
              return {status: 404, message:'data not found'}  
            else if(rows[0]['password'] == curHashedPwd)
              return {status: 200, message:'OK'}  
            else
              return {status: 401, message:'data not found'}  
          }
        });
        cmd.finalize(); 
      });
      db.close();      
    };
  }
}

module.exports = common_curd;