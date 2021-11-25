// Relative adverse effects of antipsychotic drugs - a rough guide
// Source: Maudsley Prescribing Guidelines 13th Edition
// Notes
// 0 = very low
// 1 = low
// 2 = moderate
// 3 = high incidence/severity
// [ sedation, weight gain, akathisia, parkinsonism, anti cholinergic, hypotension, prolactin elevation ]

const aeList = [
    'Sedation',
    'Weight gain',
    'Akathisia',
    'Parkinsonism',
    'Anticholinergic',
    'Hypotension',
    'Prolactin elevation',
];

const ae = {
    amisulpride: [0, 1, 1, 1, 0, 0, 3],
    aripiprazole: [0, 0, 1, 0, 0, 0, 0],
    arsenapine: [1, 1, 1, 0, 0, 0, 1],
    brexipirazole: [0, 1, 1, 0, 0, 0, 0],
    cariprazine: [0, 1, 1, 0, 0, 0, 0],
    chlorpromazine: [3, 2, 1, 2, 2, 3, 3],
    clozapine: [3, 3, 0, 0, 3, 3, 0],
    flupenthixol: [1, 2, 2, 2, 2, 1, 3],
    fluphenazine: [1, 1, 2, 3, 1, 1, 3],
    haloperidol: [1, 1, 3, 3, 1, 1, 2],
    iloperidone: [0, 2, 1, 1, 0, 1, 0],
    loxapine: [2, 1, 1, 3, 1, 2, 3],
    lurasidone: [1, 0, 1, 1, 0, 0, 0],
    olanzapine: [2, 3, 0, 0, 1, 1, 1],
    paliperidone: [1, 2, 1, 1, 1, 2, 3],
    perphenazine: [1, 1, 2, 3, 1, 1, 3],
    pimozide: [1, 1, 1, 1, 1, 1, 3],
    pipotiazine: [2, 2, 1, 2, 2, 2, 3],
    promazine: [3, 2, 1, 1, 2, 2, 2],
    quetiapine: [2, 2, 0, 0, 1, 2, 0],
    risperidone: [1, 2, 1, 1, 1, 2, 3],
    sertindole: [0, 1, 1, 0, 0, 3, 0],
    sulpiride: [0, 1, 1, 1, 0, 0, 3],
    trifluoperazine: [1, 1, 1, 3, 1, 1, 3],
    ziprasidone: [1, 0, 1, 0, 0, 1, 1],
    zuclopenthixol: [2, 2, 2, 2, 2, 1, 3],
};

// Effects of antipsychotics on QTc
// Source: Maudsley Prescribing Guidelines 13th Edition
// Notes
// 0 = no effect
// 1 = low effect
// 2 = moderate effect
// 3 = high effect
// 4 = unknown effect

const qtc = {
    brexipirazole: 0,
    cariprazine: 0,
    lurasidone: 0,
    aripiprazole: 1,
    arsenapine: 1,
    clozapine: 1,
    flupenthixol: 1,
    fluphenazine: 1,
    loxapine: 1,
    perphenazine: 1,
    prochlorperazine: 1,
    olanzapine: 1,
    paliperidone: 1,
    risperidone: 1,
    sulpride: 1,
    amisulpride: 2,
    chlorpromazine: 2,
    haloperidol: 2,
    iloperidone: 2,
    levomepromazine: 2,
    melperone: 2,
    quetiapine: 2,
    ziprasidone: 2,
    anyIntravenousAntipsychotic: 3,
    pimozide: 3,
    sertindole: 3,
    anyDrugUsedInDosesExceedingRecommendedMaximum: 3,
    pipotiazine: 4,
    trifluoperazine: 4,
    zuclopenthixol: 4,
};

// Normalisation values to ranges between 0.0 to 1.0
const normalisationRulesForAe = {
    0: [0.00, 0.10],
    1: [0.10, 0.33],
    2: [0.33, 0.67],
    3: [0.67, 1.00],
};

