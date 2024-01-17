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

let fs = require('fs')
const got = require('got');


fs.readFile('template.svg', 'utf-8', (error, data) => {
  if (error) {
    console.error(error)
    return
  }
  const number1 = 1;
  const number2 = 11;
  const number3 = 19;
  const number4 = 24;
  const number5 = 34;
  const number6 = 41;
  const number7 = 43;

  const color1 = numberToColor(number1);
  const color2 = numberToColor(number2);
  const color3 = numberToColor(number3);
  const color4 = numberToColor(number4);
  const color5 = numberToColor(number5);
  const color6 = numberToColor(number6);
  const color7 = numberToColor(number7);

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