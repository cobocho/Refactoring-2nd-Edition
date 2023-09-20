// 여러 함수를 클래스로 묶기

{
  interface ReadingInterface {
    customer: string;
    quantity: number;
    month: number;
    year: number;
  }

  const baseRate = (month: number, year: number) => year - 2000 + month;

  class Reading {
    _customer;

    _quantity;

    _month;

    _year;

    constructor(data: ReadingInterface) {
      this._customer = data.customer;
      this._quantity = data.quantity;
      this._month = data.month;
      this._year = data.year;
    }

    get customer() {
      return this._customer;
    }

    get quantity() {
      return this._quantity;
    }

    get month() {
      return this._month;
    }

    get year() {
      return this._year;
    }

    get baseCharge() {
      return baseRate(this.month, this.year) * this.quantity;
    }

    get taxableCharge() {
      return Math.max(0, this.baseCharge - (this.year - 2000) * 0.1);
    }
  }

  const acquireReading = (): ReadingInterface => ({
    customer: '김민규',
    quantity: 10,
    month: 5,
    year: 2017,
  });

  const client1 = () => {
    const rawReading = acquireReading();
    const reading = new Reading(rawReading);
    const baseCharge = reading.baseCharge;
    return baseCharge;
  };

  const client2 = () => {
    const rawReading = acquireReading();
    const reading = new Reading(rawReading);
    const taxableCharge = reading.taxableCharge;
    return taxableCharge;
  };

  const client3 = () => {
    const rawReading = acquireReading();
    const reading = new Reading(rawReading);
    const baseCharge = reading.baseCharge;
    return baseCharge;
  };

  console.log(client1(), client2(), client3());
}
