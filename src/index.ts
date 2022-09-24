import {getSubsetType} from './utils/getSubsetType';
import {sliceFont} from './utils/silceFont';
import chalk from "chalk";

const typeMap = {
  'google': '谷歌',
  'bili': '哔哩哔哩',
  'xiaomi': '小米'
}

export const fontSubset = async ({fontFiles, type = 'google', customSubset}: {
  /** 字体组 */
  fontFiles: string[];
  /** 子集化方案 */
  type?: 'google' | 'bili' | 'xioami';
  /** 自定义子集化 */
  customSubset?: (number[])[];
}) => {
  console.log(`------ ${chalk.bgYellow(`当前使用 ${type ? typeMap[type]: '自定义'} 子集化方案`)} ------`);
  let unicodes: (number[])[] = [];
  if(customSubset){
    unicodes = customSubset;
  }else{
    unicodes = getSubsetType(type);
  }
  for (let fontFile of fontFiles){
    await sliceFont(fontFile, unicodes);
  }
}