#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../src/index.js';

const { Command } = commander;

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .usage('[options] <filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .version('1.0.0')
  .arguments('<filePath1> <filePath2>')
  .action((filePath1, filePath2, options) => {
    const result = genDiff(filePath1, filePath2, options.format);
    console.log(result);
  });

program.parse(process.argv);
