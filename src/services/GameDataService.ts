export interface IKiller {
    name: string;
    title: string;
}

export interface IMap {
    realm: string;
    map: string;
}

export class GameDataService {

    static killerList: IKiller[] = [
        {
            title: 'The Trapper',
            name: 'Evan MacMillan'
        },
        {
            title: 'The Wraith',
            name: 'Philip Ojomo'
        },
        {
            title: 'The Hillbilly',
            name: 'Max Thompson Jr.'
        },
        {
            title: 'The Nurse',
            name: 'Sally Smithson'
        },
        {
            title: 'The Shape',
            name: 'Michael Myers'
        },
        {
            title: 'The Hag',
            name: 'Lisa Sherwood'
        },
        {
            title: 'The Doctor',
            name: 'Herman Carter'
        },
        {
            title: 'The Huntress',
            name: 'Anna'
        },
        {
            title: 'The Cannibal',
            name: 'Bubba Sawyer'
        },
        {
            title: 'The Nightmare',
            name: 'Freddy Krueger'
        },
        {
            title: 'The Pig',
            name: 'Amanda Young'
        },
        {
            title: 'The Clown',
            name: 'Jeffrey Hawk'
        },
        {
            title: 'The Spirit',
            name: 'Rin Yamaoka'
        },
        {
            title: 'The Legion',
            name: 'Frank, Julie, Susie, Joey'
        },
        {
            title: 'The Plague',
            name: 'Adiris'
        },
        {
            title: 'The Ghost Face',
            name: 'Danny Johnson'
        },
        {
            title: 'The Demogorgon',
            name: 'Demogorgon'
        },
        {
            title: 'The Oni',
            name: 'Kazan Yamaoka'
        },
        {
            title: 'The Deathslinger',
            name: 'Caleb Quinn'
        },
        {
            title: 'The Executioner',
            name: 'Pyramid Head'
        },
        {
            title: 'The Blight',
            name: 'Talbot Grimes'
        },
        {
            title: 'The Twins',
            name: 'Victor & Charlotte Deshayes'
        },
        {
            title: 'The Trickster',
            name: 'Ji-Woon Hak'
        },
        {
            title: 'The Nemesis',
            name: 'Nemesis T-Type'
        },
        {
            title: 'The Cenobite',
            name: 'Elliot Spencer'
        },
        {
            title: 'The Artist',
            name: 'Carmina Mora'
        },
    ]

    static survivorList: string[] = [
        "Dwight Fairfield",
        "Meg Thomas",
        "Claudette Morel",
        "Jake Park",
        "Nea Karlsson",
        "Laurie Strode",
        "Ace Victonti",
        'William "Bill" Overbeck',
        "Feng Min",
        "David King",
        "Quentin Smith",
        "Detective David Tapp",
        "Kate Denson",
        "Adam Francis",
        'Jeffrey "Jeff" Johansen',
        "Jane Romero",
        'Ash J. Williams',
        "Nancy Wheeler",
        "Steve Harrington",
        "Yui Kimura",
        "Zarina Kassir",
        "Cheryl Mason",
        "Felix Richter",
        "Élodie Rakoto",
        'Yun-Jin Lee',
        "Jill Valentil",
        "Leon Scott Kennedy",
        "Mikaela Reid",
        'Jonah Vasquez'
    ]

    static mapList: IMap[] = [
        {
            realm: 'The MacMillan Estate',
            map: 'Coal Tower'
        },
        {
            realm: 'The MacMillan Estate',
            map: 'Groaning Storehouse'
        },
        {
            realm: 'The MacMillan Estate',
            map: 'Ironworks of Misery'
        },
        {
            realm: 'The MacMillan Estate',
            map: 'Shelter Woods'
        },
        {
            realm: 'The MacMillan Estate',
            map: 'Suffocation Pit'
        },
        {
            realm: 'Autohaven Wreckers',
            map: "Azarov's Resting Place"
        },
        {
            realm: 'Autohaven Wreckers',
            map: 'Blood Lodge'
        },
        {
            realm: 'Autohaven Wreckers',
            map: 'Gas Heaven'
        },
        {
            realm: 'Autohaven Wreckers',
            map: "Wreckers' Yard"
        },
        {
            realm: 'Autohaven Wreckers',
            map: 'Wretched Shop'
        },
        {
            realm: 'Coldwind Farm',
            map: 'Fractured Cowshed'
        },
        {
            realm: 'Coldwind Farm',
            map: 'Rancid Abattoir'
        },
        {
            realm: 'Coldwind Farm',
            map: 'Rotten Fields'
        },
        {
            realm: 'Coldwind Farm',
            map: 'The Thompson House'
        },
        {
            realm: 'Coldwind Farm',
            map: 'Torment Creek'
        },
        {
            realm: 'Crotus Prenn Asylum',
            map: "Disturbed Ward"
        },
        {
            realm: 'Crotus Prenn Asylum',
            map: "Father Campbell's Chapel"
        },
        {
            realm: 'Haddonfield',
            map: 'Lampkin Lane'
        },
        {
            realm: 'Backwater Swamp',
            map: 'The Pale Rose'
        },
        {
            realm: 'Backwater Swamp',
            map: 'Grim Pantry'
        },
        {
            realm: "Léry's Memorial Institute",
            map: "Treatment Theatre"
        },
        {
            realm: "Red Forest",
            map: "Mother's Dwelling"
        },
        {
            realm: "Red Forest",
            map: "The Temple of Purgation"
        },
        {
            realm: "Springwood",
            map: 'Badham Preschool I'
        },
        {
            realm: "Springwood",
            map: 'Badham Preschool II'
        },
        {
            realm: "Springwood",
            map: 'Badham Preschool III'
        },
        {
            realm: "Springwood",
            map: 'Badham Preschool IV'
        },
        {
            realm: "Springwood",
            map: 'Badham Preschool V'
        },
        {
            realm: 'Gideon Meat Plant',
            map: 'The Game'
        },
        {
            realm: 'Yamaoka Estate',
            map: 'Family Residence'
        },
        {
            realm: 'Yamaoka Estate',
            map: 'Sanctum of Wrath'
        },
        {
            realm: 'Ormond',
            map: 'Mount Ormond Resort'
        },
        {
            realm: 'Hawkins National Laboratory',
            map: 'The Underground Complex'
        },
        {
            realm: 'Grave of Glenvale',
            map: 'Dead Dawg Saloon'
        },
        {
            realm: 'Silent Hill',
            map: 'Midwich Elementary School'
        },
        {
            realm: 'Racoon City',
            map: 'Raccoon City Police Station'
        },
        {
            realm: 'Forsaken Boneyard',
            map: 'Eyrie of Crows'
        }
    ]

    static resultList: string[] = [
        "Escaped",
        "Killed",
        "Sacrificed"
    ]

    static getKillers() {
        return this.killerList;
    }

    static getSurvivors() {
        return this.survivorList;
    }

    static getMaps() {
        return this.mapList;
    }

    static getResults() {
        return this.resultList;
    }
}