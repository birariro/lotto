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
  }
  return '#A2D432';
}

const path = `https://www.dhlottery.co.kr/lt645/selectPstLt645Info.do`;

got.get(path).then(async ok => {
  const response = JSON.parse(ok.body);
  const lottoData = response['data']['list'][0];

  const number1 = lottoData['tm1WnNo'];
  const number2 = lottoData['tm2WnNo'];
  const number3 = lottoData['tm3WnNo'];
  const number4 = lottoData['tm4WnNo'];
  const number5 = lottoData['tm5WnNo'];
  const number6 = lottoData['tm6WnNo'];
  const number7 = lottoData['bnsWnNo'];

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

    fs.writeFile('luck.svg', data, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })
  })
})
