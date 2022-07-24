var max_asks = 1000;

var results = [];

var cur_ask;
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

function rnd_range( min, max, rand ) {
    var arr = ( new Array( ++max - min ) )
    .join('.').split('.')
    .map(function( v,i ){ return min + i })
    return rand
    ? arr.map(function( v ) { return [ Math.random(), v ] })
        .sort().map(function( v ) { return v[ 1 ] })
    : arr
}



function makeBlindPairings(num_method, num_survey){
    let asks = [];
    combinations = Object.keys(num_method).flatMap(
        (v, i) => Object.keys(num_method).slice(i+1).map( w => [parseInt(v), parseInt(w)] )
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
    cur_ask = asks.pop();

    number_comps++;

    if(number_comps>=20){
        downButton.disabled = false;
    }
    compCounter.innerHTML = "Number of comparisons done: "+number_comps;

    s_name = num_survey[cur_ask[0]];
    m1 = num_method[cur_ask[1]];
    m2 = num_method[cur_ask[2]];

    // col1_text = "<span style='float:left'>"+data[s_name][m1].slice(0, 20).join("</i></small></span><br><span style='float:left'>").replace(/\'/gi, "").replace(/\"/gi, '').replace(/\=\>/gi, '</span><span style="float:right"><small style="color: grey"><i>')+"</i></small></span>";
    // col2_text = "<span style='float:left'>"+data[s_name][m2].slice(0, 20).join("</i></small></span><br><span style='float:left'>").replace(/\'/gi, "").replace(/\"/gi, '').replace(/\=\>/gi, '</span><span style="float:right"><small style="color: grey"><i>')+"</i></small></span>";
    // col1.innerHTML = col1_text;
    // col2.innerHTML = col2_text;

    function normFont(weight){
        let w = (weight/100)
        let min = 10;
        let max = 44;
        let diff = max-min;

        return(w*diff + min);

    }

    word_c_1 = []
    for(let i=0; i<20; i++){
        if(typeof data[s_name][m1][i] === 'string'){
        let d_split = data[s_name][m1][i].split("=>")
        word_c_1.push([d_split[0], normFont(parseFloat(d_split[1]))])
        }
        
    }
    word_c_2 = []
    for(let i=0; i<20; i++){
        if(typeof data[s_name][m2][i] === 'string'){
        let d_split = data[s_name][m2][i].split("=>")
        word_c_2.push([d_split[0], normFont(parseFloat(d_split[1]))])
        }
    }
    WordCloud(col1, { list: word_c_1 , weightFactor: 2.2, gridSize: (16*col1.offsetWidth)/1024, drawOutOfBound:false, rotateRatio:0.0, rotationSteps:2, fontFamily: 'Garamond, serif',color: 'random-light',
        backgroundColor: '#333'} );
    WordCloud(col2, { list: word_c_2 , weightFactor: 2.2, gridSize: (16*col2.offsetWidth)/1024, drawOutOfBound:false, rotateRatio:0.0, rotationSteps:2, fontFamily: 'Garamond, serif',color: 'random-light',
        backgroundColor: '#333'} );
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

function download(filename, text) {
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