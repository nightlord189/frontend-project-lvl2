#!/usr/bin/env node
import commanderPkg from 'commander';
import genDiff from '../src/gendiff.js';

const { Command } = commanderPkg;

const program = new Command();
program.version('0.0.1');
program
  .description('Compares two configuration files and shows a difference.')
  .usage('[options] <filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format');

program.version('1.0.0')
  .arguments('<file1> <file2>')
  .action((file1, file2) => {
    const result = genDiff(file1, file2);
    console.log(result);
  });

program.parse(process.argv);

console.log('Compares two configuration files and shows a difference.');
