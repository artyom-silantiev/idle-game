import { Decimal } from 'decimal.js';
import { AbilityBase } from './Ability';
import { RobotStatType } from './Robot';
import { Bonus, allBonusesTypes } from './Bonus';
import * as _ from 'lodash';

const ideFix = 0 as number;

export enum ModuleCategory {
  Ability = 'Ability',
  AbilityMod = 'AbilityMod',
  Bonus = 'Bonus'
}
export abstract class ModuleBase {
  level = new Decimal('1');
  statsRequired = [] as {
    type: RobotStatType;
    amount: Decimal;
  }[];

  constructor(public category: ModuleCategory) {
    this.category = category;
  }
}
export abstract class ModuleAbilityBase extends ModuleBase {
  constructor(public ability: AbilityBase) {
    super(ModuleCategory.Ability);
  }
}

export abstract class ModuleAbilityModBase extends ModuleBase {
  constructor() {
    super(ModuleCategory.AbilityMod);
  }
}

export abstract class ModuleBonusBase extends ModuleBase {
  bonuses = [] as Bonus[];
  constructor() {
    super(ModuleCategory.Bonus);
  }
}
export class ModuleBonus extends ModuleBonusBase {
  rareLevel = new Decimal('0');
  bonuses = [] as Bonus[];
  constructor() {
    super();
  }
}

export function generateRandomBonusModule(level: Decimal) {
  let rareLevel = 0;
  let rndRareVal = Math.random();
  while (rndRareVal < 0.5 / (1 + rareLevel * 0.2)) {
    rareLevel++;
    rndRareVal = Math.random();
  }

  const bonusModule = new ModuleBonus();
  bonusModule.level = level;
  bonusModule.rareLevel = new Decimal(rareLevel);

  const BonusType = _.sample(allBonusesTypes);
  if (!BonusType) {
    return;
  }

  const baseBonus = new BonusType();
  baseBonus.level = level;
  baseBonus.mul = new Decimal('1.0').plus(new Decimal('0.1').mul(rareLevel));
  bonusModule.bonuses.push(baseBonus);

  for (let i = 0; i < rareLevel; i++) {
    const BonusType = _.sample(allBonusesTypes);
    if (!BonusType) {
      break;
    }

    const bonus = new BonusType();
    const levelMin = level.mul('0.5');
    const levelMax = level;
    const tmpLevel = Decimal.random()
      .mul(levelMax.minus(levelMin))
      .plus(levelMin)
      .ceil();

    bonus.level = tmpLevel;
    bonus.mul = new Decimal(_.random(0.5, 1, true));
    bonusModule.bonuses.push(bonus);
  }

  return bonusModule;
}
