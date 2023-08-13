lint: 
	npx stylelint "style.css" --fix
	npx htmlhint index.html
	npx eslint --fix .