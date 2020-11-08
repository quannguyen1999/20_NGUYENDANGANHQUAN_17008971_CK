var express = require('express');
var uuid = require('node-uuid');
const sanphamVDao = require('../daos/sanphamV.dao');
var router = express.Router();

// Get all
router.get('/sanphamV', async (req, res) => {
    const sanphamV = await sanphamVDao.getAll();
    res.send(sanphamV);
  })

// create new class
router.post('/sanphamV', async (req, res) => {
    const classroom = {
      id: uuid.v1(),
      ma_sanpham: req.body.ma_sanpham,
      ten: req.body.ten,
      soluong: req.body.soluong
    }
    const success = await sanphamVDao.add(classroom)
    if(success) {
      res.send('Create Success');
    } else {
      res.status(400).send("Invalid")
    }
  })

  
// delete class by ma_sanpham
router.delete('/sanphamV/:id', async (req, res) => {
    const ma_sanpham = req.params.id;
    const success = await sanphamVDao.delete(ma_sanpham);
    if(success) {
      res.send('Delete Success');
    } else {
      res.status(400).send("Invalid")
    }
  })

// Get user by ma_sanpham
router.get('/sanphamV/:id', async (req, res) => {
    const ma_sanpham = req.params.id;
    console.log(ma_sanpham)
    const classroom = await sanphamVDao.getSingleById(ma_sanpham);
    res.send(classroom);
  })

  // update class by ma_sanpham
router.put('/sanphamV/:id', async (req, res) => {
    const classroom = {
      ma_sanpham: req.params.id,
      ten: req.body.ten,
      soluong: req.body.soluong
    }
    const success = await sanphamVDao.update(classroom);
    if(success) {
      res.send('Update Success');
    } else {
      res.status(400).send("Invalid")
    }
  })
  

  module.exports = router;
  