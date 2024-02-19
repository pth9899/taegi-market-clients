const continents = [
    {
        "_id": 1,
        "name": "東京都"
    },
    {
        "_id": 2,
        "name": "埼玉県"
    },
    {
        "_id": 3,
        "name": "千葉県"
    },
    {
        "_id": 4,
        "name": "愛知県"
    },
    {
        "_id": 5,
        "name": "沖縄県"
    },
    {
        "_id": 6,
        "name": "福岡県"
    },
    {
        "_id": 7,
        "name": "大阪府"
    },
    {
        "_id": 8,
        "name": "名古屋市"
    }
]

const prices = [
    {
        "_id": 0,
        "name": "全て",
        "array": []
    },
    {   
        "_id": 1,
        "name": "0 ~ 199円",
        "array": [0, 199]
    },
    {
        "_id": 2,
        "name": "200 ~ 249円",
        "array": [200, 249]
    },
    {
        "_id": 3,
        "name": "250 ~ 279円",
        "array": [250, 279]
    },
    {
        "_id": 4,
        "name": "280 ~ 299円",
        "array": [280, 299]
    },
    {
        "_id": 5,
        "name": "300円 以上",
        "array": [300, 1500000]
    }
]

export {
    continents,
    prices
}
