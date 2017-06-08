var React = require('react');
var PERSONS = require('./persons.json');
var PERSONS = [
  { 
    "id": 1,
    "name": "Робб Старк",
    "description": "Старший сын лорда Эддарда Старка из Винтерфелла и его жены Кейтилин Старк. У него две сестры и два брата. После смерти Эддарда Старка, он стал лордом Винтерфелла, а позже был провозглашён королём Севера.",
    "reason": "Сговор Уолдера Фрея с Тайвином Ланнистером  и Русе Болтоном.",
    "killer": "Русе Болтон",
    "weapon": "Меч"
  },
    {
    "id": 2,
    "name": "Эддард Старк",
    "description": "Бывший глава великого дома Старков из Винтерфелла. Хранитель Севера, лорд Винтерфелла.",
    "reason": "Публично признался в попытке захватить железный трон.",
    "killer": "Илин Пейн",
    "weapon": "Двуручный меч, который носит имя Лёд"
  },
  {
    "id": 3,
    "name": "Ренли Баратеон",
    "description": "Младший брат короля Роберта, сын лорда Стеффонa Баратеона и Кассаны Эстермонт. После победы в восстании Роберт передал своему брату замок Штормовой Предел, таким образом сделав Ренли верховным лордом Штормовых Земель, а также сделал его мастером над законами в своем Малом Совете.",
    "reason": "Отказ заключить мир со Станнисом",
    "killer": "Станнис Баратеон",
    "weapon": "Тень, порожденная красной жрицей Мелисандрой Асшайской"
  },
  {
    "id": 4,
    "name": "Игритт",
    "description": "Девушка-одичалая, копьеносица в отряде Гремучей Рубашки, любовница Джона Сноу — и, по понятиям одичалых, жена.",
    "reason": "Убийство Игритт отца Олли в деревне неподалеку от Чёрного замка",
    "killer": "Олли - мальчишка из деревни на Севере",
    "weapon": "Лук"
  },
  {
    "id": 5,
    "name": "Куорен Полурукий",
    "description": "Брат Ночного Дозора, командир разведчиков Сумеречной Башни и ближайший помощник сира Дениса Маллистера.",
    "reason": "Окруженный одичалыми, Куорен Полурукий ценой своей жизни помогает Джону Сноу, вступив с ним в поединок, обеспечивая ему тем самым доверие и авторитет среди них.",
    "killer": "Джон Сноу",
    "weapon": "Меч - Длинный Коготь"
  },
  {
    "id": 6,
    "name": "Джоффри Баратеон",
    "description": "Сын короля Роберта Баратеона и его жены Серсеи Ланнистер, хотя настоящим его отцом является Джейме Ланнистер. После смерти Роберта Баратеона он взошёл на трон и стал править Семью Королевствами.",
    "reason": "Жестокость Джоффри",
    "killer": "Оленна Тирелл",
    "weapon": "Отравленное вино"
  },
  {
    "id": 7,
    "name": "Бейлон Грейджой",
    "description": "Бейлон Грейджой по прозвищу Смелый — глава дома Грейджоев, верховный лорд Железных Островов.",
    "reason": "Эурон считал, что Бейлон слишком стар, его время прошло и теперь пора позволить править другим.",
    "killer": "Эурон Грейджой",
    "weapon": "Эурон столкнул брата с моста"
  },
  {
    "id": 8,
    "name": "Визерис Таргариен",
    "description": "Самопровозглашенный Визерис III, сын короля Эйриса II Таргариена и королевы Рейлы Таргариен, брат Рейгара и Дейнерис Таргариен.",
    "reason": "На пиру Визерис выпил лишнего и потребовал у Дрого воинов немедленно, иначе он вырежет из чрева Дени сына. Дрого в ответ короновал его расплавленным золотом.",
    "killer": "Кхал Дрого",
    "weapon": "Расплавленное золото"
  }
]

var PersonsEditor = React.createClass({
  getInitialState: function() {
    return {
        displayedPersons: PERSONS
    };
  },
  
  componentDidMount: function() {
    var input = this.refs.input;
    this.select = this.refs.select;
    input.oninput = this.handleSearchPerson;
  },

  handleSearchPerson: function(event) {
    var searchQuery = event.target.value.toLowerCase();
    
    function filterAllPersons(obj) {
      var validEntries = false;
      for (var key in obj) {
        var searchValue = (obj[key]+'').toLowerCase();
        if (searchValue.indexOf(searchQuery) !== -1) {
          validEntries = true;
          break;
        } 
      };
      if (validEntries == true) {
        validEntries = false;
        return true;
      }
      else {
        return false;
      }
    };
    
    var filterSelectPersons = (obj) => {
      var select = this.select.value;
      var searchValue = obj[select].toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    };
    
    if (this.select.value == 'all') {
      var displayedPersons = PERSONS.filter(filterAllPersons);
    }
    else {
      displayedPersons = PERSONS.filter(filterSelectPersons);
    }
    
    this.props.onSearchPerson(displayedPersons);
    
  },
    
  render: function() {
    return (
      <div className="person-editor">
        <div className="row">
          <div className="input-field col s4">
            <input type="text" name="tags" id="tags" placeholder="Поиск" ref="input"/>
          </div>
            <div className="input-field col s4">
              <select ref="select">
                <option value="all" selected="">Все поля</option>
                <option value="name">Имя персонажа</option>
                <option value="description">Описание персонажа</option>
                <option value="reason">Причина смерти</option>
                <option value="killer">Кем убит</option>
                <option value="weapon">Орудие убийства</option>
              </select>
            </div>
          <div className="input-field col s4">
            <button className="btn waves-effect waves-light" type="button" id="add-person">Добавить персонажа</button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PersonsEditor;