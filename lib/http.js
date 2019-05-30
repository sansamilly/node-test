const http = require('http');
const url = require('url');
const fs = require('fs');
const zlib = require('zlib');
const querystring = require('querystring');
const {Form} = require('multiparty');
const router = require('./router');
const {HTTP_PORT, HTTP_ROOT, HTTP_UPLOAD} = require('../config');

http.createServer((req, res) => {
    let {pathname, query: queryParam} =  url.parse(req.url, true);
    if(req.method == 'POST'){
        // 普通POST
        if(req.headers['content-type'].startsWith('application/x-www-from-urlencoded')){
            let data = [];
            req.on('data', buffer => {
                data.push(buffer);
            })
            req.on('end', () => {
                let postData = querystring.parse(Buffer.concat(data).toString());
                handleData(req.method, pathname, queryParam, postData, {});
            })
        }else{
            // 带文件
            let form = new Form({
                uploadDir: HTTP_UPLOAD
            })

            form.parse(req);
            let {postData = {}, files = {}} = {};
            form.on('field', (name, value) => {
                postData[name] = value;
            })
            form.on('file', (name, file) => {
                files[name] = file;
            })
            form.on('error', err => {
                console.log(err);
            })
            form.on('close', () => {
                handleData(req.method, pathname, queryParam, postData, files);
            })
        }
    }else{
        handleData(req.method, pathname, queryParam, {}, {});
    }

    res.writeJSON = function(json){
        res.write(JSON.stringify(json));
    }

    async function handleData(method, url, queryParam, postData, files){
        let fn = router.getRouter(method, url);
        if(!fn){
            // 文件
            let filepath = HTTP_PORT+pathname;
            fs.stat(filepath, (err, stat) => {
                if(err){
                    res.writeHeader(404);
                    res.write('Not found');
                    res.end();
                }else{
                    let rs = fs.createReadStream(filepath);
                    let gz = zlib.createGzip();
                    res.setHeader('content-encoding', 'gzip');
                    rs.pipe(gz).pipe(res);
                }
            })
        }else{
            // 接口
            try{
                await fn(res, queryParam, postData, files);
            }catch(e){
                res.writeHeader(500);
                res.write('Internet Server Error');
                res.end();
            }
        }
    }
}).listen(HTTP_PORT);

