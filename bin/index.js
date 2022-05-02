#! /usr/bin/env node

import M3U8FileParser from 'm3u8-file-parser';
import fs from 'fs';
import { program } from "commander";

program.name('string-util')
  .description('CLI to copy m3u files to a target folder')
  .version('1.0.0');

program
  .option('-p, --playlist <path>', 'path to playlist file')

program.parse();

const options = program.opts();

console.log(options);
copyfiles(options.playlist, options.target);



function copyfiles(playlist, target) {
  // './playlist/playlist.m3u8'
  const content = fs.readFileSync(`./${playlist}`,
    {
      encoding: 'utf-8'
    }
  );

  const reader = new M3U8FileParser();
  reader.read(content);
  const data = reader.getResult();
  reader.reset();

  const dir = './target';
  
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  
  const finalTarget = target || './target';

  data.segments.forEach( (segment, index) => {
    const finalFile = segment.url.split('/')[segment.url.split('/').length - 1];
    const targetFile = finalTarget + '/' + finalFile;
    
    fs.copyFile(segment.url, `${targetFile}`, (err) => {
      if (err) throw err;
      console.log(`-> ${finalFile} ...`);
    });
  });
}
