const db = require('./lib/database');
const http = require('./lib/http');
const {addRouter} = require('./lib/router');
addRouter('get', '/list', async (res, queryParam, postData, files) => {
    try{
        let data = await db.query(`SELECT * FROM item_table`);
        res.writeJSON({
            errno: 0,
            data
        });
    }catch(e){
        res.writeJSON({
            errno: 1,
            msg: 'query error'
        })
    }
    res.end();
})
addRouter('get', '/add', async (res, queryParam, postData, files) => {
    let {title, price, count} = queryParam;
    if(!title || !price || !count){
        res.writeJSON({
            errno: 1,
            msg: 'params eror'
        })
        res.end();
    }else{
        price = Number(price);
        count = Number(count);
        if(isNaN(price) || isNaN(count)){
            res.writeJSON({
                errno: 1,
                msg: 'params eror'
            })
            res.end();
        }else{
            try{
                let data = await db.query(`INSERT INTO item_table (title, price, count) VALUES(?,?,?)`, [title, price, count]);
                res.writeJSON({
                    errno: 0,
                    msg: 'add success'
                });
            }catch(e){
                res.writeJSON({
                    errno: 1,
                    msg: 'add eror'
                })
            }
            res.end();
        }
    }
})
addRouter('post', '/del', async (res, queryParam, postData, files) => {
    res.write('zzzz');
    res.end();
})
