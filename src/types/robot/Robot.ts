import { Decimal } from 'decimal.js';
import { getUid } from '../../lib/utils';
import { AbilityBase } from './Ability';
import {
  ModuleBase,
  ModuleAbilityBase,
  ModuleAbilityModBase,
  ModuleBonusBase
} from './Module';

const ideFix = 0 as number;

export enum RobotStatType {
  MEH = 'MEH',
  ARM = 'ARM',
  STR = 'STR',
  CPU = 'CPU',
  POW = 'POW',
  ENG = 'ENG'
}
export class RobotStat {
  amount = new Decimal('10');
  amountMul = new Decimal('1.0');
  used = new Decimal('0');

  constructor(public type: RobotStatType) {}

  getFreeAmount() {
    return this.amount.minus(this.used);
  }
}

export class Robot {
  uid = getUid();

  abilities = [] as AbilityBase[];
  modules = [] as ModuleBase[];

  level = new Decimal('1');
  exp = new Decimal('0');
  expReq = new Decimal('100');
  expMul = new Decimal('1.0');
  isLive = true;

  stMEH = new RobotStat(RobotStatType.MEH);
  stARM = new RobotStat(RobotStatType.ARM);
  stSTR = new RobotStat(RobotStatType.STR);
  stCPU = new RobotStat(RobotStatType.CPU);
  stPOW = new RobotStat(RobotStatType.POW);
  stENG = new RobotStat(RobotStatType.ENG);

  shield = new Decimal('20');
  shieldMax = new Decimal('20');
  shieldMaxMul = new Decimal('1.0');
  shieldReg = new Decimal('0.5');
  shieldRegMul = new Decimal('1.0');
  shieldBaseDef = new Decimal('0');
  shieldBaseDefMul = new Decimal('1.0');

  armor = new Decimal('20');
  armorMax = new Decimal('20');
  armorMaxMul = new Decimal('1.0');
  armorBaseDef = new Decimal('0');
  armorBaseDefMul = new Decimal('1.0');

  structure = new Decimal('20');
  structureMax = new Decimal('20');
  structureMaxMul = new Decimal('1.0');
  structureBaseDef = new Decimal('0');
  structureBaseDefMul = new Decimal('1.0');

  energy = new Decimal('10');
  energyMax = new Decimal('10');
  energyMaxMul = new Decimal('1.0');
  energyReg = new Decimal('1.0');
  energyRegMul = new Decimal('1.0');

  dmgPowBase = new Decimal('10');
  dmgPowBaseMul = new Decimal('1.0');
  dmgBase = new Decimal('0');
  dmgBaseMul = new Decimal('1.0');

  critCh = new Decimal('100');
  critChMul = new Decimal('1.0');
  critAntiCh = new Decimal('100');
  critAntiChMul = new Decimal('1.0');
  critDmgMul = new Decimal('1.5');

  hit = new Decimal('100');
  hitMul = new Decimal('1.0');
  flee = new Decimal('100');
  fleeMul = new Decimal('1.0');

  actionsPerTurn = new Decimal('100');
  baseInitiative = new Decimal('50');
  abilitiesUsesMul = new Decimal('1.0');

  constructor() {}

  addExp(baseExp: Decimal) {
    const addedExp = new Decimal(baseExp).times(this.expMul).round();
    this.exp = this.exp.plus(addedExp);
    while (this.exp.gte(this.expReq)) {
      this.exp = this.exp.minus(this.expReq);
      this.level = this.level.plus(1);
      this.expReq = new Decimal('100').times(this.level).times(this.level);
    }
  }

