const jokesForm = document.querySelector('#jokesForm');
const jokesCategories = document.querySelector('#jokesCategories');
const jokeText = document.querySelector('#jokeText');


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
				.join('')
			}
		)

jokesForm.addEventListener(`submit`, e=>{
	e.preventDefault();

	let jokeType = jokesForm.querySelector(`input[name="jokesType"]:checked`).value;
	console.log(jokeType);

	let url = `https://api.chucknorris.io/jokes/`;

	switch(jokeType){
		case 'random':
			url += `random`;
			break;
		case 'categories':
			url += `random?category=${jokesCategories.querySelector(`input[name="jokeCategory"]:checked`).value}`;
			break;
		case 'search':
			url += `search?query=${jokesForm.querySelector(`#jokeText`).value}`;
	}
	
	console.log(url);

	fetch(url)
		.then(
			response => response.json()
			)
		.then(
			joke => console.log(joke)
			)

})
