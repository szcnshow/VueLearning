/**
 * 设备客户端
 */
var express = require('express');
const jwt = require('jsonwebtoken');

var router = express.Router();

const sqlite3 = require('sqlite3');
const dbname = 'nircloud.sqlite';
const curd = require("../common-curd")

/* 设备测试服务器是否可用. */
router.get('/test', function(req, res) {
  res.status(200).json({ status: 'OK' });
});

/**
 * 设备登录，传入factory（设备厂商）, brand（设备品牌）, serialno（序列号）, password（密码），其中前三项通过设备自动获得，密码为人工设置
 * req.body包含json字典格式的factory, brand, serialno, password
 * @returns id:xxx
 */
router.put('/v1/login', (req, res) => {
  const {factory, brand, serialno, password} = req.body;  

  //查找本设备是否有登记
  const sqlstr = `select id, password from deviceInfo where factory='${factory}' && brand='${brand}' && serialno='${serialno}' COLLATE NOCASE`
  const devdata = curd.get_first('/model.sqlite', sqlstr);
  if( devdata.status == 200) {
    const hashedPwd = curd.hashPassword(`${factory}_${brand}_${serialno}`,password);  //用户名:factory_brand_serialno
    if(hashedPwd == devdata.password) {
      res.status(200).json({"id":devdata.id});
    } else {
      res.status(404).json({"message":"Invalid password"});
    }
  } else {
    res(devdata);
  }
})

// router.gettemp('/login', (req, res) => {
//   const {factory, brand, serialno, password} = req.body;  
//   const db = new sqlite3.Database(dbname);
//   //查找本设备是否有登记
//   const sqlstr = `select id, password from deviceInfo where factory='${factory}' && brand='${brand}' && serialno='${serialno}' COLLATE NOCASE`
//   db.serialize(() => {
//     db.all(sqlstr,
//       [],
//       function(err, rows = []){
//         if (err) {
//           res.status(404).json({ message: err.message });
//         } else if(rows.length == 0) {
//           res.status(404).json({ message: err.message });
//         }
//         else {
//           res.status(200).json({token: jwt.sign({username}, 'secret')});
//         }
//       })
//     });
//   db.close();
//   res.status(200).json({ 'serialno': sn, 'password': password });
// })

/**
 * 根据版本号获取设备的Restful地址
 * @returns Json数据字典，包括device-login, device-parameter等等
 */
router.get('/url/:version', (req, res) => {
  const {version} = req.params;  
  res.status(200).json({ 
    'device-login': `v${version}/login`,
    'device-parameter': `v${version}/parameter`,
    'device-command': `v${version}/command`,
    'device-status': `v${version}/status`,
    'device-progress': `v${version}/progress`,
    'device-result': `v${version}/result`,
    'device-error': `v${version}/error`,
    });       
})

router.put('/:version/:parameter/:id', (req, res) => {
  const {version, id} = req.params;
  
  res.status(200).json({ 'version': version, 'id': id });
})

module.exports = router;
