// 함수 추출하기

interface Invoice {
  customer: string;
  order: { name: string; amount: number }[];
  dueDate: Date | null;
}

const INVOICE_SAMPLE: Invoice = {
  customer: '김민규',
  order: [
    {
      name: '사채',
      amount: 1_000_000,
    },
    {
      name: '사금융',
      amount: 3_400_000,
    },
  ],
  dueDate: null,
};

{
  const printOwing = (invoice: Invoice) => {
    let outstanding = 0;

    console.log(`**************`);
    console.log(`****고객채무****`);
    console.log(`**************`);

    // 채무(outstanding)를 계산한다
    for (const o of invoice.order) {
      outstanding += o.amount;
    }

    // 마감일(dueDate)을 기록한다 (jest의 경우 시스템 시간을 설정 가능하므로 Clock wrapper가 아닌 실제 Date 인스턴스 사용)
    const today = new Date();
    invoice.dueDate! = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

    // 출력
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate!.toLocaleDateString()}`);
  };
}

/*
  출력 코드를 분리한다 
*/

{
  const printBanner = () => {
    console.log(`**************`);
    console.log(`****고객채무****`);
    console.log(`**************`);
  };

  const printDetail = (invoice: Invoice, outstanding: number) => {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate!.toLocaleDateString()}`);
  };

  const printOwing = (invoice: Invoice) => {
    let outstanding = 0;

    printBanner();

    // 채무(outstanding)를 계산한다
    for (const o of invoice.order) {
      outstanding += o.amount;
    }

    // 마감일(dueDate)을 기록한다
    const today = new Date();
    invoice.dueDate! = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

    // 출력

    printDetail(invoice, outstanding);
  };
}

/*
  마감일 로직을 분리한다 
*/

{
  const printBanner = () => {
    console.log(`**************`);
    console.log(`****고객채무****`);
    console.log(`**************`);
  };

  const printDetail = (invoice: Invoice, outstanding: number) => {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate!.toLocaleDateString()}`);
  };

  const recordDueDate = (invoice: Invoice) => {
    const today = new Date();
    invoice.dueDate! = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
  };

  const printOwing = (invoice: Invoice) => {
    let outstanding = 0;

    printBanner();

    // 채무(outstanding)를 계산한다
    for (const o of invoice.order) {
      outstanding += o.amount;
    }

    // 마감일(dueDate)을 기록한다
    recordDueDate(invoice);

    // 출력
    printDetail(invoice, outstanding);
  };
}

/*
  변수 슬라이딩 (변수와 관련 로직 근처에 두기)
*/

{
  const printBanner = () => {
    console.log(`**************`);
    console.log(`****고객채무****`);
    console.log(`**************`);
  };

  const printDetail = (invoice: Invoice, outstanding: number) => {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate!.toLocaleDateString()}`);
  };

  const recordDueDate = (invoice: Invoice) => {
    const today = new Date();
    invoice.dueDate! = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
  };

  const printOwing = (invoice: Invoice) => {
    printBanner();

    // 채무(outstanding)를 계산한다
    let outstanding = 0;
    for (const o of invoice.order) {
      outstanding += o.amount;
    }

    // 마감일(dueDate)을 기록한다
    recordDueDate(invoice);

    // 출력
    printDetail(invoice, outstanding);
  };
}

/*
  채무 계산 함수 추출하기
*/

{
  const printBanner = () => {
    console.log(`**************`);
    console.log(`****고객채무****`);
    console.log(`**************`);
  };

  const printDetail = (invoice: Invoice, outstanding: number) => {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate!.toLocaleDateString()}`);
  };

  const recordDueDate = (invoice: Invoice) => {
    const today = new Date();
    invoice.dueDate! = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
  };

  const calculateOutstanding = (invoice: Invoice): number => {
    let outstanding = 0;

    for (const o of invoice.order) {
      outstanding += o.amount;
    }

    return outstanding;
  };

  const printOwing = (invoice: Invoice) => {
    printBanner();

    // 채무(outstanding)를 계산한다
    const outstanding = calculateOutstanding(invoice);

    // 마감일(dueDate)을 기록한다
    recordDueDate(invoice);

    // 출력
    printDetail(invoice, outstanding);
  };
}

/*
  최종 정리
*/

{
  const printBanner = () => {
    console.log(`**************`);
    console.log(`****고객채무****`);
    console.log(`**************`);
  };

  const printDetail = (invoice: Invoice, outstanding: number) => {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate!.toLocaleDateString()}`);
  };

  const recordDueDate = (invoice: Invoice) => {
    const today = new Date();
    invoice.dueDate! = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
  };

  const calculateOutstanding = (invoice: Invoice): number => {
    let result = 0;
    for (const o of invoice.order) {
      result += o.amount;
    }
    return result;
  };

  const printOwing = (invoice: Invoice) => {
    printBanner();
    const outstanding = calculateOutstanding(invoice);
    recordDueDate(invoice);
    printDetail(invoice, outstanding);
  };

  printOwing(INVOICE_SAMPLE);
}
