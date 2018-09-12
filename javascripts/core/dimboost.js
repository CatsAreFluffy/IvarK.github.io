function getDimensionBoostPower(next) {
  if (player.currentChallenge == "challenge11" || player.currentChallenge == "postc1") return Decimal.fromNumber(1);

  var ret = 2
  if (!player.galacticSacrifice) {
      if (player.infinityUpgrades.includes("resetMult")) ret = 2.5
      if (player.challenges.includes("postc7")) ret = 4
      if (player.currentChallenge == "postc7" || inQC(6) || player.timestudy.studies.includes(81)) ret = 10
  }
  if (player.boughtDims) ret += player.timestudy.ers_studies[4] + (next ? 1 : 0)
  if (player.galacticSacrifice ? player.galacticSacrifice.upgrades.includes(23) : false) ret *= galUpgrade23()
  if (player.infinityUpgrades.includes("resetMult")&&player.galacticSacrifice) ret *= 1.2 + 0.05 * player.infinityPoints.max(1).log(10)
  if (player.achievements.includes("r101")) ret = ret*1.01
  if (player.timestudy.studies.includes(83)) ret = Decimal.pow(1.0004, player.totalTickGained).times(ret);
  if (player.timestudy.studies.includes(231)) ret = Decimal.pow(Math.max(player.resets, 0), 0.3).times(ret)
  if (player.galacticSacrifice) {
      if (player.currentChallenge == "postc7" || inQC(6) || player.timestudy.studies.includes(81)) ret = Math.pow(ret,3)
      else if (player.challenges.includes("postc7")) ret = Math.pow(ret,2)
  }
  if (player.dilation.studies.includes(6)&&player.currentEternityChall!="eterc14"&&!inQC(3)&&!inQC(7)) ret = getExtraDimensionBoostPower().times(ret)
  return new Decimal(ret)
}

