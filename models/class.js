class Label {
  constructor(id, name, since, city) {
    this.id = id;
    this.name = name;
    this.since = since;
    this.city = city;
  }

  get formattedDate() {
    const newDate = new Date(this.since);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(newDate);
    return formattedDate;
  }
}

class LabelDetailDuration extends Label {
  constructor(id, name, since, city, averageDuration, minDuration, maxDuration) {
    super(id, name, since, city);
    this.averageDuration = averageDuration;
    this.minDuration = minDuration;
    this.maxDuration = maxDuration;
  }
}

class Song {
  constructor(id, title, bandName, duration, genre, totalVote) {
    this.id = id;
    this.title = title;
    this.bandName = bandName;
    this.duration = duration;
    this.genre = genre;
    this.totalVote = totalVote;
  }
}

class SongDetail extends Song {
  constructor(id, title, bandName, duration, genre, totalVote, createdDate, lyric, imageUrl, LabelId, LabelName) {
    super(id, title, bandName, duration, genre, totalVote);
    this.createdDate = createdDate;
    this.lyric = lyric;
    this.imageUrl = imageUrl;
    this.LabelId = LabelId;
    this.LabelName = LabelName;
  }
  get formattedDate() {
    const newDate = new Date(this.createdDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(newDate);
    return formattedDate;
  }

  get formatDateISO() {
    const isoString = this.createdDate.toISOString();
    const formattedDate = isoString.split('T')[0];
    return formattedDate;
  }
}

class Factory {
  static createLabel(id, name, since, city) {
    return new Label(id, name, since, city);
  }
  static createLabelDetailDuration(id, name, since, city, averageDuration, minDuration, maxDuration) {
    return new LabelDetailDuration(id, name, since, city, averageDuration, minDuration, maxDuration);
  }
  static createSong(id, title, bandName, duration, genre, totalVote) {
    return new Song(id, title, bandName, duration, genre, totalVote);
  }
  static createSongDetail(id, title, bandName, duration, genre, totalVote, createdDate, lyric, imageUrl, LabelId, LabelName) {
    return new SongDetail(id, title, bandName, duration, genre, totalVote, createdDate, lyric, imageUrl, LabelId, LabelName);
  }
  static createLabels(array) {
    const data = array.map((el) => {
      const { id, name, since, city } = el;
      return this.createLabel(id, name, since, city);
    });
    return data;
  }
  static createLabelDetailDurations(array) {
    const data = array.map((el) => {
      const { id, name, since, city, AVG: averageDuration, MIN: minDuration, MAX: maxDuration } = el;
      return this.createLabelDetailDuration(id, name, since, city, +averageDuration, +minDuration, +maxDuration);
    });
    return data;
  }
  static createSongs(array) {
    const data = array.map((el) => {
      const { id, title, bandName, duration, genre, totalVote } = el;
      return this.createSong(id, title, bandName, duration, genre, totalVote);
    });
    return data;
  }
  static createSongDetails(array) {
    const data = array.map((el) => {
      const { id, title, bandName, duration, genre, totalVote, createdDate, lyric, imageUrl, LabelId, LabelName } = el;
      return this.createSongDetail(id, title, bandName, duration, genre, totalVote, createdDate, lyric, imageUrl, LabelId, LabelName);
    });
    return data;
  }
}

module.exports = Factory;
