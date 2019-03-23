import { question } from 'readline-sync'
let currentdmg = 0
let opponentMob = {
  oname: 'Mr. Mime',
  ohp: 200,
  odef: 10,
  oatk: 10
}
const oppSkills = [
  {
    osname: 'Atk',
    osdamage: opponentMob.oatk,
    ostype: 'physical'
  },
  {
    osname: 'Stun',
    osdamage: 30,
    ostype: 'armorbreak'
  },
  {
    osname: 'Paralyze',
    osdamage: 40,
    ostype: 'electric'
  },
  {
    osname: 'Body Slam',
    osdamage: 50,
    ostype: 'physical'
  },
  {
    osname: 'Harden',
    osdamage: 10,
    ostype: 'physical'
  }
]

let isMyTurn = true
let myMob = {
  Name: 'Gangar',
  HP: 300,
  Def: 20,
  Atk: 40
}
const myMobSkills = [
  {
    sname: 'Atk',
    damage: myMob.Atk,
    type: 'physical'
  },
  {
    sname: 'Shadow ball',
    damage: 50,
    type: 'Dark'
  },
  {
    sname: 'Blackhole',
    damage: 60,
    type: 'Dark'
  },
  {
    sname: 'Tackle',
    damage: 40,
    type: 'armorbreak'
  },
  {
    sname: 'Tail Whip',
    damage: 5,
    type: 'armorbreak'
  }
]

function reducephysicaldamage(a, b) {
  return a - b
}

function ABdamage(a, b) {
  return (a * 1.5) - b
}

function displaySkills(array) {
  let i = 0
  while (i < 5) {
    console.log(i + '. ' + array[i].sname + ', Damage:' + array[i].damage)

    // i += 1
    i = i + 1
  }
}

console.log('You have encounter ' + opponentMob.oname + '.')
console.log('You send in ' + myMob.Name + '.')
console.log(myMob.Name + ' health : ' + myMob.HP)
console.log(opponentMob.oname + ' health : ' + opponentMob.ohp)
console.log("You can choose one of " + myMob.Name + "'s skills.")

while (myMob.HP > 0 && opponentMob.ohp > 0) {
  console.log('-------------------------------------------------------------')
  let attackername = isMyTurn ? myMob.Name : opponentMob.oname
  let defendername = isMyTurn ? opponentMob.oname : myMob.Name

  if (isMyTurn) {
    displaySkills(myMobSkills)
    let selectedSkills = question('Select a Skill: ')
    console.log(attackername + ' use ' + myMobSkills[selectedSkills].sname + '. ' + myMobSkills[selectedSkills].sname + ' hits for ' + myMobSkills[selectedSkills].damage + ' DMG.')
    if (myMobSkills[selectedSkills].type === 'physical') {
      currentdmg = reducephysicaldamage(myMobSkills[selectedSkills].damage, opponentMob.odef)
      if (currentdmg < 0) {
        currentdmg = 0
        console.log('Your physical damage dropped to ' + currentdmg + ' due to ' + opponentMob.oname + ' physical defense.')
        opponentMob.ohp = opponentMob.ohp - currentdmg
        console.log('Not Effective. ' + defendername + ' health not reduce. HP remained  ' + opponentMob.ohp + '.')
        console.log('-------------------------------------------------------------')
      } else {
        console.log('Your physical damage dropped to ' + currentdmg + ' due to ' + opponentMob.oname + ' physical defense.')
        opponentMob.ohp = opponentMob.ohp - currentdmg
        console.log('Critical Hit. ' + defendername + ' health reduced to ' + opponentMob.ohp + '.')
        console.log('-------------------------------------------------------------')
      }
    } else if (myMobSkills[selectedSkills].type === 'armorbreak') {
      currentdmg = ABdamage(myMobSkills[selectedSkills].damage, opponentMob.odef)
      if (currentdmg < 0) {
        currentdmg = 0
        console.log('Your armor break skill dealed ' + currentdmg + ' damage.')
        opponentMob.ohp = opponentMob.ohp - currentdmg
        console.log('Not Effective. ' + defendername + ' health not reduce. HP remained  ' + opponentMob.ohp + '.')
        console.log('-------------------------------------------------------------')
      } else {
        console.log('Your armor break skill dealed ' + currentdmg + ' damage.')
        opponentMob.ohp = opponentMob.ohp - currentdmg
        console.log('Critical Hit. ' + defendername + ' health reduced to ' + opponentMob.ohp + '.')
        console.log('-------------------------------------------------------------')
      }
    }
    else {
      opponentMob.ohp = opponentMob.ohp - myMobSkills[selectedSkills].damage
      console.log('Critical Hit. ' + defendername + ' health reduced to ' + opponentMob.ohp + '.')
      console.log('-------------------------------------------------------------')
    }

  } else {
    const Num = Math.floor(Math.random() * 5)
    console.log(attackername + ' use ' + oppSkills[Num].osname + '. ' + oppSkills[Num].osname + ' hits for ' + oppSkills[Num].osdamage + ' DMG.')
    if (oppSkills[Num].ostype === 'physical') {
      currentdmg = reducephysicaldamage(oppSkills[Num].osdamage, myMob.Def)
      if (currentdmg < 0) {
        currentdmg = 0
        console.log('Enemy damage dropped to ' + currentdmg + ' due to ' + myMob.Name + ' physical defense.')
        myMob.HP = myMob.HP - currentdmg
        console.log('Not Effective. ' + defendername + ' health not reduce. HP remained ' + myMob.HP + '.')
        console.log('-------------------------------------------------------------')
      }
      else {
        console.log('Enemy damage dropped to ' + currentdmg + ' due to ' + myMob.Name + ' physical defense.')
        myMob.HP = myMob.HP - currentdmg
        console.log('Critical Hit. ' + defendername + ' health reduced to ' + myMob.HP + '.')
        console.log('-------------------------------------------------------------')
      }
    } else if (oppSkills[Num].ostype === 'armorbreak') {
      currentdmg = ABdamage(oppSkills[Num].osdamage, myMob.Def)
      if (currentdmg < 0) {
        currentdmg = 0
        console.log('Enemy armor break skill dealed ' + currentdmg + ' damage.')
        myMob.HP = myMob.HP - currentdmg
        console.log('Not Effective. ' + defendername + ' health not reduce. HP remained ' + myMob.HP + '.')
        console.log('-------------------------------------------------------------')
      } else {
        console.log('Enemy armor break skill dealed ' + currentdmg + ' damage.')
        myMob.HP = myMob.HP - currentdmg
        console.log('Critical Hit. ' + defendername + ' health reduced to ' + myMob.HP + '.')
        console.log('-------------------------------------------------------------')
      }
    }
    else {
      myMob.HP = myMob.HP - oppSkills[Num].osdamage
      console.log('Critical Hit. ' + defendername + ' health reduced to ' + myMob.HP + '.')
      console.log('-------------------------------------------------------------')
    }
  }
  isMyTurn = !isMyTurn
}

if (opponentMob.ohp <= 0) {
  console.log(opponentMob.oname + ' has fainted.')
  console.log('You have gained 50 exp points.')
  console.log('Game over!')
}

else {
  console.log(myMob.Name + ' has fainted.')
  console.log('Better luck next time...')
}