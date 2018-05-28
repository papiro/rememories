'use strict'

const { cfg } = global;
const { mysql: mysql_cfg, app } = cfg;
const
  debug = require('util').debuglog(app.name),
  pojo = require('../config/pojo')
,
  mysql = require('mysql2'),
  connection = mysql.createConnection({
    host: mysql_cfg.host,
    user: mysql_cfg.user,
    password: mysql_cfg.password,
    database: app.name
  })
,
  table = {
    users: require('./tables/users'),
    albums: require('./tables/albums'),
    useralbums: require('./tables/useralbums'),
    files: require('./tables/files')
  }
,
  select = {
    user: require('./selects/user'),
    albums: require('./selects/albums'),
    useralbums: require('./selects/useralbums'),
    files: require('./selects/files'),
    file: require('./selects/file')
  }
,
  insert = {
    user: require('./inserts/user'),
    album: require('./inserts/album'),
    useralbum: require('./inserts/useralbum'),
    files: require('./inserts/file')
  }
,
  remove = {
    album: require('./deletes/album'),
    file: require('./deletes/file')
  }
;

function query (query) {
  return new Promise( (resolve, reject) => {
    console.log(query)
    connection.query(query, (err, results) => {
      if (err) return reject(err)
      resolve([].concat(results).map( result => pojo(result) ))
    })
  })
}

class DB {
  static init () {
    // Create tables
    connection.query(table.users)
    connection.query(table.albums)
    connection.query(table.files)
    // Create junction table
    connection.query(table.useralbums)
  }
  static startTransaction () {
    return query('START TRANSACTION;')
  }
  static commit () {
    return query('COMMIT;')
  }
  static rollback () {
    return query('ROLLBACK;')
  }
  static addUser (args = {}) {
    return query(insert.user(args))
  }
  static getUser ({ id, type, name, email, password }) {
    return query(select.user({ id }))
  }
  static addAlbum (args = {}) {
    return query(insert.album(args))
  }
  static getAlbums (user_id) {
    return query(select.albums(user_id))
  }
  static associateAlbum (args = {}) {
    return query(insert.useralbum(args))
  }
  static getUserAlbum (args = {}) {
    return query(select.useralbums(args))
  }
  static deleteAlbum (id) {
    return query(remove.album(id))
  }
  static getFilesForAlbum (album_id) {
    return query(select.files(album_id))
  }
  static getFileById (file_id) {
    return query(select.file(file_id))
  }
  static saveFileForAlbum (args = {}) {
    return query(insert.files(args))
  }
  static deleteFile (file_id) {
    return query(remove.file(file_id))
  }
}

module.exports = DB
