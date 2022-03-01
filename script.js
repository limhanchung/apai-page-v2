import { nzApAe, nzApList, nzApEfficacy, auApAe, auApList, auApEfficacy } from './ap.js';
import { nzAdList, nzAdAe, nzAdEfficacy, auAdList, auAdAe, auAdEfficacy } from './ad.js';

function generateAeSliderElement(label, elementId) {
    return `<a class="item adverse-effect-item">
<p>${label}</p>
<div class="ui inverted blue slider adverse-effect" id="${elementId}"></div>
</a>`;
};

function generateWeightSliderElement(label, elementId) {
    return `<a class="item adverse-effect-item">
<p>${label}</p>
<div class="ui inverted blue slider weight" id="${elementId}"></div>
</a>`;
};


function generateLabelledSliderElement(elementId) {
    return `<a class="item">
<div class="ui labeled inverted blue slider adverse-effect" id="${elementId}"></div>
</a>`;
};

function generateUnlabelledSliderElement(elementId) {
    return `<a class="item">
<div class="ui inverted blue slider adverse-effect" id="${elementId}"></div>
</a>`;
};

function generateTableRow(rank, medicationName, total) {
    return `<tr>
    <td class="colRank" data-label="Rank">${rank}</td>
    <td class="colName" data-label="Medication">${medicationName}</td>
    <td class="colScore" data-label="Score">${total.toFixed(4)}</td>
</tr>`;
};

let currentDrugList = nzAdList;
let currentAe = nzAdAe;
let currentEfficacy = nzAdEfficacy;
let currentCountry = 'nz';
let lastMedicationType = 'ad';
let currentMedicationType = 'ad';
let adverseEffect = {};

let aeCertainty = 0.0;
let maximumAeCertainty = 4.0;

let defaultEfficacyWeight = 0.5;
let efficacyWeight = defaultEfficacyWeight;

let defaultAeMeanMultiplier = 1.0;
let aeMeanMultiplier = defaultAeMeanMultiplier;

let defaultAeRangeMultiplier = 0.5;
let aeRangeMulitplier = defaultAeRangeMultiplier;

let defaultEfficacyMeanMultiplier = 1.0;
let efficacyMeanMultiplier = defaultEfficacyMeanMultiplier;

let defaultEfficacyRangeMultiplier = 0.5;
let efficacyRangeMultiplier = defaultEfficacyRangeMultiplier;

function updateTable(elementId, sortedValue) {
    $('#' + elementId).empty();
    let rank = 0;
    let lastWeightedValue = 0;
    for (const k in sortedValue) {
        if (lastWeightedValue != sortedValue[k][0]) {
            rank++;
        }
        let row = generateTableRow(rank, k, sortedValue[k][0]);
        $('#' + elementId).append(row);
        lastWeightedValue = sortedValue[k][0];
    }
}

function updateRanking(names, ae, adverseEffect, aeCertaintyMultiplier, efficacy, efficacyWeight) {

    efficacyMeanMultiplier = efficacyWeight;
    aeMeanMultiplier = 1 - efficacyWeight;

    let weightedAeMean = {};
    let totalAeMean = 0;

    for (const k in adverseEffect) {
        totalAeMean += adverseEffect[k];
    }

    names.forEach(drugName => {
        weightedAeMean[drugName] = [];
        let locCounter = 0;
        let totalWeightedMean = 0;
        for (const k in adverseEffect) {
            let mean = ae[1][drugName][locCounter][0];
            weightedAeMean[drugName].push(adverseEffect[k] * mean);
            totalWeightedMean += adverseEffect[k] * mean;
            locCounter++;
        };
        weightedAeMean[drugName] = totalWeightedMean / totalAeMean;
    });

    let weightedAeRange = {};
    names.forEach(drugName => {
        weightedAeRange[drugName] = [];
        let locCounter = 0;
        let totalWeightedRange = 0;
        for (const k in adverseEffect) {
            let range = Math.abs(ae[1][drugName][locCounter][2] - ae[1][drugName][locCounter][1]);
            weightedAeRange[drugName].push(adverseEffect[k] * range);
            totalWeightedRange += adverseEffect[k] * range;
            locCounter++;
        };
        weightedAeRange[drugName] = totalWeightedRange / totalAeMean;
    });

    let totalWeightedAeMean = 0;
    for (const k in adverseEffect) {
        let mean = 1.00;
        totalWeightedAeMean += adverseEffect[k] * mean;
    }
    let hypothethicalMaximumWeightedMean = totalWeightedAeMean / totalAeMean;

    let totalWeightedAeRange = 0;
    for (const k in adverseEffect) {
        let range = 1.00 - 0.00;
        totalWeightedAeRange += adverseEffect[k] * range;
    }
    let hypothethicalMaximumWeightedAeRange = totalWeightedAeRange / totalAeMean;

    let normalisedWeightedAeMean = {};
    for (const k in weightedAeMean) {
        normalisedWeightedAeMean[k] = weightedAeMean[k] / hypothethicalMaximumWeightedMean;
    }

    let normalisedWeightedAeRange = {};
    for (const k in weightedAeRange) {
        normalisedWeightedAeRange[k] = weightedAeRange[k] / hypothethicalMaximumWeightedAeRange;
    }

    let compositeTotalValue = {};
    names.forEach(k => {
        compositeTotalValue[k] =
            efficacy[k][0] * efficacyMeanMultiplier -
            Math.abs(efficacy[k][2] -
                efficacy[k][1]) * efficacyRangeMultiplier -
            normalisedWeightedAeMean[k] * aeMeanMultiplier -
            normalisedWeightedAeRange[k] * aeRangeMulitplier;
    });


    let sortedCompositeTotalValue = Object.entries(compositeTotalValue)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({...r, [k]: v }), {});

    let sortedWeightedValue = {};
    for (const k in sortedCompositeTotalValue) {
        sortedWeightedValue[k] = [sortedCompositeTotalValue[k]];
    };

    updateTable('rankingTableBody', sortedWeightedValue);
    filter();
}

