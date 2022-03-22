import { Decimal } from 'decimal.js';
import { Robot } from './Robot';

const ideFix = 0 as number;

export abstract class Bonus {
  level = new Decimal('1');
  mul = new Decimal('1.0');

  getValueMul1() {
    return new Decimal(this.level).pow('0.5').mul('0.04').mul(this.mul);
  }

  getValueAmount0() {
    return new Decimal(this.level).pow('1.22').mul('0.2').mul(this.mul).ceil();
  }
  getValueAmount1() {
    return new Decimal(this.level).pow('1.22').mul(this.mul).ceil();
  }
  getValueAmount2() {
    return new Decimal(this.level).pow('1.22').mul('10').mul(this.mul).ceil();
  }
  getValueAmount3() {
    return new Decimal(this.level).pow('1.22').mul('2').mul(this.mul).ceil();
  }
  getValueAmount4() {
    return new Decimal(this.level).pow('1.22').mul('5').mul(this.mul).ceil();
  }

  abstract use(robot: Robot): void;
  abstract getTitleString(): string;
}

class BonusExpMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.expMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueMul1();
    return `ExpMul ${value.toString}`;
  }
}

// Stats
// MEH
class BonusStatMEH extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount1();
    robot.expMul = robot.stMEH.amount.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount1();
    return `StatMEH ${value.toString}`;
  }
}
class BonusStatMEHMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.stMEH.amountMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueMul1();
    return `StatMEHMul ${value.toString}`;
  }
}
// ARM
class BonusStatARM extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount1();
    robot.expMul = robot.stARM.amount.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount1();
    return `StatARM ${value.toString}`;
  }
}
class BonusStatARMMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.stARM.amountMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueMul1();
    return `StatARMMul ${value.toString}`;
  }
}
// STR
class BonusStatSTR extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount1();
    robot.expMul = robot.stSTR.amount.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount1();
    return `StatSTR ${value.toString}`;
  }
}
class BonusStatSTRMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.stSTR.amountMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueMul1();
    return `StatSTRMul ${value.toString}`;
  }
}
// CPU
class BonusStatCPU extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount1();
    robot.expMul = robot.stCPU.amount.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount1();
    return `StatCPU ${value.toString}`;
  }
}
class BonusStatCPUMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.stCPU.amountMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueMul1();
    return `StatCPUMul ${value.toString}`;
  }
}
// POW
class BonusStatPOW extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount1();
    robot.expMul = robot.stPOW.amount.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount1();
    return `StatPOW ${value.toString}`;
  }
}
class BonusStatPOWMul extends Bonus {
  getValue() {
    return new Decimal(this.level).pow('0.5').mul('0.04').mul(this.mul);
  }
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.stPOW.amountMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueMul1();
    return `StatPOWMul ${value.toString}`;
  }
}
// ENG
class BonusStatENG extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount1();
    robot.expMul = robot.stENG.amount.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount1();
    return `StatENG ${value.toString}`;
  }
}
class BonusStatENGMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.stENG.amountMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueMul1();
    return `StatENGMul ${value.toString}`;
  }
}

// Shield params
class BonusShieldMax extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount2();
    robot.expMul = robot.shieldMax.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount2();
    return `shieldMax ${value.toString}`;
  }
}
class BonusShieldMaxMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.shieldMaxMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueMul1();
    return `shieldMaxMul ${value.toString}`;
  }
}
class BonusShieldReg extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount0();
    robot.expMul = robot.shieldReg.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount0();
    return `shieldReg ${value.toString}`;
  }
}
class BonusShieldRegMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.shieldRegMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueMul1();
    return `shieldRegMul ${value.toString}`;
  }
}
class BonusShieldDefBase extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount3();
    robot.expMul = robot.shieldBaseDef.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount3();
    return `shieldBaseDef ${value.toString}`;
  }
}
class BonusShieldDefBaseMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.shieldBaseDefMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueMul1();
    return `shieldBaseDefMul ${value.toString}`;
  }
}

// Armor params
class BonusArmorMax extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount2();
    robot.expMul = robot.armorMax.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount2();
    return `armorMax ${value.toString}`;
  }
}
class BonusArmorMaxMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.armorMaxMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueMul1();
    return `armorMaxMul ${value.toString}`;
  }
}
class BonusArmorDefBase extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount3();
    robot.expMul = robot.armorBaseDef.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount3();
    return `armorBaseDef ${value.toString}`;
  }
}
class BonusArmorDefBaseMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.armorBaseDefMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueMul1();
    return `armorBaseDefMul ${value.toString}`;
  }
}

