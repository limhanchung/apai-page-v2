// Function to find duplciates
function toFindDuplicates(arry) {
    const uniqueElements = new Set(arry);
    const filteredElements = arry.filter(item => {
        if (uniqueElements.has(item)) {
            uniqueElements.delete(item);
        } else {
            return item;
        }
    });

    return [...new Set(uniqueElements)]
}

let globalAdList = ['amitriptyline', 'clomipramine', 'dosulepin', 'doxepin', 'imipramine', 'lofepramine', 'nortriptytyline', 'trimipramine', 'agomelatine', 'duloxetine', 'levomilnacipran', 'mianserin', 'mirtazapine', 'reboxetine', 'trazodone', 'venlafaxine', 'citalopram', 'escitalopram', 'fluoxetine', 'fluvoxamine', 'paroxetine', 'sertraline', 'vilazodone', 'vortioxetine', 'isocarboxazid', 'phenelzine', 'tranylcypromine', 'moclobemide', 'maprotiline', 'bupropion'];

// From NZ formulary
let nzAdList = ['citalopram', 'escitalopram', 'fluoxetine', 'paroxetine', 'sertraline', 'venlafaxine', 'amitriptyline', 'clomipramine', 'dosulepin', 'imipramine', 'nortriptytyline', 'tranylcypromine', 'moclobemide', 'mirtazapine', 'reboxetine', 'bupropion', 'vortioxetine'];

// From PBS Australia
let auAdList = ['amitriptyline', 'clomipramine', 'dosulepin', 'doxepin', 'imipramine', 'nortriptyline', 'citalopram', 'escitalopram', 'fluoxetine', 'fluvoxamine', 'paroxetine', 'sertraline', 'phenelzine', 'tranylcypromine', 'moclobemide', 'desvenlafaxine', 'duloxetine', 'lithium carbonate', 'mianserin', 'mirtazapine', 'reboxetine', 'venlafaxine', 'bupropion'];

// Classes of antidepressants
// Note: NASSA is most likely TECCA
// Note: SSRI is similiar to SMS
const SSRI = ['citalopram', 'escitalopram', 'fluoxetine', 'fluvoxamine', 'paroxetine', 'sertraline'];
const SNRI = ['desvenlafaxine', 'duloxetine', 'venlafaxine', 'levomilnacipran'];
const SMS = ['vortioxetine', 'vilazodone', 'trazodon'];
const NARI = ['reboxetine'];
const TCA = ['amitriptyline', 'clomipramine', 'dosulepin', 'doxepin', 'imipramine', 'lofepramine', 'nortriptyline', 'trimipramine', 'desipramine'];
const RMAOI = ['moclobemide'];
const TECA = ['mianserin'];
const NASSA = ['mirtazapine'];
const MAOI = ['isocarboxazid', 'phenelzine', 'tranylcypromine', 'selegiline'];
const MELATONERGIC = ['agomelatine'];
const NDRI = ['bupropion'];

function expandClass(c) {
    let x = [];
    switch (c) {
        case 'SSRI':
            x = SSRI;
            break;
        case 'SNRI':
            x = SNRI;
            break;
        case 'SMS':
            x = SMS;
            break;
        case 'NARI':
            x = NARI;
            break;
        case 'TCA':
            x = TCA;
            break;
        case 'RMAOI':
            x = RMAOI;
            break;
        case 'TECA':
            x = TECA;
            break;
        case 'NASSA':
            x = NASSA;
            break;
        case 'MAOI':
            x = MAOI;
            break;
        case 'MELATONERGIC':
            x = MELATONERGIC;
            break;
        case 'NDRI':
            x = NDRI;
            break;
    }
    return x;
}
// Normalizing adverse effects
// 'Anticholinergic effects' => 'Anticholinergic effects'
// 'Sedation' => 'Sedation',
// 'Orthostatic hypotension' => 'Postural hypotension'
// 'Sexual dysfunction' => 'Sexual dysfunction'
// 'Weight gain' => 'Weight gain'
// 'Insomnia' => 'Insomnia'
// 'GI effects' => 'Nausea/vomiting'
// 'QT interval prolongation' => 'Cardiac conduction disturbance'
// Normalisation rules for list of adverse effects
// 'Sedation' => 'Sedation'
// 'Postural hypotension' => 'Postural hypotension'
// 'Cardiac conduction disturbance' => 'Cardiac conduction disturbance'
// 'Anticholinergic effects' => 'Anticholinergic effects',
// 'Nausea/vomiting' => 'Nausea/vomiting'
// 'Sexual dysfunction' => 'Sexual dysfunction'
function normaliseAe(e) {
    let x = '';
    switch (e) {
        case 'Sedation':
            x = e;
            break;
        case 'Postural hypotension':
            x = e;
            break;
        case 'Cardiac conduction disturbance':
            x = e;
            break;
        case 'Anticholinergic effects':
            x = e;
            break;
        case 'Nausea/vomiting':
            x = e;
            break;
        case 'Sexual dysfunction':
            x = e;
            break;
        case 'Anticholinergic effects':
            x = e;
            break;
        case 'Sedation':
            x = e;
            break;
        case 'Orthostatic hypotension':
            x = 'Postural hypotension';
            break;
        case 'Sexual dysfunction':
            x = e;
            break;
        case 'Weight gain':
            x = e;
            break;
        case 'Insomnia':
            x = e;
            break;
        case 'GI effects':
            x = 'Nausea/vomiting';
            break;
        case 'QT interval prolongation':
            x = 'Cardiac conduction disturbance';
            break;
    };
    return x;
}


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

