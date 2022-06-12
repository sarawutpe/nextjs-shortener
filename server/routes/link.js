const express = require('express');
const router = express.Router();
const { Sequelize, Op, NOW } = require('sequelize');
const { customAlphabet } = require('nanoid');
const Link = require('../models/linkModel');

const shortLinkExists = async (id, shortLink) => {
  try {
    const result = await Link.findOne({
      where: {
        [Op.and]: [
          {
            id: {
              [Op.ne]: id,
            },
          },
          {
            shortLink: {
              [Op.eq]: shortLink,
            },
          },
        ],
      },
    });
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
    const { link, shortLink, view } = req.body;
    const uniqueLink = customAlphabet(
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      6
    );
    const data = {
      link: link,
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

// get private link statistic with param range
router.get('/link/statistic/:range', async (req, res) => {
  try {
    let range = req.params.range;
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
    const setRange = range == '1D' ? 1 : range == '7D' ? 7 : range == '30D' ? 30 : allLink;
    let historicalChart = await Link.findAll({
      limit: setRange,
      attributes: [
        [Sequelize.col('createdAt'), 'date'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'link'],
      ],
      group: [Sequelize.fn('DAY', Sequelize.col('createdAt'))],
    });
    const data = {
      allTraffic: allTraffic || 0,
      allLink: allLink || 0,
      topTraffic: topTraffic || 0,
      todayLink: todayLink || 0,
      historicalChart: historicalChart || [],
    };
    res.json({ ok: true, data: data });
  } catch (error) {
    res.json({ ok: false, data: error.message });
  }
});

// get public link statistic
router.get('/link/statistic', async (req, res) => {
  try {
    // all traffic
    let allTraffic = await Link.findOne({
      attributes: [[Sequelize.fn('SUM', Sequelize.col('view')), 'all_traffic']],
    });
    allTraffic = parseInt(await allTraffic?.dataValues?.all_traffic);
    // all link
    let allLink = await Link.count();
    const data = {
      allTraffic: allTraffic || 0,
      allLink: allLink || 0,
    };
    res.json({ ok: true, data: data });
  } catch (error) {
    res.json({ ok: false, data: error.message });
  }
});

// update link
router.put('/link/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { shortLink } = req.body;
    // check short link already exists
    const checkShortLinkExists = await shortLinkExists(id, shortLink);
    if (checkShortLinkExists) {
      res.json({ ok: false, data: checkShortLinkExists });
    } else {
      const result = await Link.update(req.body, {
        where: { id: id },
      });
      res.json({ ok: true, data: result });
    }
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
    const { linkList } = req.body;
    if (linkList.length) {
      for await (const id of linkList) {
        await Link.destroy({ where: { id: id } });
      }
    }
    res.json({ ok: true, data: '' });
  } catch (error) {
    res.json({ ok: true, data: error.message });
  }
});

module.exports = router;
