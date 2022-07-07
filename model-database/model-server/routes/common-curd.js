const { json } = require('express');
const sqlite3 = require('async-sqlite3');
const crypt = require('crypto');
const { promise } = require('bcrypt/promises');

//PUT 更新资源（幂等操作） == update
//POST 创建资源（非幂等操作） == insert

exports.toLocalTime = function(time) {
  var d = new Date(time);
  var offset = (new Date().getTimezoneOffset() / 60) * -1;
  var n = new Date(d.getTime() + offset);
  return n;
};

/**
 * 用户名+密码创建hash字符串
 * @param {string} user_name - 用户名
 * @param {string} raw_password - 未加密的密码
 * @returns 
 */
exports.hashPassword = function(user_name, raw_password){
  return crypt.createHash('sha256').update(user_name+raw_password).digest('base64');
};    
  
exports.common_catch_return = async function(err) {
  await sqlite3.close();
  if(err.message == undefined)
    return {status:400, message: err };
  else
    return {status:400, message: err.message };    
}

/**
 * 查询所有符合条件的记录
 * @param {string} dbname - 数据库名称
 * @param {string} sqlstr 查询条件
 * @returns 
 */
exports.get_all = async function(dbname, sqlstr){
  try {
    await sqlite3.open(dbname)
    const result = await sqlite3.all(sqlstr, []);

    //检查查询结果
    if(result == undefined || result.length == 0) {
      throw new Error('data not found');
    } else if('updateTime' in result[0]) {      
      //将数据库里面的UpdateTime转换为时间
      result.forEach(element => {
        element['updateTime'] = this.toLocalTime(element['updateTime'])
      });
    }
    await sqlite3.close();

    return {status:200, data:result, message: 'OK' };
  } catch(err) {
    return await this.common_catch_return(err);
  }
};

/**
 * 查询第一条符合条件的记录
 * @param {string} dbname - 数据库名称
 * @param {string} sqlstr 查询条件
 * @returns 第一条符合条件的记录
 */
 exports.get_first = async function(dbname, sqlstr){
  try {
    await sqlite3.open(dbname)    
    const result = await sqlite3.all(sqlstr + ' LIMIT 1', []);

    //检查查询结果
    if(result == undefined || result.length == 0) {
      throw new Error('data not found');
    } else if('updateTime' in result[0]) {
      
      //将数据库里面的UpdateTime转换为时间
      result.forEach(element => {
        element['updateTime'] = this.toLocalTime(element['updateTime'])
      });
    }
    await sqlite3.close();

    return {status:200, data:result[0], message: 'OK' };
  } catch(err) {
    return await this.common_catch_return(err);
  }
};

/**
* 构造新增的SQL语句和数据数组
* @param {string} table_name - 目标数据表
* @param {keyvalue} col_datas - http传入的插入数据
* @returns [SQL语句, 数据数组] 
*/
exports.prepare_post_cmd = function(table_name, col_datas) {
  const sqlstr = `insert into ${table_name} (` + Array.from(Object.keys(col_datas)).join(',') + ")";
  const valuestr = "values (" + Array(Object.keys(col_datas).length).fill('?') +")";
  return [sqlstr + valuestr, Array.from(Object.values(col_datas))]
};

/**
 * 新增数据
 * @param {string} dbname - 数据库名称
 * @param {string} table_name  - 目标数据表
 * @param {keyvalue} col_datas  - http传入的插入数据
 */
 exports.insert = async function(dbname, table_name, col_datas)  {
  try {
    await sqlite3.open(dbname)
    const [sqlstr, datas] = this.prepare_post_cmd(table_name, col_datas);
    const result = await sqlite3.insert(sqlstr, datas);
    await sqlite3.close();

    return {status:200, data:result, message: 'OK' };
  } catch(err) {
    return await this.common_catch_return(err);
  }  
};
  

/**
* 创建修改SQL数据，输入：table_name: 表格名称, col_datas: 修改字段的名称和值(keyvalue), cond_str:条件语句,返回：SQL语句和值数组
* @param {string} table_name - 目标数据表
* @param {keyvalue} col_datas - http传入的修改数据
* @param {string} cond_str - 不包含where的条件字符串
* @returns [SQL语句, 数据数组] 
*/
exports.prepare_put_cmd = function(table_name, col_datas, cond_str) {
  let sqlstr = `update ${table_name} set ` + Array.from(Object.keys(col_datas)).join('=?,');
  sqlstr += '=?';
  sqlstr += " where " + cond_str;
  return [sqlstr, Array.from(Object.values(col_datas))]
};
      
/**
 * 修改数据
 * @param {string} dbname - 数据库名称
 * @param {string} table_name - 目标数据表
 * @param {keyvalue} col_datas - http传入的修改数据
 * @param {string} cond_str - 不包含where的条件字符串
 */
 exports.update = async function(dbname, table_name, col_datas, cond_str) {
  try {
    await sqlite3.open(dbname)
    const [sqlstr, datas] = this.prepare_put_cmd(table_name, col_datas, cond_str);
    const result = await sqlite3.update(sqlstr, datas);
    await sqlite3.close();

    return {status:200, data:result, message: 'OK' };
  } catch(err) {
    return await this.common_catch_return(err);   
  }  
};

/**
 * 删除数据
 * @param {string} dbname - 数据库名称
 * @param {string} table_name - 目标数据表
 * @param {string} cond_str - 不包含where的条件字符串
 * @param {Response} res  - http反馈
 */
exports.delete = async function(dbname, table_name, cond_str, res) {
  try {
    await sqlite3.open(dbname)
    const result = await sqlite3.delete(`delete from ${table_name} where ${cond_str}`);
    await sqlite3.close();
    return {status:200, data:result, message: 'OK' };
  } catch(err) {
    return await this.common_catch_return(err);
  }  
};
   
/**
 * 验证password
 * @param {string} dbname - 数据库名称
 * @param {string} user_name - 用户名
 * @param {string} raw_password - 未加密的password
 * @param {string} table_name - 数据表名（userInfo，deviceInfo）
 * @param {string} pwd_query - password查询条件
 */
exports.verifyPassword = async function (dbname, table_name, user_name, raw_password, pwd_query) {
  const curHashedPwd = this.hashPassword(user_name,raw_password);
  const result = await this.get_first(dbname, `select password from ${table_name} where ${pwd_query}`)
  if(result['status'] != 200) {
    result['data'] = false;
  } else if(result['data']['password'] != curHashedPwd) {
    result['data'] = false;
    result['message'] = 'Invalid username or password';
    result['status'] = 400;
  } else {
    result['data'] = true;    
  }

  return result;
};
