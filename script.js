import { nzAp, nzApList, auAp, auApList } from './ap.js';
import { nzAd, nzAdList, auAd, auAdList } from './ad.js';

function generateAESliderElement(label, elementId) {
    return `<a class="item adverse-effect-item">
<p>${label}</p>
<div class="ui labeled inverted blue slider adverse-effect" id="${elementId}"></div>
</a>`;
};

function generateUnlabelledSliderElement(elementId) {
    return `<a class="item">
<div class="ui labeled inverted blue slider adverse-effect" id="${elementId}"></div>
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

let currentDrugList = nzAdList;
let currentDrug = nzAd;
let currentCountry = 'nz';
let lastMedicationType = 'ad';
let currentMedicationType = 'ad';
// let currentDrugList = nzApList;
// let currentDrug = nzAp;
// let currentCountry = 'nz';
// let lastMedicationType = 'ap';
// let currentMedicationType = 'ap';
let levelOfConcern = {};
let certainty = 0;

function updateTable(elementId, sortedValue) {
    $('#' + elementId).empty();
    let rank = 0;
    let lastWeightedValue = 0;
    for (const k in sortedValue) {
        if (lastWeightedValue != sortedValue[k][0]) {
            rank++;
        }
        let row = generateApTableRow(rank, k, sortedValue[k][0], sortedValue[k][1], sortedValue[k][2]);
        $('#' + elementId).append(row);
        lastWeightedValue = sortedValue[k][0];
    }
}

function updateRanking(drugList, drug, levelOfConcern, certainty) {
    let weightedMean = {};
    let totalMean = 0;

    for (const k in levelOfConcern) {
        totalMean += levelOfConcern[k];
    }
    drugList.forEach(drugName => {
        weightedMean[drugName] = [];
        let locCounter = 0;
        let totalWeightedMean = 0;
        for (const k in levelOfConcern) {
            let mean = (drug[1][drugName][locCounter][1] + drug[1][drugName][locCounter][0]) / 2;
            weightedMean[drugName].push(levelOfConcern[k] * mean);
            totalWeightedMean += levelOfConcern[k] * mean;
            locCounter++;
        };
        weightedMean[drugName] = totalWeightedMean / totalMean;
    });

    let weightedRange = {};
    drugList.forEach(drugName => {
        weightedRange[drugName] = [];
        let locCounter = 0;
        let totalWeightedRange = 0;
        for (const k in levelOfConcern) {
            let range = Math.abs(drug[1][drugName][locCounter][1] - drug[1][drugName][locCounter][0]);
            weightedRange[drugName].push(levelOfConcern[k] * range);
            totalWeightedRange += levelOfConcern[k] * range;
            locCounter++;
        };
        weightedRange[drugName] = totalWeightedRange / totalMean;
    });

    let totalWeightedMean = 0;
    for (const k in levelOfConcern) {
        let mean = 1.00;
        totalWeightedMean += levelOfConcern[k] * mean;
    }
    let hypothethicalMaximumWeightedMean = totalWeightedMean / totalMean;

    let totalWeightedRange = 0;
    for (const k in levelOfConcern) {
        let range = 1.00 - 0.00;
        totalWeightedRange += levelOfConcern[k] * range;
    }
    let hypothethicalMaximumWeightedRange = totalWeightedRange / totalMean;

    let normalisedWeightedMean = {};
    for (const k in weightedMean) {
        normalisedWeightedMean[k] = weightedMean[k] / hypothethicalMaximumWeightedMean;
    }

    let normalisedWeightedRange = {};
    for (const k in weightedRange) {
        normalisedWeightedRange[k] = weightedRange[k] / hypothethicalMaximumWeightedRange;
    }

    let compositeWeightedValue = {};
    for (const k in weightedMean) {
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
    for (const k in sortedCompositeWeightedValue) {
        sortedWeightedValue[k] = [sortedCompositeWeightedValue[k], normalisedWeightedMean[k], normalisedWeightedRange[k]];
    };

    updateTable('rankingTableBody', sortedWeightedValue);
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
function generateAESliderElements() {
    for (let i = 0; i < currentDrug[0].length; i++) {
        let label = currentDrug[0][i];
        let elementId = label.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-');
        let element = generateAESliderElement(label, elementId);
        let start = 3;
        levelOfConcern[label] = start;
        $('#levelOfConcernHeader').after(element);
        $(`.ui.slider#${elementId}`)
            .slider({
                min: 0,
                max: 4,
                start: start,
                step: 0,
                //smooth: true,
                onMove: (e) => {
                    levelOfConcern[label] = e;
                    updateRanking(currentDrugList, currentDrug, levelOfConcern, certainty);
                }
            });
    };
}

function clearAESliderElements() {
    levelOfConcern = {};
    $('.adverse-effect-item').remove();

}
generateAESliderElements();

let certaintyLabel = 'Certainty';
let elementId = certaintyLabel.toLowerCase().replace(' ', '-');
let certaintySliderElement = generateUnlabelledSliderElement(elementId);
let certaintySliderLabels = ['Less', 'More'];
$('#certaintyHeader').after(certaintySliderElement);
$(`.ui.slider#${elementId}`)
    .slider({
        min: 0,
        max: 4,
        start: 2,
        step: 0,
        // interpretLabel: function(value) {
        //     return certaintySliderLabels[value];
        // },
        onMove: (e) => {
            certainty = e;
            updateRanking(currentDrugList, currentDrug, levelOfConcern, certainty);
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
}

function chooseAu() {
    $('#nz').removeClass('active');
    $('#au').addClass('active');
    currentCountry = 'au';
    update();
};

function chooseNz() {
    $('#au').removeClass('active');
    $('#nz').addClass('active');
    currentCountry = 'nz';
    update();
};

function chooseAd() {
    currentMedicationType = 'ad';
}

function chooseAp() {
    currentMedicationType = 'ap';
}

function updateDrug() {
    if (currentCountry == 'nz' && currentMedicationType == 'ap') {
        currentDrugList = nzApList;
        currentDrug = nzAp;
    }
    if (currentCountry == 'au' && currentMedicationType == 'ap') {
        currentDrugList = auApList;
        currentDrug = auAp;
    }
    if (currentCountry == 'nz' && currentMedicationType == 'ad') {
        currentDrugList = nzAdList;
        currentDrug = nzAd;
    }
    if (currentCountry == 'au' && currentMedicationType == 'ad') {
        currentDrugList = auAdList;
        currentDrug = auAd;
    }
}

function update() {
    if (lastMedicationType == currentMedicationType) {
        updateDrug();
    } else {
        lastMedicationType = currentMedicationType;
        updateDrug();
        clearAESliderElements();
        generateAESliderElements();
    }

    updateRanking(currentDrugList, currentDrug, levelOfConcern, certainty);
}

$('.ui.sidebar')
    .sidebar('show')
setTimeout(resize(), 0.1);
$(window).resize(resize).trigger('resize');

$('.ui.modal')
    .modal('show');

resize();

$('#medication-type')
    .dropdown({
        values: [{
                name: 'Antidepressant ranker',
                value: 'ad',
                selected: true,
            },
            {
                name: 'Antipsychotic ranker',
                value: 'ap'
            }
        ],
        onChange: function(value, text, $selectedItem) {
            currentMedicationType = value;
            update();
        }
    });

chooseNz();

$('#nz').click(chooseNz);
$('#au').click(chooseAu);