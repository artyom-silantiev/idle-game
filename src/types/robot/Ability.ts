import { Decimal } from 'decimal.js';
import { Robot } from './Robot';
import { Battle, BattleState } from './Battle';
import * as _ from 'lodash';

const ideFix = 0 as number;

/*
  - Battle has multiple turns
  - Turn has multiple actions
  - Action has multiple ability uses
*/

export enum AblityTargetType {
  Self = 'Self',
  EnemyRandom = 'EnemyRandom',
  EnemyNearst = 'EnemyNearst',
  EnemyMostThreat = 'EnemyMostThreat',
  EnemiesAOEAll = 'EnemiesAOEAll'
}

export enum AblityUseType {
  OnePerBattle = 'OnePerBattle',
  MulPerBattle = 'MulPerBattle',
  OnePerTurn = 'OnePerTurn',
  MulPerTurn = 'MulPerTurn',
  OnePerAction = 'OnePerAction',
  MulPerAction = 'MultiplePerAction'
}

export enum AbilityTag {
  Attack
}

export interface AbilityTask {
  battle: Battle;
  executor: Robot;
  targetIsTargets: boolean;
  target?: Robot;
  targets?: Robot[];
}
export interface AbiResAttack {
  attacker: Robot;
  target: Robot;
  damageBase: Decimal;
}
export interface AbilityTaskResult {
  abilityTask: AbilityTask;
  attacks: AbiResAttack[];
}

class AbilityResultParser {
  constructor(
    private battle: Battle,
    private ability: AbilityBase,
    private result: AbilityTaskResult
  ) {}

  parse() {
    this.parseAbilityTaskResult(this.result);
  }

  private parseAbilityTaskResult(res: AbilityTaskResult) {
    const battle = res.abilityTask.battle;

    for (const attack of res.attacks) {
      this.parseAbbilityAttack(battle, attack);
    }
  }

  private parseAbbilityAttack(battle: Battle, attack: AbiResAttack) {
    const isHit = this.getAttackIsHit(attack);
    if (!isHit) {
      return;
    }
    const target = attack.target;
    const critDmgMul = this.getCritDmgMul(attack);
    let damage = attack.damageBase.mul(critDmgMul).ceil();

    if (target.shield.gt('0')) {
    }

    if (target.armor.gt('0')) {
    }

    if (target.structure.gt('0')) {
    }
  }

  private getAttackIsHit(attack: AbiResAttack) {
    const hit = attack.attacker.hit;
    const flee = attack.target.flee;
    const hitCh = new Decimal('0.2').plus(
      new Decimal('0.5').div(flee.div(hit).pow('0.2'))
    );
    const isHit = Decimal.random().lt(hitCh);
    return isHit;
  }

  private getCritDmgMul(attack: AbiResAttack) {
    const critCh = attack.attacker.critCh;
    const critAntiCh = attack.target.critAntiCh;
    let critChans = new Decimal(this.ability.baseCritCh).div(
      critAntiCh.div(critCh).pow('1.0')
    );
    let critDmgMul = new Decimal('1.0');
    let isCrit = Decimal.random().lt(critChans);
    while (isCrit) {
      critDmgMul = critDmgMul.mul(attack.attacker.critDmgMul);
      critChans = critChans.minus('1.0');
      if (critChans.gte('1.0')) {
        critChans = critChans.div('2');
        isCrit = Decimal.random().lt(critChans);
      } else {
        break;
      }
    }
    return critDmgMul;
  }
}

export abstract class AbilityBase {
  level = new Decimal('1');

  targetType = AblityTargetType.EnemyRandom;
  useType = AblityUseType.MulPerAction;
  cdPerTurn = false;
  cdPerAction = false;
  tags = [] as AbilityTag[];

  baseEnergyCost = new Decimal('0'); // per use
  getEnergyCostCustom?: () => Decimal;
  setGetEnergyCostCustom(getEnergyCostCustom: () => Decimal) {
    this.getEnergyCostCustom = getEnergyCostCustom;
  }
  baseCritCh = new Decimal('0.05');

  currentTurn = 0;
  usesPtsPerTurn = 0;
  usesPtsPerAction = 100;
  usesPtsCurrent = 0;

  cooldownOnAction = 0;
  cooldown = 0;

  usesInThisBattle = 0;
  usesInThisTurn = 0;
  usesInThisAction = 0;

  constructor() {}

  handleAction(battleState: BattleState) {
    this.resetOnAction();
    this.workTurn(battleState);
    this.workCoolDown();
    this.workUsesPts(battleState);
    if (this.cooldown === 0) {
      this.workUse(battleState);
    }
    if (this.usesInThisAction > 0) {
      this.cooldown = this.cooldownOnAction;
    }
  }

  private workTurn(battleState: BattleState) {
    if (this.currentTurn !== battleState.battle.turn) {
      this.resetOnTurn();
      this.workCoolDown(true);
      this.workUsesPts(battleState, true);
      this.currentTurn = battleState.battle.turn;
    }
  }

  private workCoolDown(isTurn = false) {
    if (isTurn) {
      if (this.cdPerTurn && this.cooldown > 0) {
        this.cooldown--;
      }
    } else {
      if (this.cdPerAction && this.cooldown > 0) {
        this.cooldown--;
      }
    }
  }

