// Statement() 함수 쪼개기 
// Statement() 처럼 긴 함수를 리팩터링 할 때는 먼저 전체 동작을 각각의 부분으로 나눌 수 있는 지점을 찾는다. 그러면 중간 즈음의 switch 문이 가장 먼저 눈에 뛸것이다.

function statment(){
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명 : ${invoice.customer}\n)`;
    const format = new Intl.NumberFormat("en-US",{style:"curreny",currency:"USD",minimumFractionDigits:2}).format;

    for(let perf of invoice.performences){
       // const play = plays[perf.playID];
       const play = playFor(perf);

        // swich 문을 수정한다. 
        // amountFor(perf, play) switch 문 들어있는 함수 
        let thisAmount = amountFor(perf, play);

        // swich 문을 수정한다. 
       

        // 포인트를 적립한다.
        volumeCredits += Math.max(perf.audience - 30, 0);
        // 희극 관객 5명마다 추가 포인트를 제공한다.
        if("comedy" === play.type) volumeCredits += Math.floor(perf.audience/5);
        
        // 청구 내역을 출력한다.
        result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience}석)\n`;
        totalAmount += thisAmount;
    }
    result += `총액: ${format(totalAmount/100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;
    return result;
}

// aPerformance 명백한 이름으로 변경 
function amountFor(aPerformance, play) { 
    let result = 0 ;
    switch(play.type){
        case "tragedy":// 비극
            thisAmount = 40000;
            if(perf.audience > 30){
                thisAmount += 1000 * (aPerformance.audience - 30);
            }
            break;
        case "comedy": // 희극
            thisAmount = 30000;
            if(aPerformance.audience > 20){
                thisAmount += 10000 + 500 * (aPerformance.audience - 20);
            }
            thisAmount += 300 * aPerformance.audience;
            break;
        default:
            throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    return result;
}

function playFor(aPerformance) {
    return plays[aPerformance.playID];
}