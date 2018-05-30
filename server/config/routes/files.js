'use strict'

const
  debug = require('util').debuglog(global.cfg.app.name),
  path = require('path'),
  fs = require('fs-extra'),
  Busboy = require('busboy')
,
  models = require('../../models'),
  { Album, Files } = models
;

module.exports = {
  async delete (req, res, done) {
    const
      user_id = req.user.id,
      album_id = req.session.current_album_id,
      file_id = req.params.id
    ;
    const hasDeletePermission = await Files.hasDeletePermission({ user_id, album_id })
    if (!hasDeletePermission) {
      const err = new Error(`You do not have permissions to delete file ${file_id}.`)
      err.code = 'UNAUTHORIZED_FILE_DELETE'
      return done(err)
    }
    debug('Has permission to delete file.')
    Files.delete(file_id)
      .then( results => {
        res.sendStatus(200)
        done()
      }).catch( err => {
        done(err)
      })
  },
  async post (req, res, done) {
    const 
      { current_album_id } = req.session,
      album_dir = path.join(global.cfg.uploads_dir, current_album_id),
      busboy = new Busboy({ headers: req.headers })
    ;

    debug(`Uploading files to album ${current_album_id}.`)

    try {
      await fs.mkdirp(album_dir)
    } catch (e) {
      return done(e)
    }

    const promises = []
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      promises.push(new Promise( (resolve, reject) => {
        const filepath = path.join(album_dir, filename)
        const fstream = fs.createWriteStream(filepath, { flags: 'wx' }) // write fails if file exists
        debug(`setting up fstream on ${filepath}.`)
        fstream.on('error', err => {
          if (err.code === 'EEXIST') {
            err = new Error('File already exists')
            err.code = 'FILE_ALREADY_EXISTS'
          } 
          reject(err, filename)
        })

        fstream.on('finish', async () => {
          let size
          try {
            size = (await fs.stat(filepath)).size
          } catch (e) {
            return reject(e)
          }
          debug('filesize:::', size)
          Files.save({ size, filepath, filename, encoding, mimetype, album_id: current_album_id })   
            .then( results => {
              resolve(results[0])
            })
            .catch( e => {
              // clean up file if database entry fails
              fs.unlink(filepath)
              reject(e)
            })
        })
        file.pipe(fstream)
      }))
    })

    busboy.on('finish', () => {
      // Don't let any of these file upload attempts fail the whole batch
      Promise.all(promises.map( p => p.catch(e => e)))
        .then( results => {
          let err_count = 0;
          const status = results.map( result => {
            if (result instanceof Error) {
              err_count++;
              return Object.assign(result, { error: true })
            } else {
              return { id: result.insertId }
            }
          })


          // if all files failed, just send the error object of one, since they're all the same anyways
          if (err_count === results.length) {
            done(status[0])
          } else {
            res.status(200).json({ status })
            done()
          }
        })
    })

    req.pipe(busboy)
  }
}