const normalisationRulesForQtc = {
    0: [0.00, 0.00],
    1: [0.00, 0.33],
    2: [0.33, 0.67],
    3: [0.67, 1.00],
    4: [0.00, 1.00],
};

// Normalised adverse effects
const nAe = {};
for (const key in ae) {
    nAe[key] = [];
    ae[key].forEach(e => {
        nAe[key].push(normalisationRulesForAe[e])
    });
};

// Normalised qtc
const nQtc = {};
for (const key in qtc) {
    nQtc[key] = normalisationRulesForQtc[qtc[key]];
};

// List of available antipsychotics in different countries
const globalApList = ['amisulpride', 'aripiprazole', 'arsenapine', 'brexipirazole', 'cariprazine', 'chlorpromazine', 'clozapine', 'flupenthixol', 'fluphenazine', 'haloperidol', 'iloperidone', 'loxapine', 'lurasidone', 'olanzapine', 'paliperidone', 'perphenazine', 'pimozide', 'pipotiazine', 'promazine', 'quetiapine', 'risperidone', 'sertindole', 'sulpiride', 'trifluoperazine', 'ziprasidone', 'zuclopenthixol'];
const nzApList = ['amisulpride', 'aripiprazole', 'clozapine', 'olanzapine', 'quetiapine', 'risperidone', 'ziprasidone', 'chlorpromazine', 'haloperidol', 'periciazine', 'pimozide', 'prochlorperazine', 'trifluoperazine', 'zuclopenthixol', 'flupenthixol', 'fluphenazine'];
const auApList = ['amisulpride', 'aripiprazole', 'arsenapine', 'brexipirazole', 'chlorpromazine', 'clozapine', 'flupenthixol', 'haloperidol', 'olanzapine', 'lurasidone', 'paliperidone', 'periciazine', 'quetiapine', 'risperidone', 'ziprasidone', 'zuclopenthixol'];

// GenerateCountrySpecificApAeScore( array, [array, array]|[string, array]... )
function generateCountrySpecificAeScore(apList) {
    const unknown = [0.00, 1.00];
    let aeList = [];
    for (let i = 1; i < arguments.length; i++) {
        if (typeof arguments[i][0] == 'object') {
            arguments[i][0].forEach(e => aeList.push(e));
        } else if (typeof arguments[i][0] == 'string') {
            aeList.push(arguments[i][0]);
        }
    };

    let scoreRange = {};
    apList.forEach(apName => {
        scoreRange[apName] = [];
        for (let i = 1; i < arguments.length; i++) {
            if (typeof arguments[i][0] == 'object') {
                if (apName in arguments[i][1]) {
                    arguments[i][1][apName].forEach(score => scoreRange[apName].push(score));
                } else {
                    for (let j = 0; j < arguments[i][0].length; j++) {
                        scoreRange[apName].push(unknown)
                    }
                }
            } else if (typeof arguments[i][0] == 'string') {
                if (apName in arguments[i][1]) {
                    scoreRange[apName].push(arguments[i][1][apName]);
                } else {
                    scoreRange[apName].push(unknown);
                }
            }
        };
    })

    return [aeList, scoreRange]
};

let nzAp = generateCountrySpecificAeScore(nzApList, [aeList, nAe], ['QTc prolongation', nQtc]);
let auAp = generateCountrySpecificAeScore(auApList, [aeList, nAe], ['QTc prolongation', nQtc]);

function generateSliderElement(label, elementId) {
    return `<a class="item">
<p>${label}</p>
<div class="ui labeled inverted blue slider adverseEffect" id="${elementId}"></div>
</a>`;
};

function generateUnlabelledSliderElement(elementId) {
    return `<a class="item">
<div class="ui labeled inverted blue slider adverseEffect" id="${elementId}"></div>
</a>`;
};

