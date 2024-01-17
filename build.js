const fs = require('fs')
const got = require('got');

function numberToColor(number) {
  if (number >= 1 && number <= 9) {
      return '#F8B909';
  } else if (number >= 10 && number <= 19) {
      return '#A5BCEF';
  } else if (number >= 20 && number <= 29) {
      return '#FD595F';
  } else if (number >= 30 && number <= 39) {
      return '#9A9A9A';
  } else if (number >= 40 && number <= 45) {
      return '#A2D432';
  }
  return '#F8B909';
}

function getLastNumber(){
 
  const startDate = new Date('2002-12-07'); 
  const currentDate = new Date();

  //날짜 차이가 로또 회차
  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(Math.abs((startDate - currentDate) / oneDay));
  const lastNumber = (Math.floor(diffDays / 7) +1);

  console.log("last lotto round : ", lastNumber);

  return lastNumber;
}


const last = getLastNumber();
const path = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${last}`;

got.get(path).then(async ok => {
  const response = JSON.parse(ok.body);

  const number1 = response['drwtNo1'];
  const number2 = response['drwtNo2'];
  const number3 = response['drwtNo3'];
  const number4 = response['drwtNo4'];
  const number5 = response['drwtNo5'];
  const number6 = response['drwtNo6'];
  const number7 = response['bnusNo'];

  const color1 = numberToColor(number1);
  const color2 = numberToColor(number2);
  const color3 = numberToColor(number3);
  const color4 = numberToColor(number4);
  const color5 = numberToColor(number5);
  const color6 = numberToColor(number6);
  const color7 = numberToColor(number7);


  fs.readFile('template.svg', 'utf-8', (error, data) => {
    if (error) {
      console.error(error)
      return
    }

    data = data.replace('{color1}', color1)
    data = data.replace('{number1}', number1)

    data = data.replace('{color2}', color2)
    data = data.replace('{number2}', number2)

    data = data.replace('{color3}', color3)
    data = data.replace('{number3}', number3)

    data = data.replace('{color4}', color4)
    data = data.replace('{number4}', number4)

    data = data.replace('{color5}', color5)
    data = data.replace('{number5}', number5)

    data = data.replace('{color6}', color6)
    data = data.replace('{number6}', number6)

    data = data.replace('{color7}', color7)
    data = data.replace('{number7}', number7)

    data = fs.writeFile('luck.svg', data, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })
  })
})



