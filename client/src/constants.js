

export const COLORFULL = [
  '#FF7F50',
  '#5F9EA0',
  '#6495ED',
  '#008B8B',
  '#556B2F',
  '#8B008B',
  '#E9967A',
  '#483D8B',
  '#696969',
  '#20B2AA',
  '#66CDAA',
  '#7B68EE',
  '#191970',
  '#BC8F8F',
  '#8B4513',
  '#00FF7F',
  '#008080',
  '#40E0D0',
];

export function getRandomColor() {
  return COLORFULL[Math.floor(Math.random() * COLORFULL.length)];
}

// https://stackoverflow.com/a/5624139
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

// https://stackoverflow.com/a/41491220
export function getFontColor(bgColor) {
  var color = hexToRgb(bgColor);
  var uicolors = [color.r / 255, color.g / 255, color.b / 255];
  var c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
  return (L > 0.179) ? '#000' : '#FFF';
}


