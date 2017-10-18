const SVGO = require('svgo')
const crypto = require('crypto')

module.exports = content => {
  // generate a unique id prefix, to ensure id's stay unique
  const hash = crypto.createHash('sha1').update(content).digest('hex').slice(-10)

  const svgoOptions = {
    js2svg: {
      pretty: true,
      indent: 2
    },
    plugins: [
      {
        removeXmlns: {
          type: 'perItem',
          description: 'remove xmlns AND xmlns:xlink, because { removeXMLNS: true } can not handle both',
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
        remove: true,
        minify: true,
        prefix: `s-${hash}-`
      } },
      { removeTitle: true },
      { convertStyleToAttrs: false },
      { removeStyleElement: true },
      {
        addKeyAttribute: {
          type: 'full',
          description: 'adds a key attribute for all direct children of <svg /> for React',
          fn: tree => {
            const attrName = 'key'
            let keys = 0
            if (tree.content[0] && tree.content[0].content.length) {
              tree.content[0].content = tree.content[0].content.map(item => {
                if (item.hasAttr(attrName)) { return }
                item.addAttr({
                  name: attrName,
                  prefix: '',
                  local: attrName,
                  value: item.attr('id') || `key-${keys++}`
                })
                return item
              })
            }
            return tree
          }
        }
      },
      { sortAttrs: true }
    ]
  }
  return new Promise(resolve => {
    const svgo = new SVGO(svgoOptions)
    svgo.optimize(content, res => resolve(res.data))
  })
}
