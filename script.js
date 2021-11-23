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
    1: [0.00, 0.33],
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
const ausApList = ['amisulpride', 'aripiprazole', 'arsenapine', 'brexipirazole', 'chlorpromazine', 'clozapine', 'flupenthixol', 'haloperidol', 'olanzapine', 'lurasidone', 'paliperidone', 'periciazine', 'quetiapine', 'risperidone', 'ziprasidone', 'zuclopenthixol'];

// GenerateCountrySpecificApAeScore( array, [array, array]|[string, array]... )
function generateCountrySpecificApAeScore(apList) {
    const unknown = [0.00, 1.00];
    let apAeList = [];
    for (let i = 1; i < arguments.length; i++) {
        if (typeof arguments[i][0] == 'object') {
            arguments[i][0].forEach(e => apAeList.push(e));
        } else if (typeof arguments[i][0] == 'string') {
            apAeList.push(arguments[i][0]);
        }
    };

    let apScoreRange = {};
    apList.forEach(apName => {
        apScoreRange[apName] = [];
        for (let i = 1; i < arguments.length; i++) {
            if (typeof arguments[i][0] == 'object') {
                if (apName in arguments[i][1]) {
                    arguments[i][1][apName].forEach(score => apScoreRange[apName].push(score));
                } else {
                    for (let j = 0; j < arguments[i][0].length; j++) {
                        apScoreRange[apName].push(unknown)
                    }
                }
            } else if (typeof arguments[i][0] == 'string') {
                if (apName in arguments[i][1]) {
                    apScoreRange[apName].push(arguments[i][1][apName]);
                } else {
                    apScoreRange[apName].push(unknown);
                }
            }
        };
    })

    return [apAeList, apScoreRange]
};

let nzAp = generateCountrySpecificApAeScore(nzApList, [aeList, nAe], ['QTc prolongation', nQtc])

function generateRangeElement(label) {
    return `
        <li class='nav-item'>
            <label for='sedation' class='form-label'>${label}</label>
            <input type='range' class='form-range' min='0' max='4' step='1' id='sedationRange'>
            <div class="track">
            <div class="track-inner"></div>
          </div>
          <div class="thumb"></div>
        </li>`;
};

for (let i = 0; i < nzAp[0].length; i++) {
    let label = nzAp[0][i];
    let rangeId = label.toLowerCase().replace(' ', '-');
    let rangeElement = generateRangeElement(nzAp[0][i], rangeId);
    document.getElementById('scalesContainer').insertAdjacentHTML('beforeend', rangeElement);
};