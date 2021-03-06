export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}`+ 
            `, status: ${res.status}`);
        }
        return await res.json();
    };

    getAllBooks = async () => {
        const res = await this.getResource(`/books/`);
        return res.map((book) =>this._transformBook(book));
    }

    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }

    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map((char) =>this._transformCharacter(char));
    }

    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    getAllHouses = async () => {
        const res = await this.getResource(`/houses/`);
        return res.map((house) =>this._transformHouse(house));
    }
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }

    isSet(data) {
        if (data) {
            return data
        } else {
            return 'no data :('
        }
    }
    isSetMas(data) {
        if (data[0]) {
            return data
        } else {
            return 'no data :('
        }
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter(char) {
        const id = this._extractId(char)
        const obj = {
            id: id,
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        }
        return obj
    }
    _transformHouse(house) {
        return {
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSetMas(house.words),
            titles: this.isSetMas(house.titles),
            overlord: this.isSet(house.overlord),
            ancestralWeapons: this.isSetMas(house.ancestralWeapons)
        }
    }
    _transformBook(book) {
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released),
        }
    }
}