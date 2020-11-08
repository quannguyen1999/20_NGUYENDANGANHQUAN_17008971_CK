var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
const { parse } = require('path');
require('dotenv').config()

const sanphamDao = require('../daos/sanphamV.dao')

/* GET home page. */
router.get('/', async (req, res) => {
  const sanpham = await sanphamDao.getAll();
  res.render('index', { sanpham: sanpham });
});


router.post('/sanpham/add', async (req, res) => {
  const classroom = {
    id: uuid.v1(),
    ma_sanpham: req.body.ma_sanpham,
    ten: req.body.ten,
    soluong:req.body.soluong
  }
  const success = await sanphamDao.add(classroom)
  if(success) {
    res.redirect('/')
  } else {
    res.status(400).send("Invalid")
  }
})


router.get('/sanpham/delete/:id', async (req, res) => {
  const ma_lop = req.params.id;
  const success = await sanphamDao.delete(ma_lop);
  if(success) {
    res.redirect('/')
  } else {
    res.status(400).send("Invalid")
  }
});

router.get('/sanpham/update/form/:id', async (req, res) => {
  const ma_lop = req.params.id;
  const classroom = await sanphamDao.getSingleById(ma_lop);
  res.render('formSanPhamUpdate', {
    classItem:classroom
  })
})

router.post('/sanpham/update/:id', async (req, res) => {
  const classroom = {
    ma_sanpham: req.body.ma_sanpham,
    ten: req.body.ten,
    soluong: req.body.soluong
  }
  console.log(classroom)
  const success = await sanphamDao.update(classroom);
  if(success) {
    res.redirect('/')
  } else {
    res.status(400).send("Invalid")
  }
})

module.exports = router;
