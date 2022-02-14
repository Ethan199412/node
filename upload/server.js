const http = require('http')
const fs = require('fs')
const iconv = require('iconv-lite')

const decodeContent = content => {
    let lines = content.split('\n');
    const findFlagNo = (arr, flag) => arr.findIndex(o => o.includes(flag));
    // 查找 ----- Content-Disposition Content-Type 位置并且删除
    const startNo = findFlagNo(lines, '------');
    lines.splice(startNo, 1);
    const ContentDispositionNo = findFlagNo(lines, 'Content-Disposition');
    lines.splice(ContentDispositionNo, 1);
    const ContentTypeNo = findFlagNo(lines, 'Content-Type');
    lines.splice(ContentTypeNo, 1);
    // 最后的 ----- 要在数组末往前找
    const endNo = lines.length - findFlagNo(lines.reverse(), '------') - 1;
    // 先反转回来
    lines.reverse().splice(endNo, 1);
    return Buffer.from(lines.join('\n'));
}

http.createServer((req, res) => {
    const { url, method } = req
    if (url === '/') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.end(err)
            } else {
                res.end(data.toString())
            }
        })
    }
    else if (url === '/upload' && method === 'POST') {
        console.log('url upload')


        // 定义一个缓存区
        const arr = []
        req.on('data', block => {
            // 将前端传来的数据进行存储进缓存区
            console.log('[p0] block',block.toString())
            arr.push(block);
        })

        req.on('end', () => {
            // 前端请求结束后进行数据解析 处理
            const buffer = Buffer.concat(arr);
            // 将数据变成string类型
            const content = buffer.toString();
            console.log('[p0] content', content)

            let fileName = content.match(/(?<=filename=").*(?=")/)[0]

            //fs.writeFileSync(fileName,)
            let fileStream = fs.createWriteStream(`./${fileName}`);
            // 从传来的数存进test的文件里
            fileStream.write(content.toString());
            // 返回前端请求完成
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('上传完成');
        })
    }
}).listen(3000, () => {
    console.log('server listening in 3000')
})