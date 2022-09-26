import { checkCamp } from './checkCamp';
import { mergeRanges } from './mergeRanges';
import { Font, woff2 } from 'fonteditor-core';
import chalk from "chalk";
import fse from 'fs-extra';
import path from 'path';

const __dirname = path.resolve();

const fontWeightMap = {
  'Thin': 100,
  'Extra Light': 200,
  'Ultra Light': 200,
  'Light': 300,
  'Normal': 400,
  'Regular': 400,
  'Medium': 500,
  'Semi Bold': 600,
  'Demi Bold': 600,
  'Bold': 700,
  'Extra Bold': 800,
  'Ultra Bold': 800,
  'Heavy': 900,
  'Black': 900,
}

export const sliceFont = async (fontFile: string, unicodes: (number[])[], baseUrl: string) => {
  const fontFamily = path.basename(fontFile, '.ttf').split('-')[0];
  const fontSubFamily = path.basename(fontFile, '.ttf').split('-')[1];
  let css = '';
  const supportRanges = await checkCamp(fontFile, unicodes);
  const buffer = fse.readFileSync(fontFile);
  const outFolder = path.resolve(__dirname, `./fonts/${fontFamily}-${fontSubFamily}`);
  fse.emptyDirSync(outFolder);
  console.log(`[ ${chalk.blue('start')} ] ● 开始切片...`);
  for (let [key, range] of Object.entries(supportRanges)) {
    await woff2.init('../../node_modules/fonteditor-core/woff2/woff2.wasm').then(() => {
      let font = Font.create(buffer, {
        type: 'ttf',
        subset: range,
        hinting: false,
        compound2simple: false,
        combinePath: false,
      });
      const fontSlice: any = font.write({ type: 'woff2' });
      fse.writeFileSync(
        path.resolve(`./fonts/${fontFamily}-${fontSubFamily}`, `${fontFamily}-${fontSubFamily}.${key}.woff2`),
        fontSlice
      );
      css +=
        `/*${key}*/` +
        `@font-face{font-family: ${fontFamily}-${fontSubFamily};font-style: normal;` +
        `font-weight: ${fontWeightMap[fontSubFamily]};font-display:swap;` +
        `src: url('${baseUrl}${fontFamily}-${fontSubFamily}.${key}.woff2') format('woff2');` +
        `unicode-range: ${mergeRanges(range)};}\n`;
      console.log(`[ ${chalk.green('ok')} ] > ${fontFamily}-${fontSubFamily}.${key}.woff2`)
    });
  };
  fse.writeFileSync(
    path.resolve(`./fonts/${fontFamily}-${fontSubFamily}`, `${fontFamily}-${fontSubFamily}.css`),
    css.trim(),
    'utf-8'
  );

  console.log(`[ ${chalk.green('ok')} ] > ${fontFamily}-${fontSubFamily}.css`);
  console.log(`[ ${chalk.green('finish')} ] ✓ 已全部完成切片！`);
}