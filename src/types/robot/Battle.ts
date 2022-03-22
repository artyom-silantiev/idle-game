import { Decimal } from 'decimal.js';
import { Robot } from './Robot';
import * as _ from 'lodash';

const ideFix = 0 as number;

export class RobotBattleWrap {
  actionsPts = 0;
  initiative = 0;
  constructor(
    public robot: Robot,
    public teamMark: 'A' | 'B',
    public myTeam: Robot[],
    public enemyTeam: Robot[]
  ) {}
}

export type BattleTeam = null | 'A' | 'B';
export class Battle {
  turn = 0;
  isEnd = false;
  winnerTeam = null as BattleTeam;
  teamA = [] as Robot[];
  teamB = [] as Robot[];
  allRobots = [] as RobotBattleWrap[];
  battleLogs = [] as string[];

  init() {
    for (const robot of this.teamA) {
      const robotWrap = new RobotBattleWrap(robot, 'A', this.teamA, this.teamB);
      this.allRobots.push(robotWrap);
    }
    for (const robot of this.teamB) {
      const robotWrap = new RobotBattleWrap(robot, 'B', this.teamB, this.teamA);
      this.allRobots.push(robotWrap);
    }
  }

  handleTurn() {
    this.turn++;
    this.battleLogs.push(`Battle turn ${this.turn} start`);
    const robotsActionsOrder = this.getRobotsActionsOrder();
  }

  getRobotsActionsOrder() {
    const robotsActionsOrder = [] as RobotBattleWrap[];

    for (const robotWrap of this.allRobots) {
      robotWrap.actionsPts += robotWrap.robot.actionsPerTurn.toNumber();
    }

    while (true) {
      for (const robotWrap of this.allRobots) {
        robotWrap.initiative = _.random(
          robotWrap.robot.baseInitiative.toNumber(),
          robotWrap.robot.baseInitiative.toNumber() * 4
        );
      }

      let tmpRobot = [] as RobotBattleWrap[];
      tmpRobot = _.orderBy(tmpRobot, ['initiative'], ['desc']);

      let actionsPerLoop = 0;
      for (const robotWrap of tmpRobot) {
        if (robotWrap.actionsPts >= 100) {
          robotWrap.actionsPts -= 100;
          robotsActionsOrder.push(robotWrap);
          actionsPerLoop++;
        }
      }

      if (actionsPerLoop === 0) {
        break;
      }
    }

    return robotsActionsOrder;
  }
}

export class BattleState {
  constructor(
    public robot: Robot,
    public myTeam: Robot[],
    public enemyTeam: Robot[],
    public battle: Battle
  ) {}
}
