const getColorClass = (name = '') => {
  switch (name) {
    case 'green':
      return {
        color1: 'bg-green-700',
        color2: 'hover:bg-green-800',
        color3: 'focus:ring-green-300',
        color4: 'dark:bg-green-600',
        color5: 'dark:hover:bg-green-700',
        color6: 'dark:focus:ring-green-800'
      }
    case 'blue':
      return {
        color1: 'bg-blue-700',
        color2: 'hover:bg-blue-800',
        color3: 'focus:ring-blue-300',
        color4: 'dark:bg-blue-600',
        color5: 'dark:hover:bg-blue-700',
        color6: 'dark:focus:ring-blue-800'
      }
    case 'yellow':
      return {
        color1: 'bg-yellow-700',
        color2: 'hover:bg-yellow-800',
        color3: 'focus:ring-yellow-300',
        color4: 'dark:bg-yellow-600',
        color5: 'dark:hover:bg-yellow-700',
        color6: 'dark:focus:ring-yellow-800'
      }
      case 'cyan':
        return {
          color1: 'bg-cyan-700',
          color2: 'hover:bg-cyan-800',
          color3: 'focus:ring-cyan-300',
          color4: 'dark:bg-cyan-600',
          color5: 'dark:hover:bg-cyan-700',
          color6: 'dark:focus:ring-cyan-800'
        }
    default:
      return {
        color1: 'bg-red-700',
        color2: 'hover:bg-red-800',
        color3: 'focus:ring-red-300',
        color4: 'dark:bg-red-600',
        color5: 'dark:hover:bg-red-700',
        color6: 'dark:focus:ring-red-800'
      }
  }
}

export default getColorClass