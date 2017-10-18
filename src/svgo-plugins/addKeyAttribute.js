module.exports = {
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
