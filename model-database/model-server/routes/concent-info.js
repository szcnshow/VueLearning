const express = require('express');
const sqlite3 = require('sqlite3');
const router = express.Router();
const verifyToken = require('../middleware/verify-token')
const curd = require("./common-curd")

/*查询*/
router.get('/', verifyToken, (req, res) => {
  const sqlstr = "SELECT id, name, unit, description from concentinfo";
  curd.common_curd('/model.sqlite').common_query(sqlstr, res);
});

/* 新增*/
router.post('/', verifyToken, (req, res, next) => {
  const {name, unit, description} = req.body;
  const sqlstr = "SELECT id, name, unit, description from concentinfo";
  const op = new curd.common_curd.common_query(sqlstr, res);
});


/* 新增*/
router.post('/', verifyToken, (req, res, next) => {
  const db = new sqlite3.Database('/model.sqlite');
  const {name, unit, description} = req.body;

  db.serialize( ()=> {
    const cmd = db.prepare(`INSERT INTO concentinfo(name, unit, description) values (?,?,?)`);
    cmd.run(name, unit, description, (err, row) => {  
      if(err) {
        res.status(404).json({status: err});
      } else {
        res.status(200).json({id: row.id});
      }
    });
    cmd.finalize(); 
  });
  db.close();
});


/* 修改*/
router.post('/', verifyToken, (req, res, next) => {
  const db = new sqlite3.Database('/model.sqlite');
  const {name, unit, description} = req.body;

  db.serialize( ()=> {
    const cmd = db.prepare(`INSERT INTO concentinfo(name, unit, description) values (?,?,?)`);
    cmd.run(name, unit, description, (err, row) => {  
      if(err) {
        res.status(404).json({status: err});
      } else {
        res.status(200).json({id: row.id});
      }
    });
    cmd.finalize(); 
  });
  db.close();
});

/* 删除 */
router.delete('/:id', verifyToken, (req, res, next) => {
  const db = new sqlite3.Database('/model.sqlite');
  const {id} = req.params;

  db.serialize( ()=> {
    const cmd = db.prepare(`DELETE FROM concentinfo where id = (?)`);
    cmd.run(id, (err) => {  
      if(err) {
        res.status(404).json({status: err});
      } else {
        res.status(200).json({status: 'OK'});
      }
    });
    cmd.finalize(); 
  });
  db.close();
});
