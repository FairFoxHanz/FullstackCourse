const express = require('express');
const app = express();

//https://still-crag-86568.herokuapp.com/ 

app.get('/', (req, res) => {
    res.send({
        "HI": "THERE"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);