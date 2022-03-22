import { Decimal } from 'decimal.js';

const alpha = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function baseCon(number, fromBase, toBase, fromChars, toChars) {
  if (!fromChars) {
    fromChars = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ];
    number = number.toString().toUpperCase();
  }
  if (!toChars) {
    toChars = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ];
  }
  if (typeof number != 'object') {
    number = number.toString();
  }
  if (fromBase > fromChars.length) {
    console.log('fromBase was too high');
  } else if (toBase > toChars.length) {
    console.log('toBase was too high');
  } else {
    if (fromBase == 10) {
      var base10Num = Math.min(number);
    } else {
      var base10Num = 0;
      var place = 0;
      for (var index = number.length - 1; index > -1; index--) {
        base10Num =
          base10Num +
          fromChars.indexOf(number[index]) * Math.pow(fromBase, place);
        place++;
      }
    }
    var string = '';
    var looping = true;
    var stringLen = 0;
    var stringVal = 0;
    while (looping) {
      stringLen++;
      if (Math.pow(toBase, stringLen) == base10Num) {
        stringLen++;
        break;
      } else if (Math.pow(toBase, stringLen) >= base10Num) {
        break;
      }
    }
    for (var placePos = stringLen; placePos > 0; placePos--) {
      for (var placeVal = 0; placeVal < toBase + 1; placeVal++) {
        if (
          placeVal * Math.pow(toBase, placePos - 1) > base10Num - stringVal ||
          (placeVal == 0 && base10Num - stringVal == 0)
        ) {
          if (!(placeVal == 0 && base10Num - stringVal == 0)) {
            stringVal =
              stringVal + (placeVal - 1) * Math.pow(toBase, placePos - 1);
            string = string + toChars[placeVal - 1];
          } else {
            string = string + toChars[0];
          }
          break;
        }
      }
    }
    if (stringVal == base10Num) {
      return string;
    } else {
      console.log('baseCon failed');
      return string;
    }
  }
}
Decimal.prototype.toFormat = function () {
  if (this.e < 3) {
    return this.toString();
  } else {
    let en3 = Math.floor(this.e / 3);
    let enr = this.e - en3 * 3;
    let nch = this.toFixed().substr(0, 3 + enr);
    const eCh = baseCon(en3, 10, alpha.length, false, alpha);
    return nch.substr(0, 1 + enr) + '.' + nch.substr(1 + enr, 2) + eCh;
  }
};
