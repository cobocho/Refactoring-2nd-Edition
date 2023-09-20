// 변수 추출하기

interface OrderRecord {
  quantity: number;
  itemPrice: number;
}

const ORDER_RECORD_SAMPLE: OrderRecord = {
  quantity: 5,
  itemPrice: 1_500,
};

{
  const price = (order: OrderRecord) => {
    // 가격(price) = 기본 가격 - 수량 할인 + 배송비
    return (
      order.quantity * order.itemPrice -
      Math.max(0, order.quantity - 500) * order.itemPrice * 0.04 +
      Math.min(order.quantity * order.itemPrice * 0.1, 100)
    );
  };
}

/*
  변수를 추출한다
*/

{
  const price = (order: OrderRecord) => {
    const basePrice = order.quantity * order.itemPrice;
    const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.04;
    const shipping = Math.min(basePrice * 0.1, 100);

    return basePrice - quantityDiscount + shipping;
  };

  console.log(price(ORDER_RECORD_SAMPLE));
}

/*
  클래스 예시
*/

{
  class Order {
    _data;

    constructor(record: OrderRecord) {
      this._data = record;
    }

    get quantity() {
      return this._data.quantity;
    }

    get itemPrice() {
      return this._data.itemPrice;
    }

    get price() {
      return (
        this.quantity * this.itemPrice -
        Math.max(0, this.quantity - 500) * this.itemPrice * 0.04 +
        Math.min(this.quantity * this.itemPrice * 0.1, 100)
      );
    }
  }
}

/*
  필드 추출하기
*/

{
  class Order {
    _data;

    constructor(record: OrderRecord) {
      this._data = record;
    }

    get quantity() {
      return this._data.quantity;
    }

    get itemPrice() {
      return this._data.itemPrice;
    }

    get basePrice() {
      return this.quantity * this.itemPrice;
    }

    get quantityDiscount() {
      return Math.max(0, this.quantity - 500) * this.itemPrice * 0.04;
    }

    get shipping() {
      return Math.min(this.basePrice * 0.1, 100);
    }

    get price() {
      return this.basePrice - this.quantityDiscount + this.shipping;
    }
  }

  console.log(new Order(ORDER_RECORD_SAMPLE).price);
}
