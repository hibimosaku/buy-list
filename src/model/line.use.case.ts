import axios from "axios";

function lineRequest() {
  axios
    .post(
      "https://asia-northeast1-buy-list-cf.cloudfunctions.net/line_buy_request"
    )
    .then(() => {
      alert("送信しました");
    })
    .catch((err) => {
      throw new Error(`lineRequest is failure,${err}`);
    });
}

function lineResult() {
  axios
    .post(
      "https://asia-northeast1-buy-list-cf.cloudfunctions.net/line_buy_result"
    )
    .then(() => {
      alert("送信しました");
    })
    .catch((err) => {
      throw new Error(`lineRequest is failure,${err}`);
    });
}

export const Line = {
  lineRequest,
  lineResult,
};
