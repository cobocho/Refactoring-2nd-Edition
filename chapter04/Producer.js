export default class Producer {
  constructor(province, data) {
    this._province = province;
    this._cost = data.cost;
    this._name = data.name;
    this._production = data.production;
  }

  get name() {
    return this._name;
  }

  get cost() {
    return this._cost;
  }

  set cost(arg) {
    this._cost = parseInt(arg);
  }

  get production() {
    return this._production;
  }

  set production(amountStr) {
    const amount = parseInt(amountStr);
    const newProduction = isNaN(amount) ? 0 : amount;
    this._province.totalProduction += newProduction - this._production;
    this._production = newProduction;
  }
}
