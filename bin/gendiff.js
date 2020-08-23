#!/usr/bin/env node
import commanderPkg from 'commander';
import genDiff from '../src/gendiff.js';

const { Command } = commanderPkg;

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .usage('[options] <filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish');

program.version('1.0.0')
  .arguments('<file1> <file2>')
  .action((file1, file2, options) => {
    const result = genDiff(file1, file2, options.format);
    console.log(result);
  });

program.parse(process.argv);

console.log('Compares two configuration files and shows a difference.');
