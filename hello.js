const readline = require('readline');
const sqlite3 = require('sqlite3').verbose();

// Open or create database
const db = new sqlite3.Database('./app.db', (err) => {
	if (err) {
		console.error('Error opening database:', err.message);
	} else {
		console.log('Connected to SQLite database');
		// Create table if it doesn't exist
		db.run(`CREATE TABLE IF NOT EXISTS user_selections (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			option TEXT NOT NULL,
			timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
		)`);
	}
});

function showMenu() {	
	console.log('Current Date and Time: ' + new Date().toISOString());
	console.log('Hello World');	
	console.log('Menu Options:');
	console.log('1. Option 1');
	console.log('2. Option 2');
	console.log('3. Option 3');
	console.log('4. Option 4');
	console.log('Choose an option (1, 2, 3, or 4):');
	//const result = 1 + 1;
	//console.log(result);
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

showMenu();

rl.question('Enter your choice: ', (answer) => {
	let selectedOption = '';
	switch(answer.trim()) {
		case '1':
			selectedOption = 'Option 1';
			console.log('You selected Option 1');
			break;
		case '2':
			selectedOption = 'Option 2';
			console.log('You selected Option 2');
			break;
		case '3':
			selectedOption = 'Option 3';
			console.log('You selected Option 3');
			break;
			case '4':
				selectedOption = 'Option 4';
				console.log('You selected Option 4');
				break;
		default:
			selectedOption = 'Invalid';
			console.log('Invalid option.');
	}
	
	// Store selection in database
	db.run(`INSERT INTO user_selections (option) VALUES (?)`, [selectedOption], (err) => {
		if (err) {
			console.error('Error saving to database:', err.message);
		} else {
			console.log('Selection saved to database');
		}
	});
	
	console.log('User option pressed: ' + answer.trim());
	
	// Display all recorded selections
	db.all(`SELECT * FROM user_selections ORDER BY timestamp DESC LIMIT 5`, (err, rows) => {
		if (err) {
			console.error('Error reading database:', err.message);
		} else {
			console.log('\nRecent selections:');
			rows.forEach((row) => {
				console.log(`  ${row.option} - ${row.timestamp}`);
			});
		}
		db.close();
		rl.close();
	});
});