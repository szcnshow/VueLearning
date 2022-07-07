/**
 * 管理数据库字段属性数据字典
 */
 const { json } = require('express');
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token')
const curd = require("./common-curd")

const dbname = 'nircloud.sqlite';
const tablename = 'dbFieldDict'
const timeField = 'updateTime'
const statusKey = 'status'
const dataKey = 'data'

/**
 * 获取所有表格名称，
 * call get /fielddict/
 * return data:dbFieldDict[]
 */
 router.get('/', async (req, res) => {
  const sqlstr = `SELECT DISTINCT tableName from ${tablename} `;
  const result = await curd.get_all(dbname, sqlstr, res);
  res.json(result);
});

/**
 * 获取属于指定表的所有字段信息，
 * call get /fielddict/tablename
 * return data:dbFieldDict[]
 */
router.get('/:name', async (req, res) => {
  const {name} = req.params;
  const sqlstr = `SELECT id, tableName, fieldName, fieldProp, updateTime from ${tablename} where tableName='${name}'`;
  const result = await curd.get_all(dbname, sqlstr, res);
  res.json(result);
});

/**
 * 获取属于指定表和字段的信息，
 * call get /fielddict/tablename/fieldname
 * return data:dbFieldDict[]
 */
 router.get('/:name/:fieldname', async (req, res) => {
  const {name, fieldname} = req.params;
  const sqlstr = `SELECT id, tableName, fieldName, fieldProp, updateTime from ${tablename} where tableName='${name}' and fieldName='${fieldname}'`;
  const result = await curd.get_all(dbname, sqlstr, res);
  res.json(result);
});

/**
 * 新增字段信息
 * call post /fielddict/tablename/fieldname, body包含k-v格式的fieldProp
 * return data:id
 */
 router.post('/:name/:fieldname', async function(req, res)  {
  const {name, fieldname} = req.params;
  const coldatas = {};
  coldatas['fieldProp'] = JSON.stringify(req.body);   //序列化为字符串
  coldatas['tableName'] = name;
  coldatas['fieldName'] = fieldname;  
  coldatas[timeField] = Date.now();
  const result = await curd.insert(dbname, tablename, coldatas);
  res.json(result);
});

/**
 * 修改字段信息
 * call put /fielddict/tablename/fieldname, body包含修改的fieldProp
 * return data:true/false
 */
 router.put('/:name/:fieldname', async function(req, res)  {
  const {name, fieldname} = req.params;
  const coldatas = {};
  coldatas['fieldProp'] = JSON.stringify(req.body);   //序列化为字符串
  coldatas[timeField] = Date.now();

  const result =await curd.update(dbname, tablename, coldatas, `tableName='${name}' and fieldName='${fieldname}'`);
  res.json(result);
});

/**
 * 修改字段信息
 * call put /fielddict/id, body包含修改的fieldProp
 * return data:true/false
 */
 router.put('/:id', async function(req, res)  {
  const {id} = req.params;
  const coldatas = {};
  coldatas['fieldProp'] = JSON.stringify(req.body);   //序列化为字符串
  coldatas[timeField] = Date.now();

  const result =await curd.update(dbname, tablename, coldatas, `id=${id}`);
  res.json(result);
});

/**
 * 删除字段信息
 * call delete /fielddict/tablename/fieldname
 * return data:true/false
 */
 router.delete('/:name/:fieldname', async function(req, res)  {
  const {name, fieldname} = req.params;
  const result =await curd.delete(dbname, tablename, `tableName='${name}' and fieldName='${fieldname}'`);
  res.json(result);
});

/**
 * 删除字段信息
 * call delete /fielddict/id
 * return data:true/false
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await curd.delete(dbname, tablename, `id=${id}`);
  res.json(result);
});

module.exports = router;