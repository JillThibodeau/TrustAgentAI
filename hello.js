const readline = require('readline');

function showMenu() {
	console.log('Hello World');
	console.log('Simple Menu:');
	console.log('1. Option 1');
	console.log('2. Option 2');
	console.log('3. Option 3');
	console.log('Choose an option (1, 2, or 3):');
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

showMenu();

rl.question('Enter your choice: ', (answer) => {
	switch(answer.trim()) {
		case '1':
			console.log('You selected Option 1');
			break;
		case '2':
			console.log('You selected Option 2');
			break;
		case '3':
			console.log('You selected Option 3');
			break;
		default:
			console.log('Invalid option.');
	}
	rl.close();
});