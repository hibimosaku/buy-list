const {LINE_TOKEN}=require('./lineApi')

const functions = require("firebase-functions");

const axios =require('axios')
const cors = require('cors')({ Origin: true });

exports.line_buy_request = functions.region('asia-northeast1').https.onRequest(async (req:any, res:any) => {
  const BASE_URL = 'https://notify-api.line.me';
  const PATH = '/api/notify';

  res.set('Access-Control-Allow-Origin', '*');

  await axios({
    baseURL: BASE_URL,
    url: PATH,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${LINE_TOKEN}`,
    },
    params:{
      message: '買物お願いします',
    },
  })

  res.end;
});

exports.line_buy_result = functions.region('asia-northeast1').https.onRequest(async (req:any, res:any) => {
  const BASE_URL = 'https://notify-api.line.me';
  const PATH = '/api/notify';
  res.set('Access-Control-Allow-Origin', '*');

  await axios({
    baseURL: BASE_URL,
    url: PATH,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${LINE_TOKEN}`,
    },
    params:{
      message: '買物完了しました',
    },
  })

  res.end;
});