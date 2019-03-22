import { question } from 'readline-sync'

function displayOptions(array) {
  let i = 0
  while (i < 3) {
    console.log(i + '. ' + array[i].label + ', Price:' + array[i].price)

    // i += 1
    i = i + 1
  }
}

function getPrice(option) {
  return parseInt(option.split('RM ')[1])
}

console.log('Choose your Resolution')
const resOptions = [
  {
    label: '1920 x 1080',
    price: 300,
  },
  {
    label: '2560 x 1440',
    price: 600,
  },
  {
    label: '3280 x 1680',
    price: 900,
  },
]
displayOptions(resOptions)
let ansRes = question('Select resOptions index\n')

console.log('Choose your Video Card')
const videoCardOptions = [
  {
    label: 'nVdia',
    price: 600,
  },
  {
    label: 'AMDRadeon',
    price: 550,
  },
  {
    label: 'Intel',
    price: 500,
  },
]
displayOptions(videoCardOptions)
let ansVC = question('Select Video Card index\n')

console.log('Choose your Processor')
const processorOptions = [
  {
    label: 'i3',
    price: 100,
  },
  {
    label: 'i5',
    price: 300,
  },
  {
    label: 'i7',
    price: 500,
  },
]
displayOptions(processorOptions)
let ansProcessor = question('Select Processor index\n')

console.log('Choose your Hard Disk')
const hddOptions = [
  {
    label: '128GB',
    price: 100,
  },
  {
    label: '256GB',
    price: 200,
  },
  {
    label: '1TB',
    price: 300,
  },
]
displayOptions(hddOptions)
let ansHDD = question('Select HDD index\n')

console.log('You Have Chosen the following options: ')
const prices = [
  resOptions[ansRes].price,
  videoCardOptions[ansVC].price,
  processorOptions[ansProcessor].price,
  hddOptions[ansHDD].price,
]

let totalPrice = 0

for (let i in prices) {
  totalPrice = totalPrice + prices[parseInt(i)]
}

console.log(totalPrice)
console.log(resOptions[ansRes].label)
console.log(videoCardOptions[ansVC].label)
console.log(processorOptions[ansProcessor].label)
console.log(hddOptions[ansHDD].label)
