const express = require('express');
const router = express.Router();
const { Sequelize, Op, NOW } = require('sequelize');
const bcrypt = require('bcrypt');
const { customAlphabet } = require('nanoid');
const Url = require('../models/urlModel');

const shortUrlExists = async (shortUrl) => {
  try {
    const result = await Url.findOne({ where: { shortUrl: shortUrl } });
    if (result) {
      throw new Error('Short URL already exists');
    }
    return;
  } catch (error) {
    return error.message;
  }
};

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
    // check short url already exists
    const checkShortUrlExists = await shortUrlExists(data.shortUrl);
    if (checkShortUrlExists) {
      res.json({ ok: false, data: checkShortUrlExists });
    } else {
      const result = await Url.create(data);
      res.json({ ok: true, data: result });
    }
  } catch (error) {
    res.json({ ok: false, error: error.message });
  }
});

// get url
router.get('/url', async (req, res) => {
  try {
    const result = await Url.findAll({
      order: [['id', 'DESC']],
    });
    res.json({ ok: true, data: result });
  } catch (error) {
    res.json({ ok: true, data: error.message });
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
    res.json({ ok: false, data: error.message });
  }
});

// get url statistic
router.get('/url/statistic', async (req, res) => {
  try {
    // all traffic
    let allTraffic = await Url.findOne({
      attributes: [[Sequelize.fn('SUM', Sequelize.col('view')), 'all_traffic']],
    });
    allTraffic = parseInt(await allTraffic?.dataValues?.all_traffic);
    // all link
    let allLink = await Url.count();
    // top traffic
    let topTraffic = await Url.findOne({
      attributes: [[Sequelize.fn('MAX', Sequelize.col('view')), 'top_traffic']],
    });
    topTraffic = parseInt(await topTraffic?.dataValues?.top_traffic);


    // to day link
    let todayLink = await Url.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'links']
      ],
      where: {
        createdAt: {
          [Op.gte]: '2022-06-12'
        }
      }
    })
    
    // historical chart
    let historicalChart = await Url.findAll({
      attributes: [
        [Sequelize.col('createdAt'), 'date'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'link'],
      ],
      group: [Sequelize.fn('DAY', Sequelize.col('createdAt'))],
    });

    const data = {
      allTraffic: allTraffic,
      allLink: allLink,
      topTraffic: topTraffic,
      topdayLink: todayLink,
      historicalChart: historicalChart,
    };

    res.json({ ok: true, data: data });

    // // all traffic
    // let allTraffic = await Url.findOne({
    //   attributes: [[Sequelize.fn('SUM', Sequelize.col('view')), 'all_traffic']],
    // });
    // allTraffic = parseInt(await allTraffic?.dataValues?.all_traffic);
    // // all link
    // let allLink = await Url.count();
    // const data = {
    //   allTraffic: allTraffic,
    //   allLink: allLink,
    // };
    // res.json({ ok: true, data: data });
  } catch (error) {
    res.json({ ok: false, data: error.message });
  }
});

// get url all statistic
router.get('/url/allstatistic', async (req, res) => {
  try {
    // all traffic
    let allTraffic = await Url.findOne({
      attributes: [[Sequelize.fn('SUM', Sequelize.col('view')), 'all_traffic']],
    });
    allTraffic = parseInt(await allTraffic?.dataValues?.all_traffic);
    // all link
    let allLink = await Url.count();
    // top traffic
    let topTraffic = await Url.findOne({
      attributes: [[Sequelize.fn('MAX', Sequelize.col('view')), 'top_traffic']],
    });
    topTraffic = parseInt(await topTraffic?.dataValues?.top_traffic);
    // historical chart
    let historicalChart = await Url.findAll({
      attributes: [
        [Sequelize.col('createdAt'), 'date'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'links'],
      ],
      group: [Sequelize.fn('DAY', Sequelize.col('createdAt'))],
    });

    const data = {
      allTraffic: allTraffic,
      allLink: allLink,
      topTraffic: topTraffic,
      historicalChart: historicalChart,
    };

    res.json({ ok: true, data: data });
  } catch (error) {
    res.json({ ok: false, data: error.message });
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
    res.json({ ok: true, data: error.message });
  }
});

// delete url
router.delete('/url/:id', async (req, res) => {
  try {
    const result = Url.destroy({
      where: { id: req.params.id },
    });
    res.json({ ok: true, data: result });
  } catch (error) {
    res.json({ ok: true, data: error.message });
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
    res.json({ ok: true, data: '' });
  } catch (error) {
    res.json({ ok: true, data: error.message });
  }
});

module.exports = router;
