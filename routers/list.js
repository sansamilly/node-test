const db = require('../lib/database');

module.exports = async (res, queryParam, postData, files) => {
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
}