function generateApTableRow(rank, apName, mean, range, composite) {
    return `<tr>
    <td class="colRank" data-label="Rank">${rank}</td>
    <td class="colName" data-label="Antipsychotic">${apName}</td>
    <td class="colWsmComposite" data-label="WSM(Composite)">${mean.toFixed(4)}</td>
    <td class="colWsmMean" data-label="WSM(Mean)">${range.toFixed(4)}</td>
    <td class="colWsmRange" data-label="WSM(Range)">${composite.toFixed(4)}</td>
</tr>`;
};

let currentDrugList = nzApList;
let currentDrug = nzAp;
let levelOfConcern = {};
let certainty = 0;

function updateApTable(elementId, sortedValue) {
    $('#' + elementId).empty();
    let rank = 0;
    let lastWeightedValue = 0;
    for (k in sortedValue) {
        if (lastWeightedValue != sortedValue[k][0]) {
            rank++;
        }
        let row = generateApTableRow(rank, k, sortedValue[k][0], sortedValue[k][1], sortedValue[k][2]);
        $('#' + elementId).append(row);
        lastWeightedValue = sortedValue[k][0];
    }
}

function update(drugList, drug, levelOfConcern, certainty) {
    let weightedMean = {};
    let totalMean = 0;
    for (k in levelOfConcern) {
        totalMean += levelOfConcern[k];
    }
    drugList.forEach(apName => {
        weightedMean[apName] = [];
        let locCounter = 0;
        let totalWeightedMean = 0;
        for (k in levelOfConcern) {
            let mean = (drug[1][apName][locCounter][1] + drug[1][apName][locCounter][0]) / 2;
            weightedMean[apName].push(levelOfConcern[k] * mean);
            totalWeightedMean += levelOfConcern[k] * mean;
            locCounter++;
        };
        weightedMean[apName] = totalWeightedMean / totalMean;
    });

    let weightedRange = {};
    drugList.forEach(drugName => {
        weightedRange[drugName] = [];
        let locCounter = 0;
        let totalWeightedRange = 0;
        for (k in levelOfConcern) {
            let range = Math.abs(drug[1][drugName][locCounter][1] - drug[1][drugName][locCounter][0]);
            weightedRange[drugName].push(levelOfConcern[k] * range);
            totalWeightedRange += levelOfConcern[k] * range;
            locCounter++;
        };
        weightedRange[drugName] = totalWeightedRange / totalMean;
    });

    let totalWeightedMean = 0;
    for (k in levelOfConcern) {
        let mean = 1.00;
        totalWeightedMean += levelOfConcern[k] * mean;
    }
    let hypothethicalMaximumWeightedMean = totalWeightedMean / totalMean;

    let totalWeightedRange = 0;
    for (k in levelOfConcern) {
        let range = 1.00 - 0.00;
        totalWeightedRange += levelOfConcern[k] * range;
    }
    let hypothethicalMaximumWeightedRange = totalWeightedRange / totalMean;

    let normalisedWeightedMean = {};
    for (k in weightedMean) {
        normalisedWeightedMean[k] = weightedMean[k] / hypothethicalMaximumWeightedMean;
    }

    let normalisedWeightedRange = {};
    for (k in weightedRange) {
        normalisedWeightedRange[k] = weightedRange[k] / hypothethicalMaximumWeightedRange;
    }

    let compositeWeightedValue = {};
    for (k in weightedMean) {
        compositeWeightedValue[k] = normalisedWeightedMean[k] * (1 - certainty) + normalisedWeightedRange[k] * certainty;
    }

    let sortedCompositeWeightedValue = Object.entries(compositeWeightedValue)
        .sort(([, a], [, b]) => a - b)
        .reduce((r, [k, v]) => ({...r, [k]: v }), {});


    // console.log('Max weighted mean', hypothethicalMaximumWeightedMean);
    // console.log('Max weighted range', hypothethicalMaximumWeightedRange);
    // console.log('Weighted mean', weightedMean);
    // console.log('Weighted range', weightedRange);
    // console.log('Normalised weighted mean', normalisedWeightedMean);
    // console.log('Normalised weighted range', normalisedWeightedRange);
    // console.log('Composite weighted value', compositeWeightedValue);
    // console.log('Sorted composite weighted value', sortedCompositeWeightedValue);

    let sortedWeightedValue = {};
    for (k in sortedCompositeWeightedValue) {
        sortedWeightedValue[k] = [sortedCompositeWeightedValue[k], normalisedWeightedMean[k], normalisedWeightedRange[k]];
    };

    updateApTable('rankingTableBody', sortedWeightedValue);
    // $('#rankingTableBody').empty();
    // let rank = 0;
    // let lastWeightedValue = 0;
    // for (k in sortedCompositeWeightedValue) {
    //     if (lastWeightedValue != allWeightedValue[k][2]) {
    //         rank++;
    //     }
    //     let row = generateApTableRow(rank, k, allWeightedValue[k][2], allWeightedValue[k][0], allWeightedValue[k][1]);
    //     $('#rankingTableBody').append(row);
    //     lastWeightedValue = allWeightedValue[k][2];
    // }
    filter();

}


