const express = require("express")
const naviapp = express.Router();

const myjson = {
  "ㅎㅎ": 11,
  "ㅋㅋ": true,
  "LOL": ":)"
}

// import myhtml from '../../www/test.html'

//중요 (라우터의 쿼리스트링을 일반문자가 아닌 데이터로 인식하게 하기 )
naviapp.use(express.json())
// req.query 변수 가져오기 위해서
naviapp.use(express.urlencoded({ extended: true })) // true로 해야 범용성이 높다고 한다.

naviapp.get('/', (req, res, next) => {
  const info = req.query.tablenm;  // pc
  const no = req.query.num;  // 1   
  if (info == "navi") {
    // next('route');// 다음라우터 실행

    // next 다음 send 나오면 통신종료!
    res.send(`${info}테이블 데이터 쿼리문 돌려서 보낸준 자료
          http://localhost:3333/data?tablenm=navi
          `)
  } else if (info == "swiper") {
    res.send(`${info}테이블 http://localhost:3333/data?tablenm=swiper`)
  } else if (info == "json") {
    // http://localhost:3333/data?tablenm=json
    res.send(myjson)
  } else if (info == "test") {
    // res.send(`${info}테이블 노드자료를 리액트에게 전달`)    
    // res.send(myhtml)
    res.send(null)
  }


  if (no == 1) {
    res.send(`
          http://localhost:3333/data?num=${no} 
          입니다.         
          `)
  }

  else {
    res.send("일반라우터")
  }


})

module.exports = naviapp;