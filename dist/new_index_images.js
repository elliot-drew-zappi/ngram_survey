// Page Elements
var col1 = document.getElementById('col1');
var col2 = document.getElementById('col2');

var leftButton = document.getElementById('button1');
var sameButton = document.getElementById('button2');
var rightButton = document.getElementById('button3');
var numberOfComparisonsCounter = document.getElementById('comparisonCounter');
var downloadButton = document.getElementById('down-button');


// Page Variables
var NGRAM_DATA = window.data
var NGRAM_ALGORITHMS = ['algorithm_1', 'algorithm_2', 'algorithm_3']
var questions = Object.keys(NGRAM_DATA)

var RESULTS = []
var NUMBER_OF_COMPARISONS = 0
var ALL_PAIRINGS = allRandomPairings(questions, NGRAM_ALGORITHMS)
var CURRENT_COMPARISON = ALL_PAIRINGS.pop()


// Generate Random Pairwise Combinations 
function randomlyShuffleArray(arr) {
    shuffledArr = arr.map(value => ({value, sort_by: Math.random()}))
    .sort((a, b) => a.sort_by - b.sort_by)
    .map(({ value }) => value)
    return shuffledArr
}

function randomlyPermuteCombinations(arr) {
    const combinations = arr.flatMap(
        (value, index) => arr.slice(index+1).map(val => [value, val])
    );
    const randomlyOrderedCombinations = combinations.map(arr => randomlyShuffleArray(arr))
    return randomlyOrderedCombinations
}

function allRandomPairings(questions, algorithms) {
    let allPairings = []
    for (const question of questions) {
        allPairings.push(...randomlyPermuteCombinations(algorithms).map(pairing => [question].concat(pairing)))
    }
    allPairings = randomlyShuffleArray(allPairings)
    return allPairings
}


function generateColumn(ngram_data) {
    return Object.entries(ngram_data).map(
        entry => 
        "<span style='float:left'>" + 
        entry[0] + '</span><span style="float:right"><small style="color: grey"><i>' + 
        entry[1] + "</i></small></span><br><span style='float:left'></span></i></small></span>"
    ).join('')
}

// Update Page
function updatePage(){
    if (ALL_PAIRINGS.length > 0) {
        NUMBER_OF_COMPARISONS++;

        if (NUMBER_OF_COMPARISONS > 1) {downloadButton.disabled = false}

        numberOfComparisonsCounter.innerHTML = "Number of comparisons done: " + NUMBER_OF_COMPARISONS;
        CURRENT_COMPARISON = ALL_PAIRINGS.pop();

        const question = CURRENT_COMPARISON[0]
        const leftAlgorithm = CURRENT_COMPARISON[1]
        const rightAlgorithm = CURRENT_COMPARISON[2]

        const leftData = NGRAM_DATA[question][leftAlgorithm]
        const rightData = NGRAM_DATA[question][rightAlgorithm]

        col1_text = generateColumn(leftData)
        col2_text = generateColumn(rightData)
        col1.innerHTML = col1_text;
        col2.innerHTML = col2_text;
    
    } else {
        CURRENT_COMPARISON = false;
        col1.innerHTML = "No more phrases!";
        col2.innerHTML = "No more phrases!";
    }   
}

function chooseLeft() {
    if (CURRENT_COMPARISON) {
        RESULTS.push({'comparison': CURRENT_COMPARISON, 'winner': CURRENT_COMPARISON[1]})
        updatePage();
    } else {
        col1.innerText = "No more phrases!";
        col2.innerText = "No more phrases!";
    }
}

function chooseSame() {
    if (CURRENT_COMPARISON) {
        RESULTS.push({'comparison': CURRENT_COMPARISON, 'winner': 'same'})
        updatePage();
    } else {
        col1.innerText = "No more phrases!";
        col2.innerText = "No more phrases!";
    }
}

function chooseRight() {
    if (CURRENT_COMPARISON) {
        RESULTS.push({'comparison': CURRENT_COMPARISON, 'winner': CURRENT_COMPARISON[2]})
        updatePage();
    } else {
        col1.innerText = "No more phrases!";
        col2.innerText = "No more phrases!";
    }
}

function download() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(RESULTS)));
    element.setAttribute('download', 'results.json');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


downloadButton.addEventListener('click', download)
leftButton.addEventListener('click', chooseLeft)
sameButton.addEventListener('click', chooseSame)
rightButton.addEventListener('click', chooseRight)






// function normFont(weight){
//     let w = (weight/100)
//     let min = 10;
//     let max = 44;
//     let diff = max-min;

//     return(w*diff + min);

// }

// word_c_1 = []
// for(let i=0; i<20; i++){
//     if(typeof data[s_name][m1][i] === 'string'){
//     let d_split = data[s_name][m1][i].split("=>")
//     word_c_1.push([d_split[0], normFont(parseFloat(d_split[1]))])
//     }
    
// }
// word_c_2 = []
// for(let i=0; i<20; i++){
//     if(typeof data[s_name][m2][i] === 'string'){
//     let d_split = data[s_name][m2][i].split("=>")
//     word_c_2.push([d_split[0], normFont(parseFloat(d_split[1]))])
//     }
// }
// WordCloud(col1, { list: word_c_1 , weightFactor: 2.2, gridSize: (16*col1.offsetWidth)/1024, drawOutOfBound:false, rotateRatio:0.0, rotationSteps:2, fontFamily: 'Garamond, serif',color: 'random-light',
//     backgroundColor: '#333'} );
// WordCloud(col2, { list: word_c_2 , weightFactor: 2.2, gridSize: (16*col2.offsetWidth)/1024, drawOutOfBound:false, rotateRatio:0.0, rotationSteps:2, fontFamily: 'Garamond, serif',color: 'random-light',
//     backgroundColor: '#333'} );