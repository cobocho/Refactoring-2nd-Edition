// 함수 인라인하기

interface Driver {
  name: string;
  numberOfLateDeliveries: number;
}

const DRIVER_SAMPLE: Driver = {
  name: '김민규',
  numberOfLateDeliveries: 10,
};

{
  const getRating = (driver: Driver) => {
    return moreThanFiveLateDeliveries(driver) ? 2 : 1;
  };

  const moreThanFiveLateDeliveries = (driver: Driver) => {
    return driver.numberOfLateDeliveries > 5;
  };
}

/*
  함수 인라인 하기
  - 함수명보다 함수의 내용이 더 명확한 경우 간접 호출보다 인라인 하는 것이 더 유용하다.
*/

{
  const getRating = (driver: Driver) => {
    return driver.numberOfLateDeliveries > 5 ? 2 : 1;
  };

  console.log(getRating(DRIVER_SAMPLE));
}

interface Customer {
  name: string;
  location: string;
}

type Line = [string, string];

const CUSTOMER_SAMPLE: Customer = {
  name: '김민규',
  location: '대한민국',
};

/*
  함수 인라인 하기
*/

{
  const gatherCustomerData = (out: Line[], customer: Customer) => {
    out.push(['name', customer.name]);
    out.push(['location', customer.location]);
  };

  const reportLines = (customer: Customer) => {
    const lines: Line[] = [];
    gatherCustomerData(lines, customer);
    return lines;
  };
}

{
  const reportLines = (customer: Customer) => {
    const lines: Line[] = [];
    lines.push(['name', customer.name]);
    lines.push(['location', customer.location]);
    return lines;
  };

  console.log(reportLines(CUSTOMER_SAMPLE));
}
