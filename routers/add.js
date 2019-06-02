const db = require('../lib/database');

module.exports = async (res, queryParam, postData, files) => {
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
}