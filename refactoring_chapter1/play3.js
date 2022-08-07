// 2022.08.07
// 변수 인라인하기 
function statment(){
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명 : ${invoice.customer}\n)`;
    const format = new Intl.NumberFormat("en-US",{style:"curreny",currency:"USD",minimumFractionDigits:2}).format;

    for(let perf of invoice.performences){
       // const play = plays[perf.playID];
      // const play = playFor(perf);

        // 1.playFor(perf)를 인라인 해준다.
        // 2. thisAmount 를 인라인 해줌 그러므로 불필요하게됨 
       //let thisAmount = amountFor(perf);

        // swich 문을 수정한다. 
       

        // 포인트를 적립한다.
        //volumeCredits += Math.max(perf.audience - 30, 0);
        // 추출한 함수를 이용해 값을 누적한다. 
        volumeCredits += volumeCreditsFor(perf);

        // 희극 관객 5명마다 추가 포인트를 제공한다.
        // 변수 인라인 
        if("comedy" === playFor(perf)) volumeCredits += Math.floor(perf.audience/5);
        
        // 청구 내역을 출력한다.
        //playFor(perf) 변수 인라인
        // thisAmount를 playFor(perf) 인라인 시켜주면 
        result += ` ${playFor(perf).name}: ${format(playFor(perf)/100)} (${perf.audience}석)\n`;
        totalAmount += playFor(perf);
    }
    result += `총액: ${format(totalAmount/100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;
    return result;
}

// 인라인으로 변경후 매개변수에서 제거 
function amountFor(aPerformance) { 
    let result = 0 ;
    // play를  playFor(perf) 로 변경 
    switch(playFor(perf).type){
        case "tragedy":// 비극
        result = 40000;
            if(perf.audience > 30){
                result += 1000 * (aPerformance.audience - 30);
            }
            break;
        case "comedy": // 희극
        result = 30000;
            if(aPerformance.audience > 20){
                result += 10000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            //  play를  playFor(perf) 로 변경 
            throw new Error(`알 수 없는 장르: ${playFor(perf).type}`);
    }
    return result;
}

function playFor(aPerformance) {
    return plays[aPerformance.playID];
}

// volumeCreditsFor 는 반복문을 돌릴때 마다 값을 누적해야 하기때문에 살짝더 까다롭다.
function volumeCreditsFor(perf) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    if("comedy"===playFor(perf).type)
         result += Math.floor(perf.audience / 5);
    return result;
}