// Display
// Generating slider elements
function generateAESliderElements() {
    for (let i = 0; i < currentAe[0].length; i++) {
        let label = currentAe[0][i];
        let elementId = label.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-');
        let element = generateAeSliderElement(label, elementId);
        let start = 3;
        adverseEffect[label] = start;
        $('#adverseEffectHeader').after(element);
        $(`.ui.slider#${elementId}`)
            .slider({
                min: 0,
                max: maximumAeCertainty,
                start: start,
                step: 0,
                //smooth: true,
                onMove: (e) => {
                    adverseEffect[label] = e;
                    updateRanking(currentDrugList, currentAe, adverseEffect, aeCertainty, currentEfficacy, efficacyWeight);
                }
            });
    };
}

function clearAESliderElements() {
    adverseEffect = {};
    $('.adverse-effect-item').remove();

}
generateAESliderElements();

let efficacyLabel = 'Efficacy';
let efficacyElementId = efficacyLabel.toLowerCase().replace(' ', '-');
let efficacySliderElement = generateUnlabelledSliderElement(efficacyElementId);
let efficacySliderLabels = ['Adverse effects', 'Efficacy'];
$('#efficacyHeader').after(efficacySliderElement);
$(`.ui.slider#${efficacyElementId}`)
    .slider({
        min: 0,
        max: 1,
        start: 0.5,
        step: 0,
        onMove: (e) => {
            efficacyWeight = e;
            updateRanking(currentDrugList, currentAe, adverseEffect, aeCertainty, currentEfficacy, efficacyWeight);
        }
    });


function filter() {
    var w = $(window).width();
    // if (w < 1080) {
    //     $('.colWsmMean').hide();
    //     $('.colWsmRange').hide();
    // } else {
    //     $('.colWsmMean').show();
    //     $('.colWsmRange').show();
    // }

    // if (w < 640) {
    //     $('.colWsmComposite').hide();
    // } else {
    //     $('.colWsmComposite').show();
    // }
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
        currentAe = nzApAe;
        currentEfficacy = nzApEfficacy;
    }
    if (currentCountry == 'au' && currentMedicationType == 'ap') {
        currentDrugList = auApList;
        currentAe = auApAe;
        currentEfficacy = auApEfficacy;
    }
    if (currentCountry == 'nz' && currentMedicationType == 'ad') {
        currentDrugList = nzAdList;
        currentAe = nzAdAe;
        currentEfficacy = nzAdEfficacy;
    }
    if (currentCountry == 'au' && currentMedicationType == 'ad') {
        currentDrugList = auAdList;
        currentAe = auAdAe;
        currentEfficacy = auAdEfficacy;
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

    updateRanking(currentDrugList, currentAe, adverseEffect, aeCertainty, currentEfficacy, efficacyWeight);
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
                name: 'Antidepressants',
                value: 'ad',
                selected: true,
            },
            {
                name: 'Antipsychotics',
                value: 'ap'
            }
        ],
        onChange: function(value, text, $selectedItem) {
            currentMedicationType = value;
            update();
        }
    });


$('#country')
    .dropdown({
        values: [{
                name: 'New Zealand',
                value: 'nz',
                selected: true,
            },
            {
                name: 'Australia',
                value: 'au'
            }
        ],
        onChange: function(value, text, $selectedItem) {
            console.log(value);
            currentCountry = value;
            update();
        }
    });

chooseNz();