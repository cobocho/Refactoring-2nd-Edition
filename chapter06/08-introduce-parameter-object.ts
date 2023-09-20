// 매개변수 객체 만들기

{
  interface Station {
    name: string;
    readings: {
      temp: number;
      time: string;
    }[];
  }

  const station: Station = {
    name: 'ZB1',
    readings: [
      { temp: 47, time: '2016-11-10 09:10' },
      { temp: 53, time: '2016-11-10 09:20' },
      { temp: 58, time: '2016-11-10 09:30' },
      { temp: 53, time: '2016-11-10 09:40' },
      { temp: 51, time: '2016-11-10 09:50' },
    ],
  };

  {
    const operationPlan = {
      temperatureFloor: 50,
      temperatureCeiling: 56,
    };

    const readingsOutsideRange = (station: Station, min: number, max: number) => {
      return station.readings.filter((r) => r.temp < min || r.temp > max);
    };

    console.log(readingsOutsideRange(station, operationPlan.temperatureFloor, operationPlan.temperatureCeiling));
  }

  {
    class NumberRange {
      _data;

      constructor(min: number, max: number) {
        this._data = {
          min,
          max,
        };
      }

      get min() {
        return this._data.min;
      }

      get max() {
        return this._data.max;
      }

      contains(target: number) {
        return this.max >= target && this.min <= target;
      }
    }

    const range = new NumberRange(50, 56);

    const readingsOutsideRange = (station: Station, range: NumberRange) => {
      return station.readings.filter((r) => !range.contains(r.temp));
    };

    console.log(readingsOutsideRange(station, range));
  }
}