const nAdMaeList = [];
adMAeList.forEach(e => {
    let x = normaliseAe(e);
    if (x != '') nAdMaeList.push(x);
});

const adMAe = {
    amitriptyline: [3, 3, 3, 3, 1, 3],
    clomipramine: [2, 3, 3, 2, 2, 3],
    dosulepin: [3, 3, 3, 2, 1, 1],
    doxepin: [3, 2, 3, 3, 1, 1],
    imipramine: [2, 3, 3, 3, 1, 1],
    lofepramine: [1, 1, 1, 2, 1, 1],
    nortriptyline: [1, 2, 2, 1, 1, , 1],
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

const nAdNZFAeList = [];
adNZFAeList.forEach(e => {
    let x = normaliseAe(e);
    if (x != '') nAdNZFAeList.push(x);
});

const adNZFAe = {
    citalopram: [0, 1, 0, 4, 1, 3, 3, 2],
    escitalopram: [0, 1, 0, 3, 1, 3, 3, 2],
    fluoxetine: [0, 0, 0, 4, 1, 3, 3, 2],
    fluvoxamine: [0, 1, 0, 4, 1, 3, 4, 1],
    paroxetine: [2, 2, 0, 4, 2, 3, 3, 1],
    sertraline: [0, 0, 0, 4, 1, 3, 4, 1],
    amitriptyline: [4, 4, 4, 3, 4, 0, 1, 4],
    clomipramine: [3, 3, 4, 4, 4, 1, 1, 4],
    dosulepin: [3, 4, 4, 3, 4, 2, 2, 4],
    doxepin: [4, 4, 3, 3, 4, 0, 0, 4],
    imipramine: [4, 3, 4, 3, 4, 2, 1, 4],
    nortriptyline: [2, 2, 3, 3, 2, 0, 0, 4],
    trimipramine: [3, 4, 4, 3, 4, 1, 0, 4],
    maprotiline: [2, 3, 2, 5, 2, 0, 0, 3],
    phenelzine: [2, 2, 2, 4, 3, 1, 2, 0],
    tranylcypromine: [2, 0, 2, 4, 2, 1, 2, 0],
    moclobemide: [0, 0, 0, 2, 0, 3, 3, 2],
    mirtazapine: [2, 4, 1, 2, 4, 2, 2, 2],
    reboxetine: [2, 1, 0, 2, 5, 4, 2, 0],
    venlafaxine: [1, 1, 0, 4, 0, 0, 3, 4, 2],
    bupropion: [0, 0, 0, 0, 0, 2, 1, 1],
};

// Normalisation values to ranges between 0.0 to 1.0
const normalisationRulesForAdNZFAe = {
    0: [0.00, 0.10],
    1: [0.00, 0.33],
    2: [0.10, 0.33],
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

// Withdrawal syndome based on classes
// Source: Choosing an antidepressant, Phillip Boyce and Cassandra Ma
// Incorporate withdrawal syndrome <https://www.nps.org.au/assets/p12-Boyce-Ma_v2.pdf>
// Source: Minimal withdawal from NDRI(bupropion)
// Notes:
// 0 = Minimal limitation
// 1 = Some limitation
// 2 = Marked limitation
// 3 = Unknown
const adWithdrawal = {
    SSRI: 1,
    SNRI: 2,
    SMS: 1,
    NARI: 0,
    TCA: 2,
    RMAOI: 0,
    TECA: 1,
    NASSA: 1,
    MAOI: 1,
    MELATONERGIC: 0,
    NDRI: 0,
    fluoxetine: 0,
};

// Expanded classes of withdrawal
const fullAdWithdrawal = {};
for (const k in adWithdrawal) {
    let expanded = expandClass(k);
    expanded.forEach(e => {
        if (!fullAdWithdrawal.hasOwnProperty(e)) {
            fullAdWithdrawal[e] = adWithdrawal[k];
        }
    });
    if (expanded.length == 0) {
        fullAdWithdrawal[k] = adWithdrawal[k];
    }
};

const normalisationRulesForAdWithdrawal = {
    0: [0.00, 0.33],
    1: [0.33, 0.67],
    2: [0.67, 1.00],
    3: [0.00, 0.00]
};

const nFullAdWithdrawal = {};
for (const key in fullAdWithdrawal) {
    nFullAdWithdrawal[key] = normalisationRulesForAdWithdrawal[fullAdWithdrawal[key]];
};

// Overdose risk
// Source: Maudsley Prescribing Guidelines 13th Edition
// Notes:
// High=less than 1 week’s supply likely to cause serious toxicity or death. 
// Moderate=1–4 weeks’ supply likely to cause serious toxicity or death.
// Low = death or serious toxicity unlikely even if more than 1 month’s supply taken.
// 0 = Low
// 1 = Moderate
// 2 = High
// * Treat probable as true
const adOverdose = {
    agomelatine: 0,
    bupropion: 1,
    duloxetine: 0,
    lofepramine: 0,
    MAOI: 2,
    mianserin: 0,
    mirtazapine: 0,
    moclobemide: 0,
    reboxetine: 0,
    SSRI: 0,
    trazodone: 0,
    TCA: 2,
    venlafaxine: 2,
    vilazodone: 0,
    vortioxetine: 1,
};

// Expanded classes for overdose
const fullAdOverdose = {}
for (const k in adOverdose) {
    let expanded = expandClass(k);
    expanded.forEach(e => {
        if (!fullAdOverdose.hasOwnProperty(e)) {
            fullAdOverdose[e] = adOverdose[k];
        }
    });
};

const normalisationRulesForAdOverdose = {
    0: [0.00, 0.33],
    1: [0.33, 0.67],
    2: [0.67, 1.00],
};

const nFullAdOverdose = {};
for (const key in fullAdOverdose) {
    nFullAdOverdose[key] = normalisationRulesForAdOverdose[fullAdOverdose[key]];
};

console.log(nFullAdOverdose);
// !!!! Important continue here

// !!! Todo: Currently doing relative efficacy
// Slightly different model
// Needs to be combined later with ae in someway
// What is milnacipran?
// !!!!
const adEfficacy = {
    amitriptyline: [2.13, 1.89, 2.41],
    mirtazapine: [1.89, 1.64, 2.20],
    duloxetine: [1.85, 1.66, 2.07],
    venlafaxine: [1.78, 1.61, 1.96],
    paroxetine: [1.75, 1.61, 1.90],
    milnacipran: [1.74, 1.37, 2.23],
    fluvoxamine: [1.69, 1, 41, 2.02],
    escitalopram: [1.68, 1.5, 1.87],
    nefazodone: [1.67, 1.32, 2.12],
    sertraline: [1.67, 1.49, 1.87],
    vortioxetine: [1.66, 1.45, 1.92],
    agomelatine: [1.65, 1.44, 1.88],
    vilazodone: [1.60, 1.28, 2],
    levomilnacipran: [1.59, 1.24, 2.05],
    bupropion: [1.58, 1.35, 1.86],
    fluoxetine: [1.52, 1.40, 1.66],
    citalopram: [1.52, 1.33, 1.74],
    trazodone: [1.51, 1.23, 1.83],
    clomipramine: [1.49, 1.21, 1.85],
    desvenlafaxine: [1.49, 1.24, 1.79],
    reboxetine: [1.37, 1.16, 1.63]
};

let maximumEfficacy = 0;
let minimumEfficacy = 9;
for (const k in adEfficacy) {
    if (k[2] > maximumEfficacy) {
        maximumEfficacy = k[2];
    }
    if (k[1] < minimumEfficacy) {
        minimumEfficacy = k[1];
    }
}
let efficacyRange = maximumEfficacy - minimumEfficacy;
const nEfficacy = {};
for (const k in adEfficacy) {
    nEfficacy[k] = [
        (adEfficacy[k][0] - minimumEfficacy) / efficacyRange,
        (adEfficacy[k][1] - minimumEfficacy) / efficacyRange,
        (adEfficacy[k][2] - minimumEfficacy) / efficacyRange,
    ]
}



// Expanded classes of withdrawal
// const fullAdWithdrawal = {};
// for (const k in adWithdrawal) {
//     let expanded = expandClass(k);
//     expanded.forEach(e => {
//         if (!fullAdWithdrawal.hasOwnProperty(e)) {
//             fullAdWithdrawal[e] = adWithdrawal[k];
//         }
//     });
//     if (expanded.length == 0) {
//         fullAdWithdrawal[k] = adWithdrawal[k];
//     }
// };

// const normalisationRulesForAdWithdrawal = {
//     0: [0.00, 0.33],
//     1: [0.33, 0.67],
//     2: [0.67, 1.00],
//     3: [0.00, 0.00]
// };

// const nFullAdWithdrawal = {};
// for (const key in fullAdWithdrawal) {
//     nFullAdWithdrawal[key] = normalisationRulesForAdWithdrawal[fullAdWithdrawal[key]];
// };
// *** /

// GenerateCountrySpecificApAeScore( array, [array, array]|[string, array]... )
// Desvenlafaxine is equivalent to venlafaxine
function generateCountrySpecificAeScore(adList) {
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
    adList.forEach(apName => {
        scoreRange[apName] = [];
        for (let i = 1; i < arguments.length; i++) {
            if (typeof arguments[i][0] == 'object') {
                if (apName in arguments[i][1]) {
                    arguments[i][1][apName].forEach(score => scoreRange[apName].push(score));
                } else if (apName == 'desvenlafaxine' && 'venlafaxine' in arguments[i][1]) {
                    arguments[i][1]['venlafaxine'].forEach(score => scoreRange[apName].push(score));
                } else {
                    for (let j = 0; j < arguments[i][0].length; j++) {
                        scoreRange[apName].push(unknown);
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

    // Locate positions of different similar adverse effects
    let countAe = {};
    for (let i = 0; i < aeList.length; i++) {
        if (!countAe.hasOwnProperty(aeList[i])) countAe[aeList[i]] = [];
        countAe[aeList[i]].push(i);
    };

    // Get first non unknown value
    let uniqueScoreRange = {};
    for (const l in scoreRange) {
        uniqueScoreRange[l] = [];
        let value = unknown;
        for (const k in countAe) {
            let indexes = countAe[k];
            for (let i = 0; i < indexes.length; i++) {
                if (scoreRange[l][indexes[i]] != unknown) {
                    value = scoreRange[l][indexes[i]];
                    break;
                }
            };
            uniqueScoreRange[l].push(value);
        }
    }
    let uniqueAeList = [...new Set(aeList)];

    return [uniqueAeList, uniqueScoreRange];
};

let nzAd = generateCountrySpecificAeScore(nzAdList, [nAdMaeList, nAdMAe], [nAdNZFAeList, nAdNZFAe], ['Overdose', nFullAdOverdose], ['Withdrawal', nFullAdWithdrawal]);
let auAd = generateCountrySpecificAeScore(auAdList, [nAdMaeList, nAdMAe], [nAdNZFAeList, nAdNZFAe], ['Overdose', nFullAdOverdose], ['Withdrawal', nFullAdWithdrawal]);


export { nzAd, nzAdList, auAd, auAdList };


// Todo: Incorporate relative efficacy <Ciprani>
// Todo: Incorporate ease of switching <https://www.nps.org.au/assets/p12-Boyce-Ma_v2.pdf>
// Todo: Include symptoms and initial antidepressant of choice <https://www.nps.org.au/assets/p12-Boyce-Ma_v2.pdf>
// Todo: Incorporate hyponatraemia  - Need to synthesize maudsley
// Todo: Incorporate bleeding  - Need to synthesize maudsley
// Todo: Incorporate diabetes - Need to synthesize maudsley\
// Todo: Incorporate hyperprolactinaemia - Need to synthesize maudsley\
// Todo: 
// Todo: Find the unknown values i.e bupropion (NDRI) withdrawal
// Todo: Fixed automatic assingment of desvenlafaxine with venlafaxine only if venlafaxine does not exist. Or in more general sense, equivalence between antidepressants