// List of available antipsychotics in different countries
const globalApList = ['amisulpride', 'aripiprazole', 'asenapine', 'brexpiprazole', 'cariprazine', 'chlorpromazine', 'clozapine', 'flupenthixol', 'fluphenazine', 'haloperidol', 'iloperidone', 'loxapine', 'lurasidone', 'olanzapine', 'paliperidone', 'perphenazine', 'pimozide', 'pipotiazine', 'promazine', 'quetiapine', 'risperidone', 'sertindole', 'sulpiride', 'trifluoperazine', 'ziprasidone', 'zuclopenthixol'];
const nzApList = ['amisulpride', 'aripiprazole', 'clozapine', 'olanzapine', 'quetiapine', 'risperidone', 'ziprasidone', 'chlorpromazine', 'haloperidol', 'periciazine', 'pimozide', 'prochlorperazine', 'trifluoperazine', 'zuclopenthixol', 'flupenthixol', 'fluphenazine'];
const auApList = ['amisulpride', 'aripiprazole', 'asenapine', 'brexpiprazole', 'chlorpromazine', 'clozapine', 'flupenthixol', 'haloperidol', 'olanzapine', 'lurasidone', 'paliperidone', 'periciazine', 'quetiapine', 'risperidone', 'ziprasidone', 'zuclopenthixol'];

// Relative adverse effects of antipsychotic drugs - a rough guide
// Source: Maudsley Prescribing Guidelines 13th Edition
// Notes
// 0 = very low
// 1 = low
// 2 = moderate
// 3 = high incidence/severity
// [ sedation, weight gain, akathisia, parkinsonism, anti cholinergic, hypotension, prolactin elevation ]
const apAeList = [
    'Sedation',
    'Weight gain',
    'Akathisia',
    'Parkinsonism',
    'Anticholinergic',
    'Hypotension',
    'Prolactin elevation',
];

