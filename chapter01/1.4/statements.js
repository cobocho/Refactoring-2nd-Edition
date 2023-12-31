export default function statement(invoice, plays) {
  return renderPlainText(invoice, plays);
}

function renderPlainText(invoice, plays) {
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  for (const perf of invoice.performances) {
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} ${perf.audience}석\n`;
  }
  result += `총액 ${usd(totalAmount())}\n`;
  result += `적립 포인트 ${totalVolumeCredits()}점\n`;

  return result;

  function totalAmount() {
    let result = 0;

    for (const perf of invoice.performances) {
      result += amountFor(perf);
    }

    return result;
  }

  function usd(number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(
      number / 100
    );
  }

  function playFor(performance) {
    return plays[performance.playID];
  }

  function amountFor(performance) {
    let result = 0;

    switch (playFor(performance).type) {
      case 'tragedy':
        result = 40000;

        if (performance.audience > 30) {
          result += 1000 * (performance.audience - 30);
        }
        break;
      case 'comedy':
        result = 30000;

        if (performance.audience > 20) {
          result += 10000 + 500 * (performance.audience - 20);
        }
        result += 300 * performance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${playFor(performance).type}`);
    }

    return result;
  }

  function volumeCreditsFor(perf) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);

    if (playFor(perf).type === 'comedy') {
      result += Math.floor(perf.audience / 5);
    }

    return result;
  }

  function totalVolumeCredits() {
    let result = 0;

    for (const perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }

    return result;
  }
}
