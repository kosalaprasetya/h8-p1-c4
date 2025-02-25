const Model = require('../models/model.js');

class Controller {
  static async main(req, res) {
    try {
      res.render('home');
    } catch (error) {
      res.send(error);
    }
  }

  static async labels(req, res) {
    try {
      const dataLabel = await Model.readLabels();
      res.render('labels', { dataLabel });
    } catch (error) {
      res.send(error);
    }
  }

  static async labeldetail(req, res) {
    try {
      const data = await Model.readLabelDetail();
      res.render('labelDetail', { data });
    } catch (error) {
      res.send(error);
    }
  }

  static async songs(req, res) {
    try {
      const { search } = req.query;
      const data = await Model.readSongs(search);
      res.render('songs', { data });
    } catch (error) {
      res.send(error);
    }
  }

  static async songsById(req, res) {
    try {
      const { id } = req.params;
      const data = await Model.readSongsId(id);
      res.render(`songsById`, { data });
    } catch (error) {
      res.send(error);
    }
  }

  static async addSong(req, res) {
    try {
      const labels = await Model.readLabels();
      let { errors } = req.query;
      if (errors) {
        if (errors.length > 0) errors = errors.split(',');
      }
      res.render('addSong', { labels, errors });
    } catch (error) {
      res.send(error);
    }
  }

  static async postSong(req, res) {
    try {
      const { title, bandName, duration, genre, lyric, imageUrl, LabelId, createdDate } = req.body;
      await Model.addSong(title, bandName, duration, genre, lyric, imageUrl, LabelId, createdDate);
      res.redirect('/songs');
    } catch (error) {
      res.redirect(`/songs/add?errors=${error}`);
    }
  }

  static async deleteSong(req, res) {
    try {
      const { id } = req.params;
      await Model.deleteSong(id);
      res.redirect('/songs');
    } catch (error) {
      res.send(error);
    }
  }

  static async editSong(req, res) {
    try {
      const { id } = req.params;
      const songData = await Model.readSongsId(id);
      const labels = await Model.readLabels();
      const data = songData[0];
      let { errors } = req.query;
      if (errors) {
        if (errors.length > 0) errors = errors.split(',');
      }
      res.render('editSong', { labels, data, errors });
    } catch (error) {
      const { id } = req.params;
      res.redirect(`/songs/${id}/edit?errors=${error}`);
      // res.send(error);
    }
  }

  static async postEditSong(req, res) {
    try {
      const { id } = req.params;
      const { title, bandName, duration, genre, lyric, imageUrl, LabelId, createdDate } = req.body;
      await Model.updateSong(id, title, bandName, duration, genre, lyric, imageUrl, LabelId, createdDate);
      res.redirect('/songs');
    } catch (error) {
      res.send(error);
    }
  }

  static async upVoteSong(req, res) {
    try {
      const { id } = req.params;
      await Model.upVoteSong(+id);
      res.redirect(`/songs/${id}`);
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
