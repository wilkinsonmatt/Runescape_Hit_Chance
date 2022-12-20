function calculateMonsterMeleeDefRoll(monsterEffectiveDefence, monsterDefenceLevel) {
  return ((monsterDefenceLevel + 9) * (monsterEffectiveDefence + 64 ));
}

function calculateMonsterEffectiveDefence(monsterDefenceLevel, monsterDefenceLevelBoost) {
  return (monsterDefenceLevel + monsterDefenceLevelBoost + 8);
}

//missing gear bonus (ex: slayer helm, salve amulet)
function calculatePlayerMeleeAttackRoll(PlayerEffectiveAttackLevel, PlayerEquipmentAttackBonus) {
  let attackRoll = (PlayerEffectiveAttackLevel * (PlayerEquipmentAttackBonus + 64));
  attackRoll = Math.floor(attackRoll);
  return attackRoll
}

function calculatePlayerMeleeEffectiveAttack(playerAttackLevel, playerAttackLevelBoost, prayer, attackStyle, attackVoid) {
  let effectiveAttack = ((playerAttackLevel + playerAttackLevelBoost) * prayer);

  effectiveAttack = Math.floor(effectiveAttack);

  if (attackStyle === "Accurate") {
    effectiveAttack += 3;
  } else if (attackStyle === "Controlled") {
    effectiveAttack += 1;
  }

  effectiveAttack += 8;

  if (attackVoid === "yes") {
    effectiveAttack *= 1.1;
  }

  effectiveAttack = Math.floor(effectiveAttack);

  return effectiveAttack;
}

function calculatePlayerHitChance(playerAttackRoll, monsterDefenceRoll) {
  if (playerAttackRoll > monsterDefenceRoll) {
    return (1 - ((monsterDefenceRoll + 2) / (2 * (playerAttackRoll + 1))));
  } else {
    return (playerAttackRoll / (2 * (monsterDefenceRoll + 1)));
  }
}

function calculatePotionBoost(playerAttackLevel, attackPotion) {
  let potionBoost = 0;

  if(attackPotion === "regAttackPotion"){
    potionBoost = Math.floor((playerAttackLevel * .1) + 3);
  }else if(attackPotion === "superAttackPotion"){
    potionBoost = Math.floor((playerAttackLevel * .15) + 5);
  } 
  return potionBoost;
}

//Main function
$(document).ready(function() {
  $("form#questions").submit(function(event) {
    event.preventDefault();
    const playerAttackLevel = parseInt($("#playerAtkLvl").val());
    const playerEquipmentAttackBonus = parseInt($("#playerWeaponStyleBonus").val());
    const playerAttackStyle = $("#playerAttackStyle").val();
    const attackPrayer = $("#attackPrayer").val();
    const attackVoid = $("#attackVoid").val();
    const attackPotion = $("#attackPotion").val(); 

    const playerAttackLevelBoost = calculatePotionBoost(playerAttackLevel, attackPotion);
    const monsterDefenceLevel = parseInt($("#monsterDefLevel").val());
    const monsterArmourBonus = parseInt($("#monsterArmBonus").val());

    let playerEffectiveAttack = calculatePlayerMeleeEffectiveAttack(playerAttackLevel, playerAttackLevelBoost, attackPrayer, playerAttackStyle, attackVoid);
    let playerAttackRoll = calculatePlayerMeleeAttackRoll(playerEffectiveAttack, playerEquipmentAttackBonus);
    let monsterDefenceRoll = calculateMonsterMeleeDefRoll(monsterArmourBonus, monsterDefenceLevel);
    let playerHitChance = calculatePlayerHitChance(playerAttackRoll, monsterDefenceRoll);

    $("#output").text("The Player's Chance To Hit Monster = " + playerHitChance);
  });
});



// https://oldschool.runescape.wiki/w/Damage_per_second/Melee#Step_six:_Calculate_the_hit_chance