function softReset(bulk) {
  //if (bulk < 1) bulk = 1 (fixing issue 184)
  if (!player.break && player.money.gt(Number.MAX_VALUE)) return;
  var oldResets = player.resets
  player.resets+=bulk;
  if (player.masterystudies) if (player.resets > 4) player.old = false
  if (player.resets >= 10) {
      giveAchievement("Boosting to the max");
  }
  if (player.currentChallenge=="challenge14") player.tickBoughtThisInf.pastResets.push({resets:player.resets,bought:player.tickBoughtThisInf.current})
  if (player.dilation.upgrades.includes("ngpp3") && player.eternities >= 1e9 && player.masterystudies && player.aarexModifications.switch === undefined) {
      player.matter = new Decimal(0)
      player.postC8Mult = new Decimal(1)
      if (player.currentEternityChall=='eterc13') return
      var power = player[TIER_NAMES[tier] + 'Pow']
      var temp = getDimensionBoostPower()
      if (player.dbPower === undefined || isNaN(break_infinity_js ? player.dbPower : player.dbPower.logarithm)) player.dbPower = temp
      for (tier = 1; tier < 9; tier++) player[TIER_NAMES[tier] + 'Pow'] = player[TIER_NAMES[tier] + 'Pow'].div(player.dbPower.pow(Math.max(oldResets + 1 - tier, 0))).times(temp.pow(Math.max(player.resets + 1 - tier, 0)))
      player.dbPower = temp
      return
  }
  player = {
      money: player.achievements.includes("r111") ? player.money : new Decimal(10),
      tickSpeedCost: new Decimal(1000),
      tickspeed: new Decimal(player.aarexModifications.newGameExpVersion?500:1000),
      tickBoughtThisInf: player.tickBoughtThisInf,
      firstCost: new Decimal(10),
      secondCost: new Decimal(100),
      thirdCost: new Decimal(10000),
      fourthCost: new Decimal(1000000),
      fifthCost: new Decimal(1e9),
      sixthCost: new Decimal(1e13),
      seventhCost: new Decimal(1e18),
      eightCost: new Decimal(1e24),
      firstAmount: new Decimal(0),
      secondAmount: new Decimal(0),
      thirdAmount: new Decimal(0),
      fourthAmount: new Decimal(0),
      firstBought: 0,
      secondBought: 0,
      thirdBought: 0,
      fourthBought: 0,
      fifthAmount: new Decimal(0),
      sixthAmount: new Decimal(0),
      seventhAmount: new Decimal(0),
      eightAmount: new Decimal(0),
      fifthBought: 0,
      sixthBought: 0,
      seventhBought: 0,
      eightBought: 0,
      boughtDims: player.boughtDims,
      totalBoughtDims: resetTotalBought(),
      sacrificed: new Decimal(0),
      achievements: player.achievements,
      challenges: player.challenges,
      currentChallenge: player.currentChallenge,
      infinityUpgrades: player.infinityUpgrades,
      infinityPoints: player.infinityPoints,
      infinitied: player.infinitied,
      infinitiedBank: player.infinitiedBank,
      totalTimePlayed: player.totalTimePlayed,
      bestInfinityTime: player.bestInfinityTime,
      thisInfinityTime: player.thisInfinityTime,
      firstPow: player.firstPow,
      secondPow: player.secondPow,
      thirdPow: player.thirdPow,
      fourthPow: player.fourthPow,
      fifthPow: player.fifthPow,
      sixthPow: player.sixthPow,
      seventhPow: player.seventhPow,
      eightPow: player.eighthPow,
      resets: player.resets,
      dbPower: player.dbPower ? getDimensionBoostPower() : undefined,
      tickspeedBoosts: player.tickspeedBoosts,
      galaxies: player.galaxies,
      galacticSacrifice: player.galacticSacrifice,
      tickDecrease: player.tickDecrease,
      totalmoney: player.totalmoney,
      interval: null,
      lastUpdate: player.lastUpdate,
      achPow: player.achPow,
      newsArray: player.newsArray,
      autobuyers: player.autobuyers,
      costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
      tickspeedMultiplier: new Decimal(10),
      chall2Pow: player.chall2Pow,
      chall3Pow: new Decimal(0.01),
      matter: new Decimal(0),
      chall11Pow: new Decimal(1),
      partInfinityPoint: player.partInfinityPoint,
      partInfinitied: player.partInfinitied,
      break: player.break,
      challengeTimes: player.challengeTimes,
      infchallengeTimes: player.infchallengeTimes,
      lastTenRuns: player.lastTenRuns,
      lastTenEternities: player.lastTenEternities,
      infMult: player.infMult,
      infMultCost: player.infMultCost,
      tickSpeedMultDecrease: player.tickSpeedMultDecrease,
      tickSpeedMultDecreaseCost: player.tickSpeedMultDecreaseCost,
      dimensionMultDecrease: player.dimensionMultDecrease,
      dimensionMultDecreaseCost: player.dimensionMultDecreaseCost,
      extraDimPowerIncrease: player.extraDimPowerIncrease,
      dimPowerIncreaseCost: player.dimPowerIncreaseCost,
      version: player.version,
      overXGalaxies: player.overXGalaxies,
      infDimensionsUnlocked: player.infDimensionsUnlocked,
      infinityPower: player.infinityPower,
      spreadingCancer: player.spreadingCancer,
      postChallUnlocked: player.postChallUnlocked,
      postC4Tier: 1,
      postC3Reward: getPostC3RewardStart(),
      postC8Mult: new Decimal(1),
      infinityDimension1: player.infinityDimension1,
      infinityDimension2: player.infinityDimension2,
      infinityDimension3: player.infinityDimension3,
      infinityDimension4: player.infinityDimension4,
      infinityDimension5: player.infinityDimension5,
      infinityDimension6: player.infinityDimension6,
      infinityDimension7: player.infinityDimension7,
      infinityDimension8: player.infinityDimension8,
      infDimBuyers: player.infDimBuyers,
      timeShards: player.timeShards,
      tickThreshold: player.tickThreshold,
      timeDimension1: player.timeDimension1,
      timeDimension2: player.timeDimension2,
      timeDimension3: player.timeDimension3,
      timeDimension4: player.timeDimension4,
      timeDimension5: player.timeDimension5,
      timeDimension6: player.timeDimension6,
      timeDimension7: player.timeDimension7,
      timeDimension8: player.timeDimension8,
      eternityPoints: player.eternityPoints,
      eternities: player.eternities,
      thisEternity: player.thisEternity,
      bestEternity: player.bestEternity,
      eternityUpgrades: player.eternityUpgrades,
      epmult: player.epmult,
      epmultCost: player.epmultCost,
      totalTickGained: player.totalTickGained,
      offlineProd: player.offlineProd,
      offlineProdCost: player.offlineProdCost,
      challengeTarget: player.challengeTarget,
      autoSacrifice: player.autoSacrifice,
      replicanti: player.replicanti,
      timestudy: player.timestudy,
      eternityChalls: player.eternityChalls,
      eternityChallGoal: player.eternityChallGoal,
      currentEternityChall: player.currentEternityChall,
      eternityChallUnlocked: player.eternityChallUnlocked,
      etercreq: player.etercreq,
      autoIP: player.autoIP,
      autoTime: player.autoTime,
      infMultBuyer: player.infMultBuyer,
      autoCrunchMode: player.autoCrunchMode,
      autoEterMode: player.autoEterMode,
      peakSpent: player.peakSpent,
      respec: player.respec,
      respecOptions: player.respecOptions,
      eternityBuyer: player.eternityBuyer,
      eterc8ids: player.eterc8ids,
      eterc8repl: player.eterc8repl,
      dimlife: player.dimlife,
      dead: player.dead,
      dilation: player.dilation,
      why: player.why,
      options: player.options,
      meta: player.meta,
      masterystudies: player.masterystudies,
      autoEterOptions: player.autoEterOptions,
      galaxyMaxBulk: player.galaxyMaxBulk,
      quantum: player.quantum,
      old: player.old,
      aarexModifications: player.aarexModifications
  };
  if (player.currentChallenge == "challenge10" || player.currentChallenge == "postc1") {
      player.thirdCost = new Decimal(100)
      player.fourthCost = new Decimal(500)
      player.fifthCost = new Decimal(2500)
      player.sixthCost = new Decimal(2e4)
      player.seventhCost = new Decimal(2e5)
      player.eightCost = new Decimal(4e6)
  }
  reduceDimCosts()
  if (player.currentChallenge == "postc1") player.costMultipliers = [new Decimal(1e3),new Decimal(5e3),new Decimal(1e4),new Decimal(1.2e4),new Decimal(1.8e4),new Decimal(2.6e4),new Decimal(3.2e4),new Decimal(4.2e4)];
  if (player.currentChallenge == "") {
      for (s=1;s<4;s++) if (player.infinityUpgrades.includes("skipReset"+s)&&player.resets<s) player.resets=s
      if (player.infinityUpgrades.includes("skipResetGalaxy")) {
          if (player.resets<4) player.resets=4
          if (player.galaxies == 0) player.galaxies = 1
      }
  }
  if (player.currentChallenge == "postc2") {
      player.eightAmount = new Decimal(1);
      player.eightBought = 1;
  }
  setInitialDimensionPower();


  if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
  if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
  if (player.achievements.includes("r66")) player.tickspeed = player.tickspeed.times(0.98);
  if (player.achievements.includes("r83")) player.tickspeed = player.tickspeed.times(Decimal.pow(0.95,player.galaxies));





  if (player.resets > 4) {
      document.getElementById("confirmation").style.display = "inline-block";
      document.getElementById("sacrifice").style.display = "inline-block";
      document.getElementById("confirmations").style.display = "inline-block";
      document.getElementById("sacConfirmBtn").style.display = "inline-block";
  }
  if (player.eternities < 30) {
      document.getElementById("secondRow").style.display = "none";
      document.getElementById("thirdRow").style.display = "none";
      document.getElementById("tickSpeed").style.visibility = "hidden";
      document.getElementById("tickSpeedMax").style.visibility = "hidden";
      document.getElementById("tickLabel").style.visibility = "hidden";
      document.getElementById("tickSpeedAmount").style.visibility = "hidden";
      document.getElementById("fourthRow").style.display = "none";
      document.getElementById("fifthRow").style.display = "none";
      document.getElementById("sixthRow").style.display = "none";
      document.getElementById("seventhRow").style.display = "none";
      document.getElementById("eightRow").style.display = "none";
  }


  player.tickspeed = player.tickspeed.times(Decimal.pow(getTickSpeedMultiplier(), player.totalTickGained))
  updateTickSpeed()
  if (player.challenges.includes("challenge1")) player.money = new Decimal(100).max(player.money)
  if (player.achievements.includes("r37")) player.money = new Decimal(1000).max(player.money);
  if (player.achievements.includes("r54")) player.money = new Decimal(2e5).max(player.money);
  if (player.achievements.includes("r55")) player.money = new Decimal(1e10).max(player.money);
  if (player.achievements.includes("r78")) player.money = new Decimal(1e25).max(player.money);
}

