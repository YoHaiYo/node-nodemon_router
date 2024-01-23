const express = require('express')
const path = require('path')
const port = process.env.PORT || 3333;
const navidata = require("./routers/navi");

const app = express();

// 전역변수 선언
// set안에 선언시 전역변수로 바뀜 ! (다른 파일에서도 쓸 수 있어요.)
app.set(port, process.env.PORT || 3333);
// 전역변수 가져올때
app.get(app.set(port));

app.get("/datasend", (req, res, next) => { // post 대신 use쓰면 get, post 아무거나 된다.
  // ... 작업실행
  // req.body -> 절대안됨. (데이터가 body를 타고 오기 때문에 건들지 마쇼. 여기서 body는 html이 아니라 post의 head, body)
  req.mydata = "ssh";

  next();
}, (req, res, next) => {
  console.log(req.body, req.mydata)
  // req.body, req.mydata
  res.send("이제 끝");
  // res.send 이후 실행식은 실행안된다.

});

app.use(express.static(path.join(__dirname, '../www')))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../www/index.html'))
})

app.use("/data", navidata);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../www/nopage.html'))
})

app.listen(port, () => {
  console.log(`localhost:${port} 서버정상구동`)
})
