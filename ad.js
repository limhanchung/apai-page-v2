// Relative adverse effects of antidepressants
// Source: Maudsley Prescribing Guidelines 13th Edition
// Notes
// 0 = very low
// 1 = low
// 2 = moderate
// 3 = high incidence/severity
const adMAeList = [
    'Sedation',
    'Postural hypotension',
    'Cardiac conduction disturbance',
    'Anticholinergic effects',
    'Nausea/vomiting',
    'Sexual dysfunction'
];

const adMAe = {
    amitriptyline: [3, 3, 3, 3, 1, 3],
    clomipramine: [2, 3, 3, 2, 2, 3],
    dosulepsin: [3, 3, 3, 2, 1, 1],
    doxepin: [3, 2, 3, 3, 1, 1],
    imipramine: [2, 3, 3, 3, 1, 1],
    lofepramine: [1, 1, 1, 2, 1, 1],
    nortriptytyline: [1, 2, 2, 1, 1, , 1],
    trimipramine: [3, 3, 2, 2, 1, 1],
    agomelatine: [1, 0, 0, 0, 0, 0],
    duloxetine: [0, 0, 0, 0, 2, 2],
    levomilnacipran: [0, 0, 0, 0, 2, 2],
    mianserin: [2, 0, 0, 0, 0, 0],
    mirtazapine: [3, 1, 0, 1, 1, 0],
    reboxetine: [1, 0, 0, 1, 1, 1],
    trazodone: [3, 1, 1, 1, 1, 1],
    venlafaxine: [0, 0, 1, 0, 3, 3],
    citalopram: [0, 0, 1, 0, 3, 3],
    escitalopram: [0, 0, 1, 0, 3, 3],
    fluoxetine: [0, 0, 0, 0, 2, 3],
    fluvoxamine: [1, 0, 0, 0, 3, 3],
    paroxetine: [1, 0, 0, 1, 2, 3],
    sertraline: [0, 0, 0, 0, 2, 3],
    vilazodone: [0, 0, 0, 0, 2, 2],
    vortioxetine: [0, 1, 0, 0, 2, 1],
    isocarboxazid: [1, 2, 1, 2, 1, 1],
    phenelzine: [1, 1, 1, 1, 1, 1],
    tranylcypromine: [0, 1, 1, 1, 1, 1],
    moclobemide: [0, 0, 0, 0, 1, 1],
};

// Normalisation values to ranges between 0.0 to 1.0
const normalisationRulesForAdMAe = {
    0: [0.00, 0.10],
    1: [0.10, 0.33],
    2: [0.33, 0.67],
    3: [0.67, 1.00],
};

// Normalised antidepressant adverse effects
const nAdMAe = {};
for (const key in adMAe) {
    nAdMAe[key] = [];
    adMAe[key].forEach(e => {
        nAdMAe[key].push(normalisationRulesForAdMAe[e])
    });
};

// Relative adverse effects of antidepressants
// Source: NZ Formulary
// Notes
// 0 = -, absent or rare
// 1 = - to +, absent to low
// 2 = +, low
// 3 = ++, moderate
// 4 = +++, relatively common
// 5 = no information available
const adNZFAeList = [
    'Anticholinergic effects',
    'Sedation',
    'Orthostatic hypotension',
    'Sexual dysfunction',
    'Weight gain',
    'Insomnia',
    'GI effects',
    'QT interval prolongation'
];

const adNZFAe = {
    citalopram: [],
    escitalopram: [],
    fluoxetin: [],
    fluvoxamine: [],
    paroxetine: [],
    sertraline: [],
    amitriptyline: [],
    clomipramine: [],
    dosulepsin: [],
    doxepin: [],
    imipramine: [],
    nortriptytyline: [],
    trimipramine: [],
    maprotiline: [],
    phenelzine: [],
    tranylcypromine: [],
    moclobemide: [],
    mirtazapine: [],
    reboxetine: [],
    venlafaxine: [],
    bupropion: [],
};

// Normalisation values to ranges between 0.0 to 1.0
const normalisationRulesForAdNZFAe = {
    0: [0.00, 0.10],
    1: [0.00, 0.33],
    2: [0.00, 0.33],
    3: [0.33, 0.67],
    4: [0.67, 1.00],
    5: [0.00, 1.00]
};

// Normalised antidepressant adverse effects
const nAdNZFAe = {};
for (const key in adNZFAe) {
    nAdNZFAe[key] = [];
    adNZFAe[key].forEach(e => {
        nAdNZFAe[key].push(normalisationRulesForAdNZFAe[e])
    });
};