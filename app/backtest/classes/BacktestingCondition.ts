/* class Condition {
    side: "buy" | "sell";
    condition: "and" | "or";
    intervalRange: number;
    closed: string
    indicator: string
  public constructor(
    side: "buy" | "sell",
    condition: "and" | "or",
    
  ) {
    this.side = side;
    this.condition = condition
    this.intervalRange = intervalRange
    this.closed = closed,
    this.indicator = 'SimpleMovingAverage'
  }
}
 */
type ConditionOperator = '>' | '>=' | '<' | '<=';

interface ConditionInput {
  field: string; 
  operator: ConditionOperator;
  value: number;
  side: 'buy' | 'sell'
} 

class BacktestingCondition {
  public field: string;
  public operator: ConditionOperator;
  public value: number;

  constructor({ field, operator, value }: ConditionInput) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }

  
}
