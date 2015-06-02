all_nodes =
{
    "mas": {
        "key": "mas",
        "name": "Mas",
        "items": [{
            "name": "Martini",
            "price": 35
        }, {
            "name": "Thing",
            "price": 30
        }],
        "connected_nodes": [
            "chill",
            "capital_spirits"
        ],
        "location": {
            "x": 0.7,
            "y": 0.2
        }
    },
    "capital_spirits": {
        "key": "capital_spirits",
        "name": "Capital\nSpirits",
        "items": [{
            "name": "Martini",
            "price": 35
        }, {
            "name": "Thing",
            "price": 30
        }],
        "connected_nodes": [
            "cafe_poste"
        ],
        "location": {
            "x": 0.9,
            "y": 0.7
        }
    },
    "chill": {
        "key": "chill",
        "name": "Chill",
        "items": [{
            "name": "Martini",
            "price": 35
        }, {
            "name": "Thing",
            "price": 30
        }],
        "connected_nodes": [
            "la_bas"
        ],
        "location": {
            "x": 0.4,
            "y": 0.05
        }
    },
    "soi_bao_chao": {
        "key": "soi_bao_chao",
        "name": "Soi\nBao Chao",
        "items": [{
            "name": "Martini",
            "price": 35
        }, {
            "name": "Thing",
            "price": 30
        }],
        "connected_nodes": [
            "great_leap",
            "la_bas"
        ],
        "location": {
            "x": 0.1,
            "y": 0.1
        }
    },
    "la_bas": {
        "key": "la_bas",
        "name": "La-Bas",
        "items": [{
            "name": "Martini",
            "price": 35
        }, {
            "name": "Thing",
            "price": 30
        }],
        "connected_nodes": [],
        "location": {
            "x": 0.3,
            "y": 0.4
        }
    },
    "great_leap": {
        "key": "great_leap",
        "name": "Great\nLeap",
        "items": [{
            "name": "Martini",
            "price": 35
        }, {
            "name": "Thing",
            "price": 30
        }],
        "connected_nodes": [
            "capital_spirits"
        ],
        "location": {
            "x": 0.1,
            "y": 0.85
        }
    },
    "salud": {
        "key": "salud",
        "name": "Salud",
        "items": [{
            "name": "Martini",
            "price": 35
        }, {
            "name": "Thing",
            "price": 30
        }],
        "connected_nodes": [
            "la_bas"
            ],
        "location": {
            "x": 0.2,
            "y": 0.6
        }
    },
    "cafe_poste": {
        "key": "cafe_poste",
        "name": "Cafe\nde la Poste",
        "items": [{
            "name": "Martini",
            "price": 35
        }, {
            "name": "Thing",
            "price": 30
        }],
        "connected_nodes": [
            "salud"
        ],
        "location": {
            "x": 0.6,

            "y": 0.45
        }
    }
}