// Structure params
class BonusStructureMax extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount2();
    robot.expMul = robot.structureMax.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount2();
    return `structureMax ${value.toString}`;
  }
}
class BonusStructureMaxMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.structureMaxMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueMul1();
    return `structureMaxMul ${value.toString}`;
  }
}
class BonusStructureDefBase extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount3();
    robot.expMul = robot.structureBaseDef.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount3();
    return `structureBaseDef ${value.toString}`;
  }
}
class BonusStructureDefBaseMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.structureBaseDefMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueMul1();
    return `structureBaseDefMul ${value.toString}`;
  }
}

// Energy params
class BonusEnergyMax extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount4();
    robot.expMul = robot.energyMax.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount4();
    return `energyMax ${value.toString}`;
  }
}
class BonusEnergyMaxMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.energyMaxMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueMul1();
    return `energyMaxMul ${value.toString}`;
  }
}

// DMG params
class BonusDmgPowBase extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount1();
    robot.expMul = robot.dmgPowBase.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount1();
    return `dmgPowBase ${value.toString}`;
  }
}
class BonusDmgPowBaseMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.dmgPowBaseMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueMul1();
    return `dmgPowBaseMul ${value.toString}`;
  }
}
class BonusDmgBase extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount1();
    robot.expMul = robot.dmgPowBase.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount1();
    return `dmgBase ${value.toString}`;
  }
}
class BonusDmgBaseMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.dmgPowBaseMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueMul1();
    return `dmgBaseMul ${value.toString}`;
  }
}

// Crit Params
class BonusCritCh extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount4();
    robot.expMul = robot.critCh.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount4();
    return `critCh ${value.toString}`;
  }
}
class BonusCritChMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.critChMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount4();
    return `critChMul ${value.toString}`;
  }
}
class BonusCritAntiCh extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount4();
    robot.expMul = robot.critAntiCh.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount4();
    return `critAntiCh ${value.toString}`;
  }
}
class BonusCritAntiChMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.critAntiChMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount4();
    return `critAntiChMul ${value.toString}`;
  }
}
class BonusCritDmgMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.critDmgMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount4();
    return `critDmgMul ${value.toString}`;
  }
}

// Hit/Flee Params
class BonusHit extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount4();
    robot.expMul = robot.hit.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount4();
    return `hit ${value.toString}`;
  }
}
class BonusHitMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.hitMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount4();
    return `hitMul ${value.toString}`;
  }
}
class BonusFlee extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount4();
    robot.expMul = robot.flee.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount4();
    return `flee ${value.toString}`;
  }
}
class BonusFleeMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.fleeMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount4();
    return `fleeMul ${value.toString}`;
  }
}

// Spd params
class BonusActionsPerTurn extends Bonus {
  getValue() {
    return new Decimal(this.level).pow('0.50').mul('1.25').mul(this.mul).ceil();
  }
  use(robot: Robot) {
    const value = this.getValue();
    robot.expMul = robot.actionsPerTurn.plus(value);
  }
  getTitleString() {
    const value = this.getValue();
    return `actionsPerTurn ${value.toString}`;
  }
}
class BonusAbilitiesUsesMul extends Bonus {
  use(robot: Robot) {
    const value = this.getValueMul1();
    robot.expMul = robot.abilitiesUsesMul.plus(value);
  }
  getTitleString() {
    const value = this.getValueMul1();
    return `abilitiesUsesMul ${value.toString}`;
  }
}
class BonusBaseInitiative extends Bonus {
  use(robot: Robot) {
    const value = this.getValueAmount1();
    robot.expMul = robot.baseInitiative.plus(value);
  }
  getTitleString() {
    const value = this.getValueAmount1();
    return `baseInitiative ${value.toString}`;
  }
}

export const allBonusesTypes = [
  BonusExpMul,

  BonusStatMEH,
  BonusStatMEHMul,
  BonusStatARM,
  BonusStatARMMul,
  BonusStatSTR,
  BonusStatSTRMul,
  BonusStatCPU,
  BonusStatCPUMul,
  BonusStatPOW,
  BonusStatPOWMul,
  BonusStatENG,
  BonusStatENGMul,

  BonusShieldMax,
  BonusShieldMaxMul,
  BonusShieldReg,
  BonusShieldRegMul,
  BonusShieldDefBase,
  BonusShieldDefBaseMul,

  BonusArmorMax,
  BonusArmorMaxMul,
  BonusArmorDefBase,
  BonusArmorDefBaseMul,

  BonusStructureMax,
  BonusStructureMaxMul,
  BonusStructureDefBase,
  BonusStructureDefBaseMul,

  BonusEnergyMax,
  BonusEnergyMaxMul,

  BonusDmgPowBase,
  BonusDmgPowBaseMul,
  BonusDmgBase,
  BonusDmgBaseMul,

  BonusCritCh,
  BonusCritChMul,
  BonusCritAntiCh,
  BonusCritAntiChMul,
  BonusCritDmgMul,

  BonusHit,
  BonusHitMul,
  BonusFlee,
  BonusFleeMul,

  BonusActionsPerTurn,
  BonusAbilitiesUsesMul,
  BonusBaseInitiative
];
