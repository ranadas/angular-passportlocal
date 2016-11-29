A MEAN stack application.
expects mongo running @ localhost.
Inspired by : http://mherman.org/blog/2015/01/31/local-authentication-with-passport-and-express-4
also read: https://blog.risingstack.com/node-hero-node-js-authentication-passport-js/

1. npm install -g express-generator@4
2. express passport-local-express4
3. copy back the file to current 
4. npm install
5. to run : node ./bin/www and go to localhost:3000
6.  npm install chai mocha should --save
    npm install mongoose passport passport-local passport-local-mongoose  --save
    npm install connect-flash express-session  --save
7. http://html2jade.org/
8.  npm install nodemon --save-dev
    node_modules\.bin\nodemon.cmd .\bin\www

	npm run dev
9. Add passport & mongo/mongoose
	[https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications]
	* add require mongoose passport, and local strategy
		var mongoose = require('mongoose');
		var passport = require('passport');
		var LocalStrategy = require('passport-local').Strategy;
		
	* add session handling and passport initialise
		app.use(require('express-session')({
				secret: 'keyboard cat',
				resave: false,
				saveUninitialized: false
		}));
		app.use(passport.initialize());
		app.use(passport.session());
	
	* configure passport and add serialiser 
		var Account = require('./models/account');
		passport.use(new LocalStrategy(Account.authenticate()));
		passport.serializeUser(Account.serializeUser());
		passport.deserializeUser(Account.deserializeUser());

	* mongoose
		mongoose.connect('mongodb://localhost/passport_local_mongoose_express4');

	* add account.js as required.	
		const mongoose = require('mongoose');
		const Schema = mongoose.Schema;
		const passportLocalMongoose = require('passport-local-mongoose');

		const Account = new Schema({
			username: String,
			password: String
		});

		Account.plugin(passportLocalMongoose);

		module.exports = mongoose.model('accounts', Account);
	
	* Use Account in services to register , authenticate etc.
10. Using wonderful promise library  : Bluebird. http://stackoverflow.com/questions/6180896/how-to-return-mongoose-results-from-the-find-method
11. http://stackoverflow.com/questions/7419969/how-do-i-define-methods-in-a-mongoose-model
12. add the text in text folder. and run 
	npm test 	

13. add a test file in test foler. 


TODO : CONVERT THIS TO TYPESCRIPT http://brianflove.com/2016/03/29/typescript-express-node-js/

https://www.sitepoint.com/user-authentication-mean-stack/
https://github.com/sitepoint-editors/MEAN-stack-authentication