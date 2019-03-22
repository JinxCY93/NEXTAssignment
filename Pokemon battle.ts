import { question } from 'readline-sync'

const opponentMob = 'Mr. Mime'
let opponentHP = 200
const oppSkills = ['Stun', 'Paralyze', 'Body Slam']
const oppSkillsDmg = [30, 40, 50]
let isMyTurn = true

let myMob = {
  Name: 'Gangar',
  HP: 300
}

const myMobSkills = [
  {
    name: 'Shadow ball',
    damage: 50
  },
  {
    name: 'Thunderstrike',
    damage: 60
  },
  {
    name: 'Physical Damage',
    damage: 60
  }
]

function displaySkills(array) {
  let i = 0
  while (i < 3) {
    console.log(i + '. ' + array[i].name + ', Damage:' + array[i].damage)

    // i += 1
    i = i + 1
  }
}

console.log('You have encounter ' + opponentMob + '.')
console.log('You send in ' + myMob[0] + '.')
console.log(myMob[0] + ' : ' + myMob[1])
console.log(opponentMob + ' : ' + opponentHP)
console.log("You can choose one of " + myMob + "'s skills.")

let myMobHP = myMob[1]
while (myMob.HP > 0 && opponentHP > 0) {
  console.log('-------------------------------------------------------------')
  let attackername = isMyTurn ? myMob.Name : opponentMob
  let defendername = isMyTurn ? opponentMob : myMob.Name
  displaySkills(myMobSkills)
  let selectedSkills = question('Select a Skill: ')

  console.log(attackername + ' use ' + skills[Num] + '. ' + skills[Num] + ' hits for ' + dmg[Num] + ' DMG.')
  let currentdmg = dmg[Num]

  isMyTurn = !isMyTurn
}