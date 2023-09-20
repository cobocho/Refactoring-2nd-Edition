// 함수 선언 바꾸기

{
  interface Customer {
    name: string;
  }

  const CUSTOMER_SAMPLE: Customer = {
    name: '김민규',
  };

  class Book {
    _reservation: Customer[] = [];

    get reservation() {
      return this._reservation;
    }

    addReservation(customer: Customer, isPriority: boolean) {
      this._reservation.push(customer);
    }
  }

  const book = new Book();
  book.addReservation(CUSTOMER_SAMPLE, false);

  console.log(book.reservation);
}

/*
  매개변수 속성으로 바꾸기
*/

{
  interface Customer {
    name: string;
    address: {
      state: string;
    };
  }

  const CUSTOMERS_SAMPLE: Customer[] = [
    { name: '김민규', address: { state: 'CT' } },
    { name: '김민구', address: { state: 'SE' } },
  ];

  {
    const isNewEngland = (customer: Customer) => {
      return ['MA', 'CT', 'ME', 'VI', 'NH', 'RI'].includes(customer.address.state);
    };
  }

  {
    const isNewEngland = (stateCode: string) => {
      return ['MA', 'CT', 'ME', 'VI', 'NH', 'RI'].includes(stateCode);
    };

    const isNewEnglander = (customer: Customer) => {
      const stateCode = customer.address.state;
      return isNewEngland(stateCode);
    };

    const newEnglanders = CUSTOMERS_SAMPLE.filter(isNewEnglander);
    console.log(newEnglanders);
  }
}
