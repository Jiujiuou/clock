const NUMBER_SIZE = 60
const RING_RADIUS = 400
const RADIUS_RATIO = RING_RADIUS / NUMBER_SIZE // 圆环半径与数字大小的比例，保持视觉比例不变
const ANGLE_STEP = 10 // 圆环上相邻数字的角度间隔
const GROUP_GAP = 20
const VISIBLE_DIGITS = 5
const GROUP_COUNT = 3
const DIGIT_COLUMN_COUNT = 6
const SEPARATOR_COUNT = 2
const GAP_COUNT = GROUP_COUNT + SEPARATOR_COUNT - 1 // items between groups & separators, minus one gap

// 各位数字可选范围
const TENS_2 = [0, 1, 2] // 时十位：0-2
const TENS_5 = [0, 1, 2, 3, 4, 5] // 分/秒十位：0-5
const UNITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] // 个位：0-9

export {
  ANGLE_STEP,
  DIGIT_COLUMN_COUNT,
  GAP_COUNT,
  GROUP_COUNT,
  GROUP_GAP,
  NUMBER_SIZE,
  RADIUS_RATIO,
  RING_RADIUS,
  SEPARATOR_COUNT,
  TENS_2,
  TENS_5,
  UNITS,
  VISIBLE_DIGITS,
}
