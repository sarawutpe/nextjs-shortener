const express = require('express');
const router = express.Router();
const { Sequelize, Op, NOW } = require('sequelize');
const { customAlphabet } = require('nanoid');
const Link = require('../models/linkModel');

const shortLinkExists = async (shortLink) => {
  try {
    const result = await Link.findOne({ where: { shortLink: shortLink } });
    if (result) {
      throw new Error('Short Link already exists');
    }
    return;
  } catch (error) {
    return error.message;
  }
};

// create link
router.post('/link', async (req, res) => {
  try {
    const { Link, shortLink, view } = req.body;
    const uniqueLink = customAlphabet(
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      6
    );
    const data = {
      Link: Link,
      shortLink: shortLink ? shortLink : uniqueLink(),
      view: view,
    };
    // check short link already exists
    const checkShortLinkExists = await shortLinkExists(data.shortLink);
    if (checkShortLinkExists) {
      res.json({ ok: false, data: checkShortLinkExists });
    } else {
      const result = await Link.create(data);
      res.json({ ok: true, data: result });
    }
  } catch (error) {
    res.json({ ok: false, error: error.message });
  }
});

// get link
router.get('/link', async (req, res) => {
  try {
    const result = await Link.findAll({
      order: [['id', 'DESC']],
    });
    res.json({ ok: true, data: result });
  } catch (error) {
    res.json({ ok: true, data: error.message });
  }
});

// get link by short link
router.get('/link/short_Link/:query', async (req, res) => {
  try {
    const query = req.params.query;
    // find one link
    const findOneLink = await Link.findOne({ where: { shortLink: query } });
    // add view
    const addView = await Link.update(
      { view: findOneLink?.view + 1 },
      { where: { id: findOneLink?.id } }
    );
    if (findOneLink && addView) {
      res.json({ ok: true, data: findOneLink });
    } else {
      res.json({ ok: false, data: result });
    }
  } catch (error) {
    res.json({ ok: false, data: error.message });
  }
});

// get link statistic
router.get('/link/statistic', async (req, res) => {
  try {
    // all traffic
    let allTraffic = await Link.findOne({
      attributes: [[Sequelize.fn('SUM', Sequelize.col('view')), 'all_traffic']],
    });
    allTraffic = parseInt(await allTraffic?.dataValues?.all_traffic);
    // all link
    let allLink = await Link.count();
    // top traffic
    let topTraffic = await Link.findOne({
      attributes: [[Sequelize.fn('MAX', Sequelize.col('view')), 'top_traffic']],
    });
    topTraffic = parseInt(await topTraffic?.dataValues?.top_traffic);
    // to day link
    let todayLink = await Link.findOne({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'link']],
      where: {
        createdAt: {
          [Op.gte]: Sequelize.fn('CURRENT_DATE'),
        },
      },
    });
    todayLink = parseInt(await todayLink?.dataValues?.link);
    // historical chart
    let historicalChart = await Link.findAll({
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
  } catch (error) {
    res.json({ ok: false, data: error.message });
  }
});

// get link all statistic
router.get('/link/allstatistic', async (req, res) => {
  try {
    // all traffic
    let allTraffic = await Link.findOne({
      attributes: [[Sequelize.fn('SUM', Sequelize.col('view')), 'all_traffic']],
    });
    allTraffic = parseInt(await allTraffic?.dataValues?.all_traffic);
    // all link
    let allLink = await Link.count();
    // top traffic
    let topTraffic = await Link.findOne({
      attributes: [[Sequelize.fn('MAX', Sequelize.col('view')), 'top_traffic']],
    });
    topTraffic = parseInt(await topTraffic?.dataValues?.top_traffic);
    // historical chart
    let historicalChart = await Link.findAll({
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

// update link
router.put('/link/:id', async (req, res) => {
  try {
    const result = await Link.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({ ok: true, data: result });
  } catch (error) {
    res.json({ ok: true, data: error.message });
  }
});

// delete link
router.delete('/link/:id', async (req, res) => {
  try {
    const result = Link.destroy({
      where: { id: req.params.id },
    });
    res.json({ ok: true, data: result });
  } catch (error) {
    res.json({ ok: true, data: error.message });
  }
});

// multi delete link
router.put('/link', async (req, res) => {
  try {
    const { LinkList } = req.body;
    if (LinkList.length) {
      for await (const id of LinkList) {
        await Link.destroy({ where: { id: id } });
      }
    }
    res.json({ ok: true, data: '' });
  } catch (error) {
    res.json({ ok: true, data: error.message });
  }
});

module.exports = router;
