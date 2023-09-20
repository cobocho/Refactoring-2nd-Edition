// 여러 함수를 변환 함수로 묶기

const cloneDeep = require('lodash/cloneDeep');

{
  interface ReadingInterface {
    customer: string;
    quantity: number;
    month: number;
    year: number;
    baseCharge?: number;
    taxableCharge?: number;
  }

  const baseRate = (month: number, year: number) => year - 2000 + month;
  const calculateBaseCharge = (reading: ReadingInterface) => baseRate(reading.month, reading.year) * reading.quantity;
  const taxThreshold = (year: number) => (year - 2000) * 0.1;

  const enrichReading = (original: ReadingInterface): ReadingInterface => {
    const result = cloneDeep(original);
    result.baseCharge = calculateBaseCharge(result);
    result.taxableCharge = Math.max(0, result.baseCharge - taxThreshold(result.year));

    return result;
  };

  const acquireReading = (): ReadingInterface => ({
    customer: '김민규',
    quantity: 10,
    month: 5,
    year: 2017,
  });

  const client1 = () => {
    const rawReading = acquireReading();
    const reading = enrichReading(rawReading);
    return reading.baseCharge;
  };

  const client2 = () => {
    const rawReading = acquireReading();
    const reading = enrichReading(rawReading);
    return reading.taxableCharge;
  };

  const client3 = () => {
    const rawReading = acquireReading();
    const reading = enrichReading(rawReading);
    return reading.baseCharge;
  };

  console.log(client1(), client2(), client3());
}
