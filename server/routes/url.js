const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const { customAlphabet } = require('nanoid');
const Url = require('../models/urlModel');

// create url
router.post('/url', async (req, res) => {
  try {
    const { url, shortUrl, view } = req.body;
    const uniqueUrl = customAlphabet(
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      6
    );
    const data = {
      url: url,
      shortUrl: shortUrl ? shortUrl : uniqueUrl(),
      view: view,
    };
    const result = await Url.create(data);
    res.json({ ok: true, result: result });
  } catch (error) {
    res.json({ ok: false, error: error.name });
  }
});

// get url
router.get('/url', async (req, res) => {
  try {
    const result = await Url.findAll({});
    res.json({ ok: true, data: result });
  } catch (error) {
    res.json({ ok: true, data: error.name });
  }
});

// get url by short url
router.get('/url/short_url/:query', async (req, res) => {
  try {
    const query = req.params.query;
    // find one url
    const findOneUrl = await Url.findOne({ where: { shortUrl: query } });
    // add view
    const addView = await Url.update(
      { view: findOneUrl?.view + 1 },
      { where: { id: findOneUrl?.id } }
    );
    if (findOneUrl && addView) {
      res.json({ ok: true, data: findOneUrl });
    } else {
      res.json({ ok: false, data: result });
    }
  } catch (error) {
    res.json({ ok: false, data: error.name });
  }
});

// get url statistic
router.get('/url/statistic', async (req, res) => {
  try {
    const allTraffic = await Url.findOne({
      attributes: [[Sequelize.fn('SUM', Sequelize.col('view')), 'all_traffic']],
    });
    const newAllTraffic = parseInt(await allTraffic?.dataValues?.all_traffic);
    const allLink = await Url.count();
    const data = {
      all_traffic: newAllTraffic,
      all_link: allLink,
    };
    res.json({ ok: true, data: data });
  } catch (error) {
    res.json({ ok: false, data: error.name });
  }
});

// update url
router.put('/url/:id', async (req, res) => {
  try {
    const result = await Url.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({ ok: true, data: result });
  } catch (error) {
    res.json({ ok: true, data: error.name });
  }
});

// delete url
router.delete('/url/:id', async (req, res) => {
  try {
    console.log(req);

    const result = Url.destroy({
      where: { id: req.params.id },
    });
    res.json({ ok: true, data: result });
  } catch (error) {
    res.json({ ok: true, data: error.name });
  }
});

// multi delete url
router.put('/url', async (req, res) => {
  try {
    const { urlList } = req.body;
    if (urlList.length) {
      for await (const id of urlList) {
        await Url.destroy({ where: { id: id } });
      }
    }
    res.json({ ok: true, data: result });
  } catch (error) {
    res.json({ ok: true, data: error.name });
  }
});

module.exports = router;
