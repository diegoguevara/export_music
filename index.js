import M3U8FileParser from 'm3u8-file-parser';
import fs from 'fs';

const content = fs.readFileSync('./playlist/playlist.m3u8',
  { 
    encoding: 'utf-8'
  }
);

const reader = new M3U8FileParser();
reader.read(content);
const data = reader.getResult(); // Get the parse result
reader.reset(); // Optional, If you want to parse a new file, call reset()

data.segments.forEach(function(segment) {
  // console.log(segment.url);
  const targetFile = segment.url.split('/')[segment.url.split('/').length - 1];
  // console.log(segment.url.split('/')[segment.url.split('/').length - 1]);

  fs.copyFile(segment.url, `./target/${targetFile}`, (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
  });
});
