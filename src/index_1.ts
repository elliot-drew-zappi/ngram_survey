var data: Object = window.data
console.log(typeof data)
var max_asks: number = 1000;

var results: { survey: any; m1: any; m2: any; response: number; }[] = [];

var cur_ask: boolean | any[];
var number_comps = -1;
var col1 = document.getElementById('col1');
var col2 = document.getElementById('col2');

var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');
var compCounter = document.getElementById('compCounter');

var downButton = document.getElementById('down-button');

var num_method = {
    0: 'method_1',
    1: 'method_2',
    2: 'method_3',
    3: 'method_4',
    4: 'method_5',
};

var num_survey = {};

var flag = true;

Object.keys(data).forEach((k, i) => num_survey[i] = k);

function rnd_range( min: number, max: number, rand: any ) {
    var arr = ( new Array( ++max - min ) )
    .join('.').split('.')
    .map(function( v,i ){ return min + i })
    return rand
    ? arr.map(function( v ) { return [ Math.random(), v ] })
        .sort().map(function( v ) { return v[ 1 ] })
    : arr
}



function makeBlindPairings(num_method: { 0?: string; 1?: string; 2?: string; 3?: string; 4?: string; }, num_survey: {}){
    let asks: any[] = [];
    combinations = Object.keys(num_method).flatMap(
        (v: string, i: number) => Object.keys(num_method).slice(i+1).map( w => [parseInt(v), parseInt(w)] )
    );
    
    Object.keys(num_survey).forEach(k => {
    for(let i=0; i<combinations.length; i++){
        tmp = [k].concat(combinations[i]);
        asks.push(tmp)
    }
    })
    asks_shuffled = asks
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    return(asks_shuffled)
}

function updatePage(){
    if(asks.length>0){
    number_comps++;

    if(number_comps>=20){
        downButton.disabled = false;
    }
    compCounter.innerHTML = "Number of comparisons done: "+number_comps;
    cur_ask = asks.pop();
    s_name = num_survey[cur_ask[0]];
    m1 = num_method[cur_ask[1]];
    m2 = num_method[cur_ask[2]];

    col1_text = "<span style='float:left'>"+data[s_name][m1].slice(0, 20).join("</i></small></span><br><span style='float:left'>").replace(/\'/gi, "").replace(/\"/gi, '').replace(/\=\>/gi, '</span><span style="float:right"><small style="color: grey"><i>')+"</i></small></span>";
    col2_text = "<span style='float:left'>"+data[s_name][m2].slice(0, 20).join("</i></small></span><br><span style='float:left'>").replace(/\'/gi, "").replace(/\"/gi, '').replace(/\=\>/gi, '</span><span style="float:right"><small style="color: grey"><i>')+"</i></small></span>";
    col1.innerHTML = col1_text;
    col2.innerHTML = col2_text;
    
    }else{
    cur_ask = false;
    col1.innerHTML = "No more phrases!";
    col2.innerHTML = "No more phrases!";
    
    }
    
}

function choose1(){
    if(cur_ask){
        results.push({
        'survey':num_survey[cur_ask[0]],
        'm1':cur_ask[1],
        'm2':cur_ask[2],
        'response': 1,
    })
    updatePage();
    }else{
    col1.innerText = "No more phrases!";
    col2.innerText = "No more phrases!";
    
    }
};

function choose2(){
    if(cur_ask){
        results.push({
        'survey':num_survey[cur_ask[0]],
        'm1':cur_ask[1],
        'm2':cur_ask[2],
        'response': 2,
    })
    updatePage();
    }else{
    col1.innerText = "No more phrases!";
    col2.innerText = "No more phrases!";
    
    }
    
};

function choose3(){
    if(cur_ask){
        results.push({
        'survey':num_survey[cur_ask[0]],
        'm1':cur_ask[1],
        'm2':cur_ask[2],
        'response': 3,
    })
    updatePage();
    }else{
    col1.innerText = "No more phrases!";
    col2.innerText = "No more phrases!";
    }
    
};

function download(filename: string, text: string | number | boolean) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


downButton.addEventListener('click', function(){download('result.json', JSON.stringify(results))})

var asks = makeBlindPairings(num_method, num_survey, max_asks);

updatePage();

button1.addEventListener('click', choose1)
button2.addEventListener('click', choose2)
button3.addEventListener('click', choose3)