  private workUsesPts(battleState: BattleState, isTurn = false) {
    if (this.cooldown > 0) {
      return;
    }

    const robot = battleState.robot;

    if (isTurn) {
      this.usesPtsCurrent += Math.round(
        this.usesPtsPerTurn * robot.abilitiesUsesMul.toNumber()
      );
    } else {
      this.usesPtsCurrent += Math.round(
        this.usesPtsPerAction * robot.abilitiesUsesMul.toNumber()
      );
    }
  }

  private workUse(battleState: BattleState) {
    if (
      this.useType === AblityUseType.OnePerBattle &&
      this.usesInThisBattle === 0
    ) {
      this.oneUse(battleState);
    } else if (
      this.useType === AblityUseType.OnePerTurn &&
      this.usesInThisTurn === 0
    ) {
      this.oneUse(battleState);
    } else if (
      this.useType === AblityUseType.OnePerAction &&
      this.usesInThisAction === 0
    ) {
      this.oneUse(battleState);
    } else if (
      this.useType === AblityUseType.MulPerBattle &&
      this.usesInThisBattle === 0
    ) {
      this.multipleUses(battleState);
    } else if (
      this.useType === AblityUseType.MulPerTurn &&
      this.usesInThisTurn === 0
    ) {
      this.multipleUses(battleState);
    } else if (
      this.useType === AblityUseType.MulPerAction &&
      this.usesInThisAction === 0
    ) {
      this.multipleUses(battleState);
    }
  }

  public getEnergyCost() {
    if (this.getEnergyCostCustom) {
      return this.getEnergyCostCustom();
    } else {
      if (this.baseEnergyCost.gt('0')) {
        return new Decimal(this.level)
          .pow('1.22')
          .mul(this.baseEnergyCost)
          .ceil();
      } else {
        return new Decimal('0');
      }
    }
  }

  private oneUse(battleState: BattleState) {
    if (this.usesPtsCurrent >= 100) {
      this.use(battleState);
    }
  }

  private multipleUses(battleState: BattleState) {
    while (this.usesPtsCurrent >= 100) {
      this.use(battleState);
    }
  }

  private getAbilityTask(battleState: BattleState) {
    const executor = battleState.robot;
    const targets = [] as Robot[];

    if (this.targetType === AblityTargetType.Self) {
      targets.push(battleState.robot);
    } else if (this.targetType === AblityTargetType.EnemyRandom) {
      const target = this.getRandomEnemy(battleState);
      if (target) {
        targets.push(target);
      }
    }

    const abilityTask = {
      battle: battleState.battle,
      executor,
      targetIsTargets: targets.length > 1
    } as AbilityTask;

    if (targets.length === 1) {
      abilityTask.target = targets[0];
    } else if (targets.length > 1) {
      abilityTask.targets = targets;
    } else {
      return null;
    }

    return abilityTask;
  }

  private use(battleState: BattleState) {
    const energyCost = this.getEnergyCost();
    if (battleState.robot.energy.lt(energyCost)) {
      return;
    }

    const abilityTask = this.getAbilityTask(battleState);
    if (!abilityTask) {
      return;
    }

    const result = this.handleUse(abilityTask);
    if (!result) {
      return;
    }

    const abilityResultPaser = new AbilityResultParser(
      battleState.battle,
      this,
      result
    );
    abilityResultPaser.parse();

    battleState.robot.energy = battleState.robot.energy.minus(energyCost);
    this.usesInThisBattle++;
    this.usesInThisTurn++;
    this.usesInThisAction++;
    this.usesPtsCurrent -= 100;
  }

  abstract handleUse(abilityTask: AbilityTask): AbilityTaskResult;

  public resetOnBattle() {
    this.usesInThisBattle = 0;
    this.usesPtsCurrent = 0;
    this.currentTurn = 0;
  }

  private resetOnTurn() {
    this.usesInThisTurn = 0;
  }

  private resetOnAction() {
    this.usesInThisAction = 0;
  }

  getLiveRobots(robots: Robot[]) {
    const tmpRobots = robots.filter((r) => r.isLive);
    return tmpRobots;
  }

  getRandomEnemy(battleState: BattleState) {
    const liveEnemys = this.getLiveRobots(battleState.enemyTeam);

    if (liveEnemys.length === 0) {
      return null;
    }

    return _.sample(liveEnemys);
  }

  attack(damage: Decimal, battleState: BattleState) {}
}

export class BaseAttack extends AbilityBase {
  constructor() {
    super();
    this.tags = [AbilityTag.Attack];
  }

  getDamage(robot: Robot) {
    const minDmg = new Decimal(this.level).pow('1.22').mul('0.75');
    const maxDmg = new Decimal(this.level).pow('1.22').mul('1.25');
    const abilityDamage = Decimal.random()
      .mul(maxDmg.minus(minDmg))
      .plus(minDmg)
      .plus(robot.dmgBase.mul('1.0'))
      .mul(robot.dmgBaseMul)
      .ceil();
    return abilityDamage;
  }

  handleUse(task: AbilityTask) {
    return {
      abilityTask: task,
      attacks: [
        {
          attacker: task.executor,
          target: task.target,
          damageBase: this.getDamage(task.executor)
        }
      ]
    } as AbilityTaskResult;
  }
}