function setInitialDimensionPower () {
	var dimensionBoostPower = getDimensionBoostPower()
	for (tier = 1; tier < 9; tier++) player[TIER_NAMES[tier] + 'Pow'] = player.currentEternityChall=='eterc13' ? new Decimal(1) : dimensionBoostPower.pow(player.resets + 1 - tier).max(1)
}

function maxBuyDimBoosts(manual) {
	if (inQC(6)) return
	if (player.autobuyers[9].priority >= player.eightBought || player.galaxies >= player.overXGalaxies || getShiftRequirement(0).tier < 8 || manual) {
		var bought = player[TIER_NAMES[getShiftRequirement(0).tier] + "Bought"]
		var r
		if (player.currentEternityChall == "eterc5") {
			r = 1
			while (bought >= getShiftRequirement(r).amount && (player.autobuyers[9].priority >= player.eightBought || player.galaxies >= player.overXGalaxies || getShiftRequirement(0).tier < 8 || manual)) r++
		} else {
			var hasGDBUpg = player.galacticSacrifice ? player.galacticSacrifice.upgrades.includes(21) : false
			var sr = getShiftRequirement((hasGDBUpg ? 5 : 3) - player.resets)
			var ut = Math.min(bought, (player.galaxies >= player.overXGalaxies || manual) ? 1/0 : player.autobuyers[9].priority)
			var ssstart = getSupersonicStart()
			r = (ut - sr.amount) / sr.mult + (hasGDBUpg ? 7 : 5)
			if (r > ssstart) {
				var a = getSupersonicMultIncrease() / 2
				var b = a + sr.mult
				var solution = (-b + Math.sqrt(b * b + (4 * a) * ((r - ssstart + 1) / 4e4) * sr.mult)) / (2 * a)
				var setPoint = ssstart + 4e4 * Math.floor(solution)
				sr = getShiftRequirement(setPoint - player.resets)
				r = (ut - sr.amount) / sr.mult + setPoint + 1
			}
			r = Math.floor(r) - player.resets
		}

		if (r > 749) giveAchievement("Costco sells dimboosts now")
		if (r > 0) softReset(r)
	}
}

