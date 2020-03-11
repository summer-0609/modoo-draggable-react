const path = require('path');
const router = require('koa-router')();
const archiver = require('archiver');
const send = require('koa-send');

const { spawnSync } = require('child_process');

const fs = require('fs');

async function zipDirectory(source, out) {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(out);

  archive.directory(source, false).pipe(stream);

  await archive.finalize();
}

// 下载生成的页面
router.post('/download', async ctx => {
  spawnSync('npm', ['run', 'test', ctx.request.body]);

  // const _path = path.resolve(__dirname, '../', 'build/dist');
  // await zipDirectory(_path, 'dist.zip');

  // await send(ctx, 'dist.zip');
  ctx.body = 'xx';
});

module.exports = router;