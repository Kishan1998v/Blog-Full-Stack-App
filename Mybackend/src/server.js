import express from 'express';
const app = express();
const articleInfo = [
    {
        name: 'learn-react',
        upvotes: 0,
        comments:[],
    },
    {
        name: 'learn-node',
        upvotes: 0,
        comments:[],
    },
    {
        name: 'mongodb',
        upvotes: 0,
        comments:[],
    }
]

app.use(express.json())

app.put('/api/articles/:name/upvote', (req, res) => {
    const { name } = req.params;
    const article = articleInfo.find(a => { a.name === name });
    if (article) {
        article.upvotes += 1;
        console.log(`${article.name} have now ${article.upvotes}s`);
    }
    else {
        console.log("no such user");
    }
});

app.post('/api/articles/:name/comments', (req, res) => {
    const { name } = req.params;
    const { postedBy, comment } = req.body;
    const article = articleInfo.find(a => a.name === name);
    if (article) {
        article.comments.push({ postedBy, comment });
        res.send(article.comments);
    }
    else {
        res.send("That article doen't exits");
    }
})

app.listen(8000, () => {
    console.log("servser is started at 8000");
})