const opponent = 'Mr Mine'
const myMob = 'Gengar'
const skills = ['Shadow ball', 'Thunderstrike', 'Physical']
let opponentHP = 100
let myMobHP = 100
let isMyTurn = true
const dmg = [50, 60, 70]

// 1. You have encounter your opponent Mr Mine.
// 2. You send in Gengar.
// 3. You can choose one of Gengar's skills
console.log('You have encounter ' + opponent + '.')
console.log('You send in ' + myMob + '.')
console.log('Mr. Mine HP ' + myMobHP)
console.log('Gengar HP ' + opponentHP)
console.log("You can choose one of " + myMob + "'s skills.")
// 3. Gengar use shadow ball. Shadow Ball hits for 50 DMG. 
// 4. Critical Hit. Enemy fainted because health reduced to 0/
// console.log(myMob + ' use ' + skills + '. ' + skills + ' hits for ' + shadowballdmg + ' DMG.')
// opponentHP = opponentHP - shadowballdmg
// console.log('Critical Hit. ' + opponent + ' health reduced to ' + opponentHP + '.')
// console.log("It's now your opponent turn.")

//game ongoing with loop
while (myMobHP > 0 && opponentHP > 0) {
  console.log('-------------------------------------------------------------')
  let attackername = isMyTurn ? myMob : opponent
  let defendername = isMyTurn ? opponent : myMob
  const Num = Math.floor(Math.random() * 2)
  console.log(attackername + ' use ' + skills[Num] + '. ' + skills[Num] + ' hits for ' + dmg[Num] + ' DMG.')
  let currentdmg = dmg[Num]

  if (isMyTurn) {
    opponentHP = opponentHP - currentdmg
    console.log('Critical Hit. ' + defendername + ' health reduced to ' + opponentHP + '.')
  } else {
    myMobHP = myMobHP - currentdmg
    console.log('Critical Hit. ' + defendername + ' health reduced to ' + myMobHP + '.')
  }

  isMyTurn = !isMyTurn
}

if (opponentHP <= 0) {
  console.log(opponent + ' has fainted.')
  // 5. You have earned experience points.
  console.log('You have gained 50 exp points.')
  // 6. if your pokemon levels up, might learn new skills.
  console.log('')
}

else {
  console.log(myMob + ' has fainted.')
  // 5. You have earned experience points.
  console.log('')
}