  resetParams() {
    this.stMEH = new RobotStat(RobotStatType.MEH);
    this.stARM = new RobotStat(RobotStatType.ARM);
    this.stSTR = new RobotStat(RobotStatType.STR);
    this.stCPU = new RobotStat(RobotStatType.CPU);
    this.stPOW = new RobotStat(RobotStatType.POW);
    this.stENG = new RobotStat(RobotStatType.ENG);

    this.shield = new Decimal('20');
    this.shieldMax = new Decimal('20');
    this.shieldMaxMul = new Decimal('1.0');
    this.shieldReg = new Decimal('0.5');
    this.shieldRegMul = new Decimal('1.0');
    this.shieldBaseDef = new Decimal('0');
    this.shieldBaseDefMul = new Decimal('1.0');

    this.armor = new Decimal('20');
    this.armorMax = new Decimal('20');
    this.armorMaxMul = new Decimal('1.0');
    this.armorBaseDef = new Decimal('0');
    this.armorBaseDefMul = new Decimal('1.0');

    this.structure = new Decimal('20');
    this.structureMax = new Decimal('20');
    this.structureMaxMul = new Decimal('1.0');
    this.structureBaseDef = new Decimal('0');
    this.structureBaseDefMul = new Decimal('1.0');

    this.energy = new Decimal('10');
    this.energyMax = new Decimal('10');
    this.energyMaxMul = new Decimal('1.0');
    this.energyReg = new Decimal('1.0');
    this.energyRegMul = new Decimal('1.0');

    this.dmgPowBase = new Decimal('10');
    this.dmgPowBaseMul = new Decimal('1.0');
    this.dmgBase = new Decimal('0');
    this.dmgBaseMul = new Decimal('1.0');

    this.critCh = new Decimal('100');
    this.critChMul = new Decimal('1.0');
    this.critAntiCh = new Decimal('100');
    this.critAntiChMul = new Decimal('1.0');
    this.critDmgMul = new Decimal('1.5');

    this.hit = new Decimal('100');
    this.hitMul = new Decimal('1.0');
    this.flee = new Decimal('100');
    this.fleeMul = new Decimal('1.0');

    this.actionsPerTurn = new Decimal('100');
    this.abilitiesUsesMul = new Decimal('1.0');
    this.baseInitiative = new Decimal('50');
  }

  calcParams() {
    this.resetParams();
    this.abilities = [];

    for (const module of this.modules) {
      if (module instanceof ModuleAbilityBase) {
        this.abilities.push(module.ability);
      } else if (module instanceof ModuleBonusBase) {
        for (const bonus of module.bonuses) {
          bonus.use(this);
        }
      }
    }

    this.stMEH.amount = this.stMEH.amount.mul(this.stMEH.amountMul).round();
    this.stARM.amount = this.stARM.amount.mul(this.stARM.amountMul).round();
    this.stSTR.amount = this.stSTR.amount.mul(this.stSTR.amountMul).round();
    this.stCPU.amount = this.stCPU.amount.mul(this.stCPU.amountMul).round();
    this.stPOW.amount = this.stPOW.amount.mul(this.stPOW.amountMul).round();
    this.stENG.amount = this.stENG.amount.mul(this.stENG.amountMul).round();

    this.shieldMax = this.shieldMax.mul(this.shieldMaxMul).round();
    this.shieldReg = this.shieldReg.mul(this.shieldRegMul);
    this.shieldBaseDef = this.shieldBaseDef.mul(this.shieldBaseDefMul).round();

    this.armorMax = this.armorMax.mul(this.armorMaxMul).round();
    this.armorBaseDef = this.armorBaseDef.mul(this.armorBaseDefMul).round();

    this.structureMax = this.structureMax.mul(this.structureMaxMul).round();
    this.structureBaseDef = this.structureBaseDef
      .mul(this.structureBaseDefMul)
      .round();

    this.energyMax = this.energyMax.mul(this.energyMaxMul).round();
    this.energyReg = this.energyReg.mul(this.energyRegMul);

    this.dmgPowBase = this.dmgPowBase.mul(this.dmgPowBaseMul).round();
    this.dmgBase = this.dmgBase.mul(this.dmgBaseMul).round();

    this.critCh = this.critCh.mul(this.critChMul).round();
    this.critAntiCh = this.critAntiCh.mul(this.critAntiChMul).round();

    this.hit = this.hit.mul(this.hitMul).round();
    this.flee = this.flee.mul(this.fleeMul).round();
  }
}
