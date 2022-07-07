/**
 * 设备管理端
 */
 const { json } = require('express');
const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/verify-token')
const curd = require("../common-curd")

const dbname = 'nircloud.sqlite';
const tablename = 'deviceInfo'
const nameField = 'deviceName'
const pwdField = 'password'
const timeField = 'updateTime'
const statusKey = 'status'
const dataKey = 'data'

/**
 * 获取设备信息列表，
 * call get /device/admin
 * return data:deviceInfo[]
 */
router.get('/', async (req, res) => {
  const sqlstr = `SELECT id, deviceName, owner, factory, brand, category, model, isOnline, isSimulate, 
      channels, currentChannel, state, stateMessage,
      progressPercent, updatetime, channelIDs 
      from deviceInfo`;
  const result = await curd.get_all(dbname, sqlstr, res);
  res.json(result);
});

/**
 * 获取单个设备信息，
 * call get /device/admin/id
 * return data:deviceInfo
 */
 router.get('/:id', async (req, res) => {
  const {id} = req.params;
  const sqlstr = `SELECT id, deviceName, owner, factory, brand, category, model, isOnline, isSimulate, 
      channels, currentChannel, state, stateMessage,
      progressPercent, updatetime, channelIDs 
      from deviceInfo where id=${id}`;
  const result = await curd.get_first(dbname, sqlstr);
  res.json(result);
});

/**
 * 新增设备
 * call post /device/admin, body必须包含deviceName, serialNo，password
 * return data:id
 */
 router.post('/', async function(req, res)  {
  const coldatas = req.body;
  const pwd = coldatas[pwdField];
  const name = coldatas[nameField];
  const serialno = coldatas['serialNo'];
  if( pwd == undefined || name==undefined || serialno == undefined) {
    res.status(400).json({message:'bad parameters, need deviceName, password and serialno'})
  } else {
    coldatas[pwdField] = curd.hashPassword(name,pwd);
  }
  coldatas[timeField] = Date.now();
  const result = await curd.insert(dbname, tablename, req.body);
  res.json(result);
});

/**
 * 修改设备
 * call put /device/admin/id, body包含修改的内容，不能修改deviceName
 * return data:true/false
 */
 router.put('/:id', async function(req, res)  {
  const {id} = req.params;
  const coldatas = req.body;

  //不能修改设备名
  if(coldatas[nameField] != undefined) {
    res.status(400).json({message: 'Cannot change device name'});
    return;
  }

  //查找修改用户的信息
  const devresult = await curd.get_first(dbname, `select ${nameField} from ${tablename} where id=${id}`)
  if(devresult[statusKey] != 200) {
    res.json(devresult);
    return;
  }

  //修改password，需要加上devicename特殊处理
  const devname = devresult[dataKey][nameField];
  if(coldatas[pwdField] != undefined) {
    coldatas[pwdField] = curd.hashPassword(devname, coldatas[pwdField]);    
  }
  coldatas[timeField] = Date.now();
  const result =await curd.update(dbname, tablename, req.body, `id=${id}`);
  res.json(result);
});

/**
 * 删除设备
 * call /device/admin/id
 * return data:true/false
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await curd.delete(dbname, tablename, `id='${id}'`);
  res.json(result);
});

module.exports = router;