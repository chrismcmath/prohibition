all_nodes =
{
    "mas": {
        "key": "mas",
        "name": "Mas",
        "items": [{
            "name": "Pink Lemonade",
            "price": 45
        }, {
            "name": "Rosado",
            "price": 50
        }, {
            "name": "Tomas Collins",
            "price": 45 
        }],
        "connected_nodes": [
            "chill",
            "capital_spirits",
            "la_bas"
        ],
        "location": {
            "x": 0.6,
            "y": 0.4
        }
    },
    "capital_spirits": {
        "key": "capital_spirits",
        "name": "Capital\nSpirits",
        "items": [{
            "name": "Bai-curious",
            "price": 40
        }, {
            "name": "Xinjiang Dark Beer",
            "price": 30
        }, {
            "name": "2x Infusion Shots",
            "price": 20
        }],
        "connected_nodes": [
            "cafe_poste",
            "la_bas"
        ],
        "location": {
            "x": 0.9,
            "y": 0.8
        }
    },
    "chill": {
        "key": "chill",
        "name": "Chill",
        "items": [{
            "name": "Shooter",
            "price": 10
        }, {
            "name": "Mojito",
            "price": 45
        }, {
            "name": "Chill",
            "price": 45
        }],
        "connected_nodes": [
            "cafe_poste",
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
            "name": "Mojito",
            "price": 30
        }, {
            "name": "Cosmopolitan",
            "price": 40
        }, {
            "name": "Singapore Sling",
            "price": 50
        }],
        "connected_nodes": [
            "capital_spirits",
            "la_bas"
        ],
        "location": {
            "x": 0.1,
            "y": 0.2
        }
    },
    "la_bas": {
        "key": "la_bas",
        "name": "La-Bas",
        "items": [{
            "name": "White Wine Spritzer",
            "price": 35
        },{
            "name": "White Russian",
            "price": 45
        },{
            "name": "Whiskey Sour",
            "price": 45
        }],
        "connected_nodes": [],
        "location": {
            "x": 0.3,
            "y": 0.7
        }
    },
    "cafe_poste": {
        "key": "cafe_poste",
        "name": "Cafe\nde la Poste",
        "items": [{
            "name": "Martini",
            "price": 35
        },{
            "name": "Thing",
            "price": 30
        },{
            "name": "Thing",
            "price": 30
        }],
        "connected_nodes": [
        ],
        "location": {
            "x": 0.7,

            "y": 0.1
        }
    }
}
