const SVGO = require('svgo')
const crypto = require('crypto')

const removeXmlns = require('./svgo-plugins/removeXmlns')
const addKeyAttribute = require('./svgo-plugins/addKeyAttribute')

module.exports = content => {
  // generate a unique id prefix, to ensure id's stay unique
  const hash = crypto.createHash('sha1').update(content).digest('hex').slice(-10)

  const svgoOptions = {
    js2svg: {
      pretty: true,
      indent: 2
    },
    plugins: [
      { removeXmlns },
      { removeXMLNS: true },
      { removeScriptElement: true },
      { removeDimensions: true },
      { cleanupIDs: {
        remove: true,
        minify: true,
        prefix: `s-${hash}-`
      } },
      { removeTitle: true },
      { convertStyleToAttrs: false },
      { removeStyleElement: true },
      { addKeyAttribute },
      { sortAttrs: true }
    ]
  }

  const svgo = new SVGO(svgoOptions)
  return svgo.optimize(content, {})
}
