import express from 'express';
const app = express();

const port = process.env.PORT || 3000;

// app.get('/',(req,res)=>{
//     res.send('Hello World! From Express.js');
// })

app.use(express.static('dist')) // Bad for production

//get 5 jokes from object conatin id,title,context
const jokes = [
    { id: 1, title: 'Joke 1', context: 'This is the first joke.' },
    { id: 2, title: 'Joke 2', context: 'This is the second joke.' },
    { id: 3, title: 'Joke 3', context: 'This is the third joke.' },
    { id: 4, title: 'Joke 4', context: 'This is the fourth joke.' },
    { id: 5, title: 'Joke 5', context: 'This is the fifth joke.' }
];

app.get('/api/jokes', (req, res) => {
    res.json(jokes);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})