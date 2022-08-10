// 2022.08.10
// volumeCredits 변수 제거하기 
// 이번수는 반복문을 한 바퀴 돌때마다 값을 누적하기 때문에 리팩터링하기가 더 까다롭다.
// 따라서 먼저 반목문 쪼개로 volumeCredits 값이 누적되는 부분을 따로 빼낸다.

/*
    - 반복문이 중복되는 것을 꺼리는 이들이 많지만, 이정도 중복은 성능에 미치는 여향이 미미할 떄가 많다. 
    때로는 리팩터링이 성능에 상한단 영향을 주기도한다. 
    
    - volumeCredits변수를 제거하는 작업의 단계를 아주 잘게 나눴다는 점에도 주목하자! 
    - 각 단계마다, 컴파일-테스트하고 로컬 저장소에 커밋했다.

    1. 반복문 쪼개기로 변수 값을 누적시키는 부분을 분리한다.
    2. 문자 슬라이드하기로 변수 초기화 문장을 변수 값 누적 코드 바로 앞으로 옮긴다.
    3. 함수 추출하기로 적립 포인트 계산 부분을 별도 함수로 추출한다.
    4. 변수 인라인하기로 volumeCredits 변수를 제거한다. 
*/
function statment(){
    let totalAmount = 0;
    let result = `청구 내역 (고객명 : ${invoice.customer}\n)`;
    const format = new Intl.NumberFormat("en-US",{style:"curreny",currency:"USD",minimumFractionDigits:2}).format;

    // 기존 for문을 두개로 쪼갠다. 
    for(let perf of invoice.performences){

        // 청구내역을 출력한다. 
        result += ` ${playFor(perf).name}: ${usd(playFor(perf))} (${perf.audience}석)\n`;
        totalAmount += playFor(perf);
    }

    // 이어서 문장슬라이드를 적용해서 volumeCredits 변수를 선언하는 문장을 반복문 바로 앞으로 옮긴다.
    // 변수 선언 (초기화)을 반복문 앞으로 이동  
    // volumeCredits값 갱신과 관련한 문들을 한데 모아두면 임시변수를 질의 함수로 바꾸기가 수월해진다.
    // 1.volumeCredits 값 계산 코드를 함수로 추출하는 작업부터 한다. 
    // 2.값 계산 로직을 함수로 추출
    // 3. volumeCredits를 인라인한다. 
    //let volumeCredits = totalVolumeCredits();

    // 값 누적 로직을 별도 for문으로 분리 
   // for (let perf of invoice.performences) {
    //    volumeCredits += volumeCreditsFor(perf);
   // }
    result += `총액: ${usd(totalAmount)}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점\n`;
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

// usd 포맷리턴해주는 함수 생성 
function usd(aNumber) {
    return new Intl.NumberFormat("en-US",{style:"currency", currency:"USD",maximumFractionDigits:2}).format(aNumber/100);
}

function totalVolumeCredits() {
    let volumeCredits = 0;
    for(let perf of invoice.performences){
        volumeCredits += volumeCreditsFor(perf);
    };
    return volumeCredits;
}