// Display
// Generating slider elements
for (let i = 0; i < nzAp[0].length; i++) {
    let label = nzAp[0][i];
    let elementId = label.toLowerCase().replace(' ', '-');
    let element = generateSliderElement(label, elementId);
    let start = 3;
    levelOfConcern[label] = start;
    $('#levelOfConcernHeader').after(element);
    $(`.ui.slider#${elementId}`)
        .slider({
            min: 1,
            max: 5,
            start: start,
            step: 0,
            //smooth: true,
            onMove: (e) => {
                levelOfConcern[label] = e;
                update(currentDrugList, currentDrug, levelOfConcern, certainty);
            }
        });
};
let certaintyLabel = 'Certainty required';
let elementId = certaintyLabel.toLowerCase().replace(' ', '-');
let certaintySliderElement = generateUnlabelledSliderElement(elementId);
let certaintySliderLabels = ['Less', 'More'];
$('#certaintyHeader').after(certaintySliderElement);
$(`.ui.slider#${elementId}`)
    .slider({
        min: 0,
        max: 1,
        start: 0.5,
        step: 0,
        interpretLabel: function(value) {
            return certaintySliderLabels[value];
        },
        onMove: (e) => {
            certainty = e;
            update(currentDrugList, currentDrug, levelOfConcern, certainty);
        }
    });

function filter() {
    var w = $(window).width();
    if (w < 1080) {
        $('.colWsmMean').hide();
        $('.colWsmRange').hide();
    } else {
        $('.colWsmMean').show();
        $('.colWsmRange').show();
    }

    if (w < 640) {
        $('.colWsmComposite').hide();
    } else {
        $('.colWsmComposite').show();
    }
};

function resize() {
    var w = $(window).width();
    let sb = $('.ui.sidebar').width();
    $('#dataDisplay').width(w - sb - 30);
    filter();
    //$('#dataDisplay').css('padding-right', sb + 30 + 'px');
}

function chooseAu() {
    $('#nz').removeClass('active');
    $('#au').addClass('active');
    currentDrugList = auApList;
    currentDrug = auAp;
    update(currentDrugList, currentDrug, levelOfConcern, certainty);
};

function chooseNz() {
    $('#au').removeClass('active');
    $('#nz').addClass('active');
    currentDrugList = nzApList;
    currentDrug = nzAp;
    update(currentDrugList, currentDrug, levelOfConcern, certainty);
};

$('.ui.sidebar')
    .sidebar('show')
setTimeout(resize(), 0.1);
$(window).resize(resize).trigger('resize');
$('#au').click(chooseAu);
$('#nz').click(chooseNz);

$('.ui.modal')
    .modal('show');

chooseNz();
resize();