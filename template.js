const fs = require('fs');

var loadHTML = (res, header, body, footer) => {
    fs.readFile('./client' + header, (err, data) => {
        if (err) {
            // res.writeHead(404);
            // res.write('File not found');
        } else {
            res.write(data);
            // HTML += data;
        }
        res.end();
    });

    fs.readFile('./client' + body, (err, data) => {
        if (err) {
            
        } else {
            res.write(data);
            // HTML += data;
        }
        res.end();
    });

    fs.readFile('./client' + footer, (err, data) => {
        if (err) {
            
        } else {
            res.write(data);
            // HTML += data;
        }
        res.end();
    });
   

}


module.exports = {
    loadHTML
}