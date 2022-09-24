import json from "@rollup/plugin-json";
import typescript from '@rollup/plugin-typescript';
import babel from "@rollup/plugin-babel";
import fse from "fs-extra";
import resolve from "@rollup/plugin-node-resolve";

fse.emptyDirSync("./dist");

export default {
  external: [],
  input: "./src/index.ts",
  output: {
    dir: "./dist",
    format: "es",
    paths: {},
  },
  plugins: [
    json({
      namedExports: false,
    }),
    typescript(),
    babel({
      extensions: [".ts"],
      babelHelpers: "bundled",
    }),
    resolve({
      extensions: [".ts"],
      moduleDirectories: [],
    }),
  ],
};