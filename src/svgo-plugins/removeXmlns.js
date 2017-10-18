module.exports = {
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
