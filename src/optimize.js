const SVGO = require('svgo')
const crypto = require('crypto')

module.exports = (content, filename) => {
  // generate a unique id prefix, to ensure id's stay unique
  const filenameHash = crypto.createHash('sha1').update(filename).digest('hex').slice(-10)

  const svgoOptions = {
    js2svg: {
      pretty: true,
      indent: 2
    },
    plugins: [
      // custom plugin to remove xmlns AND xmlns:xlink
      // because { removeXMLNS: true } can't handle both
      {
        removeXmlns: {
          type: 'perItem',
          fn: item => {
            item.eachAttr(attr => {
              if (attr.local && attr.prefix === 'xmlns') {
                item.removeAttr(attr.name)
              }
            })
          }
        }
      },
      { removeXMLNS: true },
      { removeScriptElement: true },
      { removeDimensions: true },
      { cleanupIDs: {
        remove: false,
        minify: true,
        prefix: `s-${filenameHash}-`
      } },
      { removeTitle: true },
      { convertStyleToAttrs: false },
      { removeStyleElement: true },
      { sortAttrs: true }
    ]
  }
  return new Promise(resolve => {
    const svgo = new SVGO(svgoOptions)
    svgo.optimize(content, res => resolve(res.data))
  })
}
