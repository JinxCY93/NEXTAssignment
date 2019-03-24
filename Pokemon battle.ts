import { question } from 'readline-sync'
let myskillwithstatdamage = 0
let myskillwithstatturn = 0
let oppskillwithstatdamage = 0
let oppskillwithstatturn = 0
myskillwithstatturn! < 0
oppskillwithstatturn! < 0

let currentdmg = 0
let opponentMob = {
  oname: 'Mr. Mime',
  ohp: 250,
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
    osdamage: 20,
    ostype: 'poison',
    turn: 5
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
  HP: 350,
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
    damage: 20,
    type: 'poison',
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

function skillstatus(name, turn, skilldmg, hp) {
  let ahp = hp
  if (turn != 0) {
    let dps = skilldmg * 0.1
    let ahp = currenthp(hp, dps)
    console.log('Poison status turn: ' + turn)
    console.log('Poison damage: ' + dps)
    console.log(name + ' current HP: ' + ahp)
    return (ahp)
  } else {
    return (hp)
  }
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
  console.log(defname + ' health reduced to ' + defhp + '.')
  console.log('-------------------------------------------------------------')
}

function effectivenessMessage(dmg, skilldmg, defname, defhp) {
  if (dmg = 0 || dmg <= skilldmg) {
    console.log('Less / Not Effective. ' + defname + ' HP left ' + defhp + '.')
    console.log('-------------------------------------------------------------')
  }
  else {
    console.log('Critical Hit. ' + defname + ' health reduced to ' + defhp + '.')
    console.log('-------------------------------------------------------------')
  }
}

function element(myelement, mobelement, dmg) {
  if (myelement === 'water' && mobelement === 'fire' || myelement === 'fire' && mobelement === 'grass' || myelement === 'grass' && mobelement === 'water') {
    return dmg = dmg * 2
  } else if (myelement === 'fire' && mobelement === 'water' || myelement === 'grass' && mobelement === 'fire' || myelement === 'water' && mobelement === 'grass') {
    return dmg = dmg * 0.5
  }
  else {
    return dmg = dmg
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
      effectivenessMessage(currentdmg, myMobSkills[selectedSkills].damage, defendername, opponentMob.ohp)
      // if (currentdmg = 0) {
      //   console.log('Not Effective. ' + defendername + ' health not reduce. HP remained  ' + opponentMob.ohp + '.')
      //   console.log('-------------------------------------------------------------')
      // } else {
      //   console.log('Critical Hit. ' + defendername + ' health reduced to ' + opponentMob.ohp + '.')
      //   console.log('-------------------------------------------------------------')
      // }
    } else if (myMobSkills[selectedSkills].type === 'armorbreak') {
      currentdmg = armorbreakdamage(myMobSkills[selectedSkills].damage, opponentMob.odef)
      currentdmg = displaycurrentdamage(currentdmg)
      opponentMob.ohp = currenthp(opponentMob.ohp, currentdmg)
      console.log('Your armor break skill only dealed ' + currentdmg + ' damage.')
      effectivenessMessage(currentdmg, myMobSkills[selectedSkills].damage, defendername, opponentMob.ohp)

    } else if (myMobSkills[selectedSkills].type === 'poison') {
      currentdmg = armorbreakdamage(myMobSkills[selectedSkills].damage, opponentMob.odef)
      currentdmg = displaycurrentdamage(currentdmg)
      opponentMob.ohp = currenthp(opponentMob.ohp, currentdmg)
      console.log('Enemy current HP ' + opponentMob.ohp + '.')
      myskillwithstatturn = myMobSkills[selectedSkills].turn
      myskillwithstatdamage = myMobSkills[selectedSkills].damage
      // let i: number
      // for (i = myMobSkills[selectedSkills].turn; i >= 1; i--) {
      //   let a: number
      //   console.log(opponentMob.ohp)
      //   console.log(currentdmg * 0.1)
      //   opponentMob.ohp = opponentMob.ohp - (currentdmg * 0.1)
    }
    else if (myMobSkills[selectedSkills].type === 'grass' || myMobSkills[selectedSkills].type === 'fire' || myMobSkills[selectedSkills].type === 'water') {
      myskillwithstatturn = 0
      let a = myMobSkills[selectedSkills].damage
      currentdmg = element(myMobSkills[selectedSkills].type, opponentMob.oelement, myMobSkills[selectedSkills].damage)
      opponentMob.ohp = opponentMob.ohp - currentdmg
      if (currentdmg > a) {
        console.log('Your skills is very effective. Damage increased to ' + currentdmg + ' DMG.')
        effectivenessMessage(currentdmg, myMobSkills[selectedSkills].damage, defendername, opponentMob.ohp)
      } else {
        console.log('Your skills is less effective. Damage decreased to ' + currentdmg + ' DMG.')
        effectivenessMessage(currentdmg, myMobSkills[selectedSkills].damage, defendername, opponentMob.ohp)
      }
    }
    else {
      opponentMob.ohp = currenthp(opponentMob.ohp, myMobSkills[selectedSkills].damage)
      resultMessage(defendername, opponentMob.ohp)
    }
    if (oppskillwithstatturn != 0) {
      oppskillwithstatturn! < 0
      myMob.HP = skillstatus(myMob.Name, oppskillwithstatturn, oppskillwithstatdamage, myMob.HP)
      oppskillwithstatturn = oppskillwithstatturn - 1
    } else {
      oppskillwithstatturn = 0
    }
  }

  else {
    const Num = Math.floor(Math.random() * 5)
    console.log(attackername + ' use ' + oppSkills[Num].osname + '. ' + oppSkills[Num].osname + ' hits for ' + oppSkills[Num].osdamage + ' DMG.')
    if (oppSkills[Num].ostype === 'physical') {
      currentdmg = reducephysicaldamage(oppSkills[Num].osdamage, myMob.Def)
      currentdmg = displaycurrentdamage(currentdmg)
      myMob.HP = currenthp(myMob.HP, currentdmg)
      console.log('Enemy damage dropped to ' + currentdmg + ' due to ' + myMob.Name + ' physical defense.')
      effectivenessMessage(currentdmg, oppSkills[Num].osdamage, defendername, myMob.HP)
      // if (currentdmg = 0) {
      //   console.log('Not Effective. ' + defendername + ' health not reduce. HP remained ' + myMob.HP + '.')
      //   console.log('-------------------------------------------------------------')
      // }
      // else {
      //   console.log('Critical Hit. ' + defendername + ' health reduced to ' + myMob.HP + '.')
      //   console.log('-------------------------------------------------------------')
      // }
    } else if (oppSkills[Num].ostype === 'armorbreak') {
      currentdmg = armorbreakdamage(oppSkills[Num].osdamage, myMob.Def)
      currentdmg = displaycurrentdamage(currentdmg)
      myMob.HP = currenthp(myMob.HP, currentdmg)
      console.log('Enemy armor break skill dealed ' + currentdmg + ' damage.')
      effectivenessMessage(currentdmg, oppSkills[Num].osdamage, defendername, myMob.HP)
    } else if (oppSkills[Num].ostype === 'poison') {
      currentdmg = armorbreakdamage(oppSkills[Num].osdamage, opponentMob.odef)
      currentdmg = displaycurrentdamage(currentdmg)
      myMob.HP = currenthp(myMob.HP, currentdmg)
      console.log('Your current HP ' + myMob.HP + '.')
      oppskillwithstatturn = oppSkills[Num].turn
      oppskillwithstatdamage = oppSkills[Num].osdamage
    }
    else if (oppSkills[Num].ostype === 'grass' || oppSkills[Num].ostype === 'fire' || oppSkills[Num].ostype === 'water') {
      oppskillwithstatturn = 0
      let a = currentdmg
      currentdmg = element(oppSkills[Num].ostype, opponentMob.oelement, oppSkills[Num].osdamage)
      myMob.HP = myMob.HP - currentdmg
      if (currentdmg > a) {
        console.log(opponentMob.oname + ' skills is very effective. Damage increased to ' + currentdmg)
        effectivenessMessage(currentdmg, oppSkills[Num].osdamage, defendername, myMob.HP)
      } else {
        console.log(opponentMob.oname + ' skills is less effective. Damage decreased to ' + currentdmg)
        effectivenessMessage(currentdmg, oppSkills[Num].osdamage, defendername, myMob.HP)
      }
    }
    else {
      myMob.HP = currenthp(myMob.HP, oppSkills[Num].osdamage)
      resultMessage(defendername, myMob.HP)
    }
    if (myskillwithstatturn != 0) {
      myskillwithstatturn! < 0
      opponentMob.ohp = skillstatus(opponentMob.oname, myskillwithstatturn, myskillwithstatdamage, opponentMob.ohp)
      myskillwithstatturn = myskillwithstatturn - 1
    } else {
      myskillwithstatdamage = 0
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