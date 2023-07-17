import express from 'express';
import path from 'path';
import nunjucks from 'nunjucks';
import fs from 'fs';
import mongoose from 'mongoose'

const __dirname = path.resolve();

const app = express();

// file path
// my_app/data/writing.json
const filePath = path.join(__dirname, 'data', 'writing.json');

// // body parser set
// app.use(bodyParser.urlencoded({ extended: false})); // express 기본 모듈 사용
// app.use(bodyParser.json());

// view engine set
app.set('view engine', 'html'); // main.html -> main(.html)

// nunjucks
nunjucks.configure('views', {
    autoescape: true,
    watch: true, // html 파일이 수정될 경우, 다시 반영 후 렌더링
    express: app
})

// mongoose connect
mongoose
    .connect('mongodb://127.0.0.1:27017')
    .then(() => console.log('DB 연결 성공'))
    .catch(e => console.error(e));

// mongoose set
const { Schema } = mongoose;

const WritingSchema = new Schema({
    title: String,
    contents: String,
    date: {
        type: Date,
        default: Date.now,
    }
})

const Writing = mongoose.model('Writing', WritingSchema);

// middleware
// main page GET
app.get('/', async (req, res) => {
    // const fileData = fs.readFileSync(filePath);
    // const writings = JSON.parse(fileData);

    let  writings = await Writing.find({})

    console.log(writings);
    // res.sendFile(__dirname + '/public/main.html');
    res.render('main', { list: writings });
});

app.get('/write', (req, res) => {
    res.render('write');
});

app.post('/write', async (req, res) => {
    // request 안에 있는 내용을 처리
    // request.body
    const title = req.body.title;
    const contents = req.body.contents;

    // mongodb에 저장
    const writing = new Writing({
        title: title,
        contents: contents
    })
    const result = await writing.save().then(() => {
        console.log('Success')
        res.render('detail', {title: title, contents: contents });
    }).catch((err) => {
        console.error(err)
        res.render('write')
    })

    res.render('detail', {title: title, contents: contents, date:date });
});

app.get('/detail/:id', async(req, res) => {
    const id = req.params.id;


    const detail = await Writing.findOne({ _id: id}).then((result) => {
        res.render('detail', { 'detail': detail })
    }).catch((err) => {
        console.error(err)
    })
    // res.render('detail');
})

app.get('/edit', (req, res) => {
    res.render('detail');
})

app.post('/delete/:id', async (req, res) => {
    const id = req.params.id;

    const delete_content = await Writing.deleteOne({ _id: id}).then(() => {
        console.log('delete success')
        res.redirect('/')
    }).catch((err) => {
        console.error(err)
    })
})

app.listen(3000, () => {
    console.log('Server is running');
});
