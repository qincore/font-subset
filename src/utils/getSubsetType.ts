import googleSubset from '../subset/google.json';
import biliSubset from '../subset/bili.json';
import xiaomiSubset from '../subset/xiaomi.json';

export const getSubsetType = (type?: string) =>{
  const unicodes = {
    'google': googleSubset,
    'bili': biliSubset,
    'xiaomi': xiaomiSubset,
  }
  return unicodes[type ?? 'google'];
}