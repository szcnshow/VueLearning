var express = require('express');
const jwt = require('jsonwebtoken');
const curd = require("./common-curd")

var router = express.Router();
const dbname = 'nircloud.sqlite';
const tablename = 'userInfo'
const nameField = 'username'
const pwdField = 'password'
const timeField = 'updateTime'
const statusKey = 'status'
const dataKey = 'data'

/**
 * 获取用户信息列表，
 * get /users
 * 返回 data:userInfo[]
 */
router.get('/', async function(req, res, next) {
  const sqlstr = `SELECT id, username, realname, userrole, department 
      from userInfo`;
  const result = await curd.get_all(dbname, sqlstr, res);
  res.json(result);
});

/**
 * 获取单个用户信息，
 * get /users/id
 * 返回 data:userInfo
 */
router.get('/:id', async function(req, res, next) {
  const {id} = req.params;
  const sqlstr = `SELECT id, username, realname, userrole, department 
    from userInfo where id=${id}`;
  const result = await curd.get_first(dbname, sqlstr);
  res.json(result);
});

/**
 * 用户登录, 
 * get /users/login/usename, HTML body包含password
 * 返回：data:id, token:author token
 */
router.post('/login/:username', async (req, res) => {
  const {username} = req.params;
  const {password} = req.body;
  //检查参数
  if(username == undefined || password == undefined) {
    res.status(400).send('invalid parameters');
  }
  else {
    const result = await curd.verifyPassword(dbname, tablename, username, password, `${nameField}='${username}'`);
    if(result.status == 200) {  //返回token认证表成功
      result['token'] = jwt.sign({username}, 'secret');
    }
    res.json(result);
  }
})

/**
 * 新增用户
 * post /users, body包含数据
 * 返回 data:id
 */
router.post('/', async (req, res) => {  
  const coldatas = req.body;
  coldatas[pwdField] = curd.hashPassword(coldatas[nameField], coldatas[pwdField]);
  coldatas[timeField] = Date.now();
  let result = await curd.insert(dbname, tablename, coldatas);
  res.json(result);
})

/**
 * 修改用户
 * put /users, body包含数据，不能修改username
 * 返回: data=true/false
 */
 router.put('/:id', async (req, res) => {  
  const {id} = req.params;
  const coldatas = req.body;

  //不能修改用户名
  if(coldatas[nameField] != undefined) {
    res.status(400).json({message: `Cannot change ${nameField}`});
    return;
  } 

  //查找修改用户的信息
  const userresult = await curd.get_first(dbname, `select ${nameField} from ${tablename} where id=${id}`)
  if(userresult[statusKey] != 200) {
    res.json(userresult);
    return;
  }

  //修改password，需要加上username特殊处理
  const username = userresult[dataKey][nameField];
  if(coldatas[pwdField] != undefined) {      
    coldatas[pwdField] = curd.hashPassword(username, coldatas[pwdField]);    
  }
  coldatas[timeField] = Date.now();
  let result =await curd.update(dbname, tablename, req.body, `id=${id}`);
  res.json(result);
})

/** 
 * 删除用户
 * delete /users/id
 * 返回: data=true/false
 */ 
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  let result = await curd.delete(dbname, tablename, `id='${id}'`);
  res.json(result);
});

module.exports = router;
