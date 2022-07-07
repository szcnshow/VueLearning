//样品信息库

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token')
const curd = require("./common-curd")

//const dbop= new curd('model.sqlite');
const dbop = curd;

/*查询*/
router.get('/', verifyToken, (req, res) => {
  const sqlstr = "SELECT id, name, company, description from sampleinfo";
  dbop.common_query(sqlstr, res);
});

router.get('/:id', verifyToken, (req, res) => {
  const {id} = req.params;
  const sqlstr = `SELECT id, name, company, description from sampleinfo where id = ${id}`;
  dbop.common_query(sqlstr, res);
});

/**
 * 新增样品信息
 */
// router.post('/', verifyToken, (req, res) => {
//   dbop.common_post('sampleinfo', req.body, res);
// });

router.post('/', (req, res) => {
  dbop.common_post('sampleinfo', req.body, res);
});

/* 修改 */
router.put('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  dbop.common_put('sampleinfo', req.body, `id=${id}`, res);
});

/* 删除 */
router.delete('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  // const sqlstr = `delete from sampleinfo where id='${id}' `;
  dbop.common_delete('sampleinfo', `id='${id}'`, res);
});

module.exports = router;
