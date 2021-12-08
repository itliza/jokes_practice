const jokesForm = document.querySelector('#jokesForm');
const jokesCategories = document.querySelector('#jokesCategories');
const jokeText = document.querySelector('#jokeText');

const jokesContainer = document.querySelector('#jokesContainer');
const jokesContainerFav = document.querySelector('#jokesContainerFav');

const InputTextDefault = 'hello';

fetch('https://api.chucknorris.io/jokes/categories')
	.then(
		response => response.json()
		)
	.then(
		categories => {
			jokesCategories.innerHTML = categories
				.map((category, index) => 
					`<li>
						<label>${category} <input type="radio" name="jokeCategory" ${!index ? `checked` : ``} value="${category}"</label>
					</li>`)
				.join(``)
			}
		)

jokesForm.addEventListener(`submit`, e=>{
	e.preventDefault();

	let jokeType = jokesForm.querySelector(`input[name="jokesType"]:checked`).value;
	// console.log(jokeType);

	let url = `https://api.chucknorris.io/jokes/`;

	switch(jokeType){
		case 'random':
			url += `random`;
			break;
		case 'categories':
			url += `random?category=${jokesCategories.querySelector(`input[name="jokeCategory"]:checked`).value}`;
			break;
		case 'search':
			let text = jokeText.value ? jokeText.value : InputTextDefault;
			url += `search?query=${text}`;
	}
	
	// console.log(url);

	fetch(url)
		.then(
			response => response.json()
			)
		.then(
			joke => joke.result ? joke.result.forEach(joke => new Joke(joke)) : new Joke(joke)
			)
})



// JOKE ❤️🤍

class Joke {
	constructor(joke){
		for(let key in joke){
			this[key] = joke[key];
		}
		console.log(this);
		this.render();
	}

	render(){

		let jokeBlock = document.createElement(`div`);
		jokeBlock.className = 'joke';


		let jokeBtnFav = document.createElement(`button`);
		jokeBtnFav.innerHTML = this.favourite ? `❤️` : `🤍`;
		jokeBtnFav.dataset.id = `j${this.id}`;
		jokeBtnFav.dataset.favourite = this.favourite ? true : false;
		
		jokeBtnFav.addEventListener(`click`, ()=>{
			
			jokeBtnFav.dataset.favourite = jokeBtnFav.dataset.favourite === 'true' ? false : true;
			this.favourite = jokeBtnFav.dataset.favourite === 'true' ? true : false;

			jokeBtnFav.innerHTML = this.favourite ? `❤️` : `🤍`;


			let storage = localStorage.getItem('favouriteJokes') ? JSON.parse(localStorage.getItem('favouriteJokes')) : [];

			if(this.favourite){
				storage.push(this);
			} else {
				let jokeIndex = storage.findIndex(joke => joke.id === this.id);
				storage.splice(jokeIndex, 1);

				let jokeBlockSearch = document.querySelector(`button[data-id="j${this.id}"]`);
				jokeBlockSearch.dataset.favourite = false;
				jokeBlockSearch.innerHTML = `🤍`;
			}
			
			localStorage.setItem('favouriteJokes', JSON.stringify(storage));
			renderFavJokes();
		})


		jokeBlock.innerHTML += `<p class="joke__text">${this.value}</p>
		${this.categories.length ? `<p class="joke__category">${this.categories[0]}</p>` : ``}`

		jokeBlock.prepend(jokeBtnFav);


		this.favourite ? jokesContainerFav.append(jokeBlock) : jokesContainer.append(jokeBlock);
	}
}

const renderFavJokes = () => {
	jokesContainerFav.innerHTML = ``;
	let storage = localStorage.getItem('favouriteJokes') ? JSON.parse(localStorage.getItem('favouriteJokes')) : [];
	storage.forEach(joke => new Joke(joke));
}

renderFavJokes();



























