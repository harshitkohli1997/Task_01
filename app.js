const express = require('express');

const app = express();

app.get('/', (req,res) => {
    console.log('yeah...');
    res.send('done');
});


const port = 3000 ;


app.listen(port,()=> {
    console.log(`server started on port ${port}`);
})