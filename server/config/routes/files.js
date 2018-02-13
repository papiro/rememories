'use strict'

const
  debug = require('util').debuglog('rememories'),
  path = require('path'),
  fs = require('fs-extra'),
  Busboy = require('busboy')
,
  models = require('../../models'),
  { Dashboard, Files } = models
;

module.exports = {
  async delete (req, res, done) {
    const
      user_id = req.user.id,
      dashboard_id = req.session.current_dashboard_id,
      file_id = req.params.id
    ;
    const hasDeletePermission = await Files.hasDeletePermission({ user_id, dashboard_id, file_id })
    if (!hasDeletePermission) {
      const err = new Error(`You do not have permissions to delete file ${file_id}.`)
      err.code = 'UNAUTHORIZED_FILE_DELETE'
      return done(err)
    }
    debug('Has permission to delete file.')
    Files.delete(file_id)
      .then( results => {
        debug(results)
        res.sendStatus(200)
        done()
      }).catch( err => {
        done(err)
      })
  },
  async post (req, res, done) {
    const 
      { current_dashboard_id } = req.session,
      dashboard_dir = path.join('/var','lib', 'mysql', 'uploads', current_dashboard_id),
      busboy = new Busboy({ headers: req.headers })
    ;

    debug(`Uploading files to dashboard ${current_dashboard_id}.`)

    try {
      await fs.mkdirp(dashboard_dir)
    } catch (e) {
      return done(err)
    }

    const promises = []
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      promises.push(new Promise( (resolve, reject) => {
        const filepath = path.join(dashboard_dir, filename)
        const fstream = fs.createWriteStream(filepath, { flags: 'wx' }) // write fails if file exists
        console.log(`setting up fstream on ${filepath}.`)
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
          Files.save({ size, filepath, filename, encoding, mimetype, dashboard_id: current_dashboard_id })   
            .then(resolve)
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
      Promise.all(promises.map( p => p.catch(e => e)))
        .then( results => {
          console.log('success!')
          res.status(200).json({ 
            status: results.map( result => {
              if (result instanceof Error) {
                result.error = true
                return result
              } else
                return true
            })
          })
          done()
        })
        .catch( err => {
          console.log('fail :(')
          console.error(err)
          done(err)
        })
    })

    req.pipe(busboy)
  }
}