const apAe = {
    amisulpride: [0, 1, 1, 1, 0, 0, 3],
    aripiprazole: [0, 0, 1, 0, 0, 0, 0],
    asenapine: [1, 1, 1, 0, 0, 0, 1],
    brexpiprazole: [0, 1, 1, 0, 0, 0, 0],
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

// Normalisation values to ranges between 0.0 to 1.0
const normalisationRulesForApAe = {
    0: [0.05, 0.00, 0.10],
    1: [0.165, 0.10, 0.33],
    2: [0.5, 0.33, 0.67],
    3: [0.835, 0.67, 1.00],
};

// Normalised antipsychotics adverse effects
const nApAe = {};
for (const key in apAe) {
    nApAe[key] = [];
    apAe[key].forEach(e => {
        nApAe[key].push(normalisationRulesForApAe[e])
    });
};

// Effects of antipsychotics on QTc
// Source: Maudsley Prescribing Guidelines 13th Edition
// Notes
// 0 = no effect
// 1 = low effect
// 2 = moderate effect
// 3 = high effect
// 4 = unknown effect
const apQtc = {
    brexpiprazole: 0,
    cariprazine: 0,
    lurasidone: 0,
    aripiprazole: 1,
    asenapine: 1,
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

const normalisationRulesForApQtc = {
    0: [0.00, 0.00, 0.00],
    1: [0.165, 0.00, 0.33],
    2: [0.5, 0.33, 0.67],
    3: [0.835, 0.67, 1.00],
    4: [0.5, 0.00, 1.00],
};

// Normalised qtc for antipsychotics
const nQtc = {};
for (const key in apQtc) {
    nQtc[key] = normalisationRulesForApQtc[apQtc[key]];
};

/* From ciprani paper */
const apEfficacy = {
    clozapine: [-0.89, -1.08, -0.71],
    amisulpride: [-0.73, -0.89, -0.58],
    zotepine: [-0.61, -0.8, -0.4],
    thiotixene: [-0.63, -0.97, -0.3],
    olanzapine: [-0.56, -0.62, -0.5],
    risperidone: [-0.55, -0.62, -0.48],
    perphenazine: [-0.56, -0.75, -0.38],
    thioridazine: [-0.54, -0.82, -0.27],
    zuclopenthixol: [-0.51, -0.75, -0.27],
    paliperidone: [-0.49, -0.59, -0.38],
    haloperidol: [-0.47, -0.53, -0.41],
    sulpiride: [-0.48, -0.87, -0.09],
    loxapine: [-0.45, -0.63, -0.26],
    chlorpromazine: [-0.44, -0.57, -0.31],
    flupenthixol: [-0.43, -0.77, -0.08],
    clopenthixol: [-0.42, -0.78, -0.06],
    molindone: [-0.42, -0.78, -0.04],
    penfluridol: [-0.39, -1.13, 0.36],
    quetiapine: [-0.42, -0.5, -0.33],
    aripiprazole: [-0.41, -0.5, -0.32],
    ziprasidone: [-0.41, -0.52, -0.3],
    sertindole: [-0.4, -0.54, -0.26],
    asenapine: [-0.39, -0.52, -0.26],
    lurasidone: [-0.36, -0.48, -0.24],
    pimozide: [-0.3, -0.75, 0.14],
    perazine: [-0.29, -0.72, 0.14],
    cariprazine: [-0.34, -0.49, -0.2],
    iloperidone: [-0.33, -0.44, -0.22],
    fluphenazine: [-0.24, -0.62, 0.13],
    trifluoperazine: [-0.24, -0.53, 0.05],
    brexpiprazole: [-0.26, -0.39, -0.12],
    levemoepromazine: [-0.03, -0.59, 0.52],
};

let maximumEfficacy = 1.0;
let minimumEfficacy = 1;
for (const k in apEfficacy) {
    if (apEfficacy[k][2] > maximumEfficacy) {
        maximumEfficacy = apEfficacy[k][2];
    }
    if (apEfficacy[k][1] < minimumEfficacy) {
        minimumEfficacy = apEfficacy[k][1];
    }
}
let efficacyRange = maximumEfficacy - minimumEfficacy;
let floorEfficacy = 0;

const nApEfficacy = {};
for (const k in apEfficacy) {
    nApEfficacy[k] = [
        apEfficacy[k][0] / efficacyRange * -1,
        apEfficacy[k][1] / efficacyRange * -1,
        apEfficacy[k][2] / efficacyRange * -1,
    ]
}


// GenerateCountrySpecificApAeScore( array, [array, array]|[string, array]... )
function generateCountrySpecificAeScore(apList) {
    const unknown = [0.5, 0.00, 1.00];
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

function generateCountrySpecificEfficacyScore(adList, efficacyData) {
    const unknown = [0.5, 0.00, 1.00];
    let efficacyList = [];
    for (let i = 1; i < arguments.length; i++) {
        if (typeof arguments[i][0] == 'object') {
            arguments[i][0].forEach(e => aeList.push(e));
        } else if (typeof arguments[i][0] == 'string') {
            aeList.push(arguments[i][0]);
        }
    };

    let efficacyScore = {};
    adList.forEach(ad => {
        if (efficacyData.hasOwnProperty(ad)) {
            efficacyScore[ad] = efficacyData[ad];
        } else {
            efficacyScore[ad] = unknown;
        }
    })

    return efficacyScore;
};

let nzApAe = generateCountrySpecificAeScore(nzApList, [apAeList, nApAe], ['QTc prolongation', nQtc]);
let nzApEfficacy = generateCountrySpecificEfficacyScore(nzApList, nApEfficacy);
let auApAe = generateCountrySpecificAeScore(auApList, [apAeList, nApAe], ['QTc prolongation', nQtc]);
let auApEfficacy = generateCountrySpecificEfficacyScore(auApList, nApEfficacy);

export { nzApAe, nzApList, nzApEfficacy, auApAe, auApList, auApEfficacy };