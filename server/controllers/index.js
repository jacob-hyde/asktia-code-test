const router = require('express').Router()
const fs = require('fs')
const path = require('path')

module.exports = router;

router.get('/', function (req, res) {
	res.setHeader('Content-Type', 'text/html');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end();
});

router.get('/ledger/:name', function (req, res) {
    var ledgerName = req.params.name;
    var normalizedPath = require("path").join(__dirname, "/../data/" + ledgerName + ".json");
    fs.exists(normalizedPath, function(exists) {
        if(!exists)
        {
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end();
            return;
        }
        fs.readFile(normalizedPath, 'utf8', (err, data) => {
            if (err) throw err;
            let ledger = JSON.parse(data);
            
            //they come in the correct sequence, even if duplicate
            ledger.forEach((transaction,i) => {
                for(let j = ++i; j < ledger.length; j++)
                {
                    if(transaction.activity_id == ledger[j].activity_id) ledger.splice(j, 1);
                }
            });
            //sort by date
            ledger.sort((a,b) => new Date(b.date) - new Date(a.date));

            res.json(ledger);
        });
    });
});

router.get('*', function(req, res) {
  res.redirect('/');
});
