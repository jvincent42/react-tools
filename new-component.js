#!/usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* -------------------------------------------------------------------------- */

const fs = require('fs');
const path = require('path');

const fileExists = require('file-exists');
const mkdirp = require('mkdirp');

/* -------------------------------------------------------------------------- */
/*
 * COMMAND USAGE
 */
const argv = require('yargs')
.usage('usage $0 <name> [options]')
.demand(1)
.alias('p', 'path')
.nargs('p', 1)
.describe('p', 'Create component at specified path')
.alias('t', 'type')
.nargs('t', 1)
.describe('t', 'Type of component to generate. default to \'pure\'')
.help('h')
.alias('h', 'help')
.argv;

/* -------------------------------------------------------------------------- */
/*
 * UTILS
 */
const concatPath = folder => filename => path.resolve(folder, filename);
/* -------------------------------------------------------------------------- */

const componentName = argv._[0];
const componentBasePath = argv.p || path.resolve(__dirname, '../src/components');
const componentFolder = path.resolve(componentBasePath, componentName);

const generateCompletePath = concatPath(componentFolder);

// Check if component already exists
if (fileExists(generateCompletePath('index.js'))) {
  console.error(`Component ${componentName} already exists`);
  process.exit(1);
}

mkdirp.sync(componentFolder);

const requireFiles = (type) => {
  const filesInfos = [];
  console.log(type)
  switch (type) {
    case 'class':
      filesInfos.push(require('./templates/class-based-component.js'));
      break;
    case 'pure':
    default:
      filesInfos.push(require('./templates/stateless-functional-component.js'));
  }
  filesInfos.push(require('./templates/index-template.js'));
  filesInfos.push(require('./templates/stories.js'));
  filesInfos.push(require('./templates/style-template.js'));

  return filesInfos;
};

requireFiles(argv.t).map((fileInfo) => {
  const fileName = fileInfo.fileName(componentName);
  const filePath = generateCompletePath(fileName);
  const fileContent = fileInfo.content(componentName);
  fs.writeFileSync(filePath, fileContent);
  console.log(`file ${fileName} created`);
  return fileInfo.fileName(componentName);
});

/* -------------------------------------------------------------------------- */
