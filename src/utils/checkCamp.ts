import { Font } from 'fonteditor-core';
import fse from 'fs-extra';

export const checkCamp = async (fontFile: string, unicodes: (number[])[]) => {
  const support: (number[])[] = []
  const buffer = fse.readFileSync(fontFile);

  const font = Font.create(buffer, {
    type: 'ttf',
    hinting: false,
    compound2simple: false,
    combinePath: false,
  })

  const cmap = font.get().cmap;

  for (let unicode of unicodes) {
    const supportItem: number[] = [];
    unicode.forEach(item => {
      if (`${item}` in cmap) {
        supportItem.push(item)
      }
    })
    if(supportItem.length > 0){
      support.push(supportItem)
    }
  }

  return support
}