function getShiftRequirement(bulk) {
  let amount = 20;
  let mult = getDimboostCostIncrease()
  var resetNum = player.resets + bulk
  var maxTier = player.currentChallenge == "challenge4" ? 6 : 8
  tier = Math.min(resetNum + 4, maxTier)
  if (tier == maxTier) amount += Math.max(resetNum + (player.galacticSacrifice ? (player.galacticSacrifice.upgrades.includes(21) ? 2 : 4) : 4) - maxTier, 0) * mult
  var costStart = getSupersonicStart()
  if (player.currentEternityChall == "eterc5") {
      amount += Math.pow(resetNum, 3) + resetNum
  } else if (resetNum >= costStart) {
      var displacement = Math.ceil((resetNum - costStart + 1) / 4e4)
      var offset = resetNum % 4e4 + 1
      var inc = getSupersonicMultIncrease()
      amount += displacement * (displacement - 1) * 2e4 * inc + offset * displacement * inc
      mult += displacement * inc
  }

  if (player.infinityUpgrades.includes("resetBoost")) amount -= 9;
  if (player.challenges.includes("postc5")) amount -= 1

  return { tier: tier, amount: amount, mult: mult };
}

function getDimboostCostIncrease () {
	if (false) return 15;
	let ret = 15
	if (player.galacticSacrifice) {
		if (player.galacticSacrifice.upgrades.includes(21)) ret -= 10
		if (player.infinityUpgrades.includes('dimboostCost')) ret -= 1
		if (player.infinityUpgrades.includes("postinfi50")) ret -= 0.5
	} else {
		if (player.timestudy.studies.includes(211)) ret -= 5
		if (player.timestudy.studies.includes(222)) ret -= 2
		if (player.masterystudies) if (player.masterystudies.includes("t261")) ret -= 1
		if (player.currentChallenge == "challenge4") ret += 5
	}
	return ret;
}

function getSupersonicStart() {
	if (inQC(5)) return 0
	return 56e4
}

function getSupersonicMultIncrease() {
	if (inQC(5)) return 20
	return 4
}

document.getElementById("softReset").onclick = function () {
  if (inQC(6)) return
  var name = TIER_NAMES[getShiftRequirement(0).tier]
  if ((!player.break && player.money.gt(Number.MAX_VALUE)) || player[name + "Bought"] < getShiftRequirement(0).amount) return;
  auto = false;
  var pastResets = player.resets
  if (player.infinityUpgrades.includes("bulkBoost")) maxBuyDimBoosts(true);
  else softReset(1)
  if (player.resets <= pastResets) return
  if (player.currentEternityChall=='eterc13') return
  var dimensionBoostPower = getDimensionBoostPower()
  for (var tier = 1; tier < 9; tier++) if (player.resets >= tier) floatText(TIER_NAMES[tier] + "D", "x" + shortenDimensions(dimensionBoostPower.pow(player.resets + 1 - tier)))
};