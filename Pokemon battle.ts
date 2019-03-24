import { question } from 'readline-sync'
let currentdmg = 0
let testing = 0
let opponentMob = {
  oname: 'Mr. Mime',
  ohp: 200,
  odef: 10,
  oatk: 10,
  oelement: 'fire'
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
    ostype: 'sleep'
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
  Atk: 40,
  element: 'dark'
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
    type: 'poison',
    dmgperround: 1,
    turn: 5
  },
  {
    sname: 'Blackhole',
    damage: 60,
    type: 'dark'
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
  },
  {
    sname: 'Water Blast',
    damage: 30,
    type: 'water'
  }
]

function reducephysicaldamage(a, b) {
  return a - b
}

function armorbreakdamage(a, b) {
  return (a * 1.5) - b
}

function poisondamage(a, b) {
  return a - b
}

function currenthp(a, b) {
  return a - b
}
function displaycurrentdamage(c) {
  if (c < 0) {
    return c = 0
  } else {
    return c
  }
}

function resultMessage(defname, defhp) {
  console.log('Critical Hit. ' + defname + ' health reduced to ' + defhp + '.')
  console.log('-------------------------------------------------------------')
}

function veryeffectiveMessage(dmg, defname, defhp) {
  if (dmg = 0) {
    console.log('Not Effective. ' + defname + ' health not reduce. HP remained  ' + defhp + '.')
    console.log('-------------------------------------------------------------')
  } else {
    console.log('Critical Hit. ' + defname + ' health reduced to ' + defhp + '.')
    console.log('-------------------------------------------------------------')
  }
}

function element(myelement, mobelement, dmg) {
  if (myelement === 'water' && mobelement === 'fire' || myelement === 'fire' && mobelement === 'grass' || myelement === 'grass' && mobelement === 'water') {
    return dmg = dmg * 2
  } else {
    return dmg = dmg * 0.5
  }
}

function displaySkills(array) {
  let i = 0
  while (i < 6) {
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
      currentdmg = displaycurrentdamage(currentdmg)
      opponentMob.ohp = currenthp(opponentMob.ohp, currentdmg)
      console.log('Your physical damage dropped to ' + currentdmg + ' due to ' + opponentMob.oname + ' physical defense.')
      if (currentdmg = 0) {
        console.log('Not Effective. ' + defendername + ' health not reduce. HP remained  ' + opponentMob.ohp + '.')
        console.log('-------------------------------------------------------------')
      } else {
        console.log('Critical Hit. ' + defendername + ' health reduced to ' + opponentMob.ohp + '.')
        console.log('-------------------------------------------------------------')
      }
    } else if (myMobSkills[selectedSkills].type === 'armorbreak') {
      currentdmg = armorbreakdamage(myMobSkills[selectedSkills].damage, opponentMob.odef)
      currentdmg = displaycurrentdamage(currentdmg)
      opponentMob.ohp = currenthp(opponentMob.ohp, currentdmg)
      console.log('Your armor break skill only dealed ' + currentdmg + ' damage.')
      if (currentdmg = 0) {
        console.log('Not Effective. ' + defendername + ' health not reduce. HP remained  ' + opponentMob.ohp + '.')
        console.log('-------------------------------------------------------------')
      } else {
        console.log('Critical Hit. ' + defendername + ' health reduced to ' + opponentMob.ohp + '.')
        console.log('-------------------------------------------------------------')
      }

    } else if (myMobSkills[selectedSkills].type != null) {
      let a = currentdmg
      currentdmg = element(myMobSkills[selectedSkills].type, opponentMob.oelement, myMobSkills[selectedSkills].damage)
      opponentMob.ohp = opponentMob.ohp - currentdmg
      if (currentdmg > a) {
        console.log('Your skills is very effective. Damage increased to ' + currentdmg)
        resultMessage(defendername, opponentMob.ohp)
      } else {
        console.log('Your skills is less effective. Damage decreased to ' + currentdmg)
      }
    }
    // else if (myMobSkills[selectedSkills].type === 'poison') {
    //   opponentMob.ohp = opponentMob.ohp - myMobSkills[selectedSkills].damage
    //   console.log('Poisoned damage per round: ' + myMobSkills[selectedSkills].dmgperround)
    //   for (let i = 5; i! < 0; i--) {
    //     opponentMob.ohp = poisondamage(opponentMob.ohp, myMobSkills[selectedSkills].dmgperround)
    //   }
    //   console.log('Critical Hit. ' + defendername + ' health reduced to ' + opponentMob.ohp + '.')
    //   console.log('-------------------------------------------------------------')
    //   testing = myMobSkills[selectedSkills].type
    // }
    else {
      opponentMob.ohp = currenthp(opponentMob.ohp, myMobSkills[selectedSkills].damage)
      console.log('Critical Hit. ' + defendername + ' health reduced to ' + opponentMob.ohp + '.')
      console.log('-------------------------------------------------------------')
    }


  } else {
    const Num = Math.floor(Math.random() * 5)
    console.log(attackername + ' use ' + oppSkills[Num].osname + '. ' + oppSkills[Num].osname + ' hits for ' + oppSkills[Num].osdamage + ' DMG.')
    if (oppSkills[Num].ostype === 'physical') {
      currentdmg = reducephysicaldamage(oppSkills[Num].osdamage, myMob.Def)
      currentdmg = displaycurrentdamage(currentdmg)
      myMob.HP = currenthp(myMob.HP, currentdmg)
      console.log('Enemy damage dropped to ' + currentdmg + ' due to ' + myMob.Name + ' physical defense.')
      if (currentdmg = 0) {
        console.log('Not Effective. ' + defendername + ' health not reduce. HP remained ' + myMob.HP + '.')
        console.log('-------------------------------------------------------------')
      }
      else {
        console.log('Critical Hit. ' + defendername + ' health reduced to ' + myMob.HP + '.')
        console.log('-------------------------------------------------------------')
      }
    } else if (oppSkills[Num].ostype === 'armorbreak') {
      currentdmg = armorbreakdamage(oppSkills[Num].osdamage, myMob.Def)
      currentdmg = displaycurrentdamage(currentdmg)
      myMob.HP = currenthp(myMob.HP, currentdmg)
      console.log('Enemy armor break skill dealed ' + currentdmg + ' damage.')
      if (currentdmg = 0) {
        console.log('Not Effective. ' + defendername + ' health not reduce. HP remained ' + myMob.HP + '.')
        console.log('-------------------------------------------------------------')
      } else {
        console.log('Critical Hit. ' + defendername + ' health reduced to ' + myMob.HP + '.')
        console.log('-------------------------------------------------------------')
      }
    }
    else {
      myMob.HP = currenthp(myMob.HP, oppSkills[Num].osdamage)
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