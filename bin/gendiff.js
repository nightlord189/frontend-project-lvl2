#!/usr/bin/env node
import commanderPkg from 'commander';
const {Command} = commanderPkg;

const program = new Command();
program.version('0.0.1');
program
    .description('Compares two configuration files and shows a difference.')
    .usage ('[options] <filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')

program.parse(process.argv);

console.log('Compares two configuration files and shows a difference.');