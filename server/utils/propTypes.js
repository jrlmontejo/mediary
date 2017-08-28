//
// Maps a field type to its schema type
//
module.exports = type => {
  switch(type) {
    case 'toggle':
      return Boolean
    case 'multiselect':
      return [String]
    case 'text':
    case 'textarea':
    case 'select':
    default:
      return String
  }
}