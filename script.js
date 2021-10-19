let createItem = (name) => {
    var itemElem = document.createElement('div');
    itemElem.className = 'item';
    itemElem.id = name;
    itemElem.setAttribute('ap-name', name);
    var itemTemplate = '<div class="item-content">' + name +
        '</div>';
    itemElem.innerHTML = itemTemplate;
    return itemElem;
}

var apSe = {
    amisulpride: [0, 1, 1, 1, 0, 0, 3, 2],
    aripiprazole: [0, 0, 1, 0, 0, 0, 0, 1],
    arsenapine: [1, 1, 1, 0, 0, 0, 1, 1],
    brexipirazole: [0, 1, 1, 0, 0, 0, 0, 0],
    cariprazine: [0, 1, 1, 0, 0, 0, 0, 0],
    chlorpromazine: [3, 2, 1, 2, 2, 3, 3, 2],
    clozapine: [3, 3, 0, 0, 3, 3, 0, 1],
    flupenthixol: [1, 2, 2, 2, 2, 1, 3, 1],
    fluphenazine: [1, 1, 2, 3, 1, 1, 3, 1],
    haloperidol: [1, 1, 3, 3, 1, 1, 2, 2],
    iloperidone: [0, 2, 1, 1, 0, 1, 0, 2],
    loxapine: [2, 1, 1, 3, 1, 2, 3, 1],
    lurasidone: [0, 1, 1, 0, 0, 0, 0, 0],
    olanzapine: [2, 3, 0, 0, 1, 1, 1, 1],
    paliperidone: [1, 2, 1, 1, 1, 2, 3, 1],
    perphenazine: [1, 1, 2, 3, 1, 1, 3, 1],
    pimozide: [1, 1, 1, 1, 1, 1, 3, 3],
    pipotiazine: [2, 2, 1, 2, 2, 2, 3, 0],
    promazine: [3, 2, 1, 1, 2, 2, 2, 0],
    quetiapine: [2, 2, 0, 0, 1, 2, 0, 2],
    risperidone: [1, 2, 1, 1, 1, 2, 3, 1],
    sertindole: [0, 1, 1, 0, 0, 3, 0, 3],
    sulpiride: [0, 1, 1, 1, 0, 0, 3, 1],
    trifluoperazine: [1, 1, 1, 3, 1, 1, 3, 0],
    ziprasidone: [1, 0, 1, 0, 0, 1, 1, 2],
    zuclopenthixol: [2, 2, 2, 2, 2, 1, 3, 0],
    //special: [3, 3, 3, 3, 3, 3, 3, 3]
};

var apScore = {};

var ap = [];
for (const [key, value] of Object.entries(apSe)) {
    ap.push(key);
    apScore[key] = 0;
}

var grid = new Muuri('.grid', {
    draggable: true,
    sortData: {
        foo: function(item, element) {
            return Math.floor(Math.random() * 10);
        },
    },
});

ap.forEach(e => { grid.add(createItem(e)); })

let se = ['Sedation',
    'Weight gain',
    'Akathisia',
    'Parkinsonism',
    'Anticholinergic',
    'Hypotension',
    'Prolactin elevation',
    'QTC prolongation'
];

function updateRanking() {
    for (const [key, value] of Object.entries(apScore)) {
        apScore[key] = seData[0] * apSe[key][0] +
            seData[1] * apSe[key][1] +
            seData[2] * apSe[key][2] +
            seData[3] * apSe[key][3] +
            seData[4] * apSe[key][4] +
            seData[5] * apSe[key][5] +
            seData[6] * apSe[key][6] +
            seData[7] * apSe[key][7];
        console.log(apScore[key]);
        apScore[key] = apScore[key] / (5 * 3 * 8);
        document.getElementById(key).innerHTML = key + ':' + apScore[key].toFixed(3);

    }
}

let scalesDOM = document.getElementById('side-effects-scales');
let seData = [];
se.forEach(e => {
    let webFriendlyText = e.toLowerCase().replace(' ', '-');
    let div = document.createElement('div');
    div.id = webFriendlyText;
    div.className = 'side-effect-scale';
    let title = document.createElement('strong');
    let text = document.createTextNode(e);
    title.className = 'side-effect-scale-title';
    let slider = document.createElement('div');
    slider.id = webFriendlyText + '-slider';
    title.appendChild(text);
    div.appendChild(title);
    div.appendChild(slider);
    scalesDOM.appendChild(div);
    let UIslider = noUiSlider.create(slider, {
        start: 3,
        default: 3,
        step: 1,
        connect: [true, false],
        range: {
            'min': 1,
            'max': 5
        }
    });
    seData.push(0);
    let index = seData.length - 1;
    UIslider.on('update', (v) => {
        seData[index] = parseFloat(v[0]);
        updateRanking();
        grid.sort(function(itemA, itemB) {
            let apA = itemA.getElement().getAttribute('ap-name');
            let apB = itemB.getElement().getAttribute('ap-name');
            let aScore = apScore[apA];
            let bScore = apScore[apB];
            return aScore - bScore;
        });
    });
});