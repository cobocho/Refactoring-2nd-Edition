import sampleProvinceData from '../fixture';
import Province from '../province';

describe('Province test', () => {
  let asia;

  beforeEach(() => {
    asia = new Province(sampleProvinceData());
  });

  it('생산 부족분 테스트', () => {
    expect(asia.shortfall).toBe(5);
  });

  it('총수익 테스트', () => {
    expect(asia.profit).toBe(230);
  });

  it('생산량 수정 테스트', () => {
    asia.producers[0].production = 20;
    expect(asia.shortfall).toBe(-6);
    expect(asia.profit).toBe(292);
  });

  it('zero demand', () => {
    asia.demand = 0;
    expect(asia.shortfall).toBe(-25);
    expect(asia.profit).toBe(0);
  });

  it('negative demand', () => {
    asia.demand = -1;
    expect(asia.shortfall).toBe(-26);
    expect(asia.profit).toBe(-10);
  });

  it('empty string demand', () => {
    asia.demand = '';
    expect(asia.shortfall).toBeNaN();
    expect(asia.profit).toBeNaN();
  });
});

describe('no producers test', () => {
  let noProducers;

  beforeEach(() => {
    const data = {
      name: 'no producers',
      producers: [],
      demand: 30,
      price: 20,
    };
    noProducers = new Province(data);
  });

  it('생산 부족분 테스트', () => {
    expect(noProducers.shortfall).toBe(30);
  });

  it('총수익 테스트', () => {
    expect(noProducers.profit).toBe(0);
  });
});

describe('string producers test', () => {
  it('생산 부족분 테스트', () => {
    expect(() => {
      const data = {
        name: 'string producers',
        producers: '',
        demand: 30,
        price: 20,
      };
      new Province(data);
    }).toThrow();
  });
});
