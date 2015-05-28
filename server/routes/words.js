var mongo = require('mongodb');
var User = require('./users.js');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true}),
    db = new Db('wordsdb', server);

db.open(function(err, db) {
    if(!err){
        console.log('connected to wordsdb');
        db.collection('words', {strict: true}, function (err, collection) {
            console.log('connect to db');
            if(err){
                console.log('the wines collection doesnt exist. create it with sample data...');
                populateDB();
            }
        });
        db.collection('users', {strict: true}, function (err, collection) {
            if(err){
                console.log('the user data doesnt exist');
                populateUser();
            }
        });
    } else {
        console.log('error connecting' + err);
    }
});


exports.findAll = function(req, res){
    db.collection('words', function(err, collection){
        collection.find().toArray(function(err, items){
            res.send(items);
        })
    });
}

exports.findByName = function(req, res){
    var name = req.params.name;
    console.log('getting wine with id:'+name);

    db.collection('words', function(err, collection){
        if(err){
            console.log('Error: '+err);
            res.send({'error':'collection error'});
        } else {
            //collection.findOne({'_id':new mongo.ObjectID(id)}, function(err, item){
            collection.findOne({'name': name}, function(err, item){
                res.send(item);
            });
        }
    });
}

exports.addWord = function(req, res){
    var word = {
        name: req.body.name,
        definitions: req.body.definitions,
        examples: req.body.examples
    };
    console.log('adding word'+ JSON.stringify(word));
    db.collection('words', function(err, collection){
        collection.insert(word, {safe:true}, function(err, result){
            if(err){
                res.send({'error':'An Error occured with insertion'});
            } else {
                res.send({});
            }
        });
    });
}

//exports.updateWord = function(req, res){
//    var id = req.params.name;
//    var word = req;
//    console.log('Updating Wine: '+ name);
//    console.log(JSON.stringify(word));
//    db.collection('words', function(err, collection){
//        collection.update({'_id':new BSON.ObjectID(id)}, word, {safe:true}, function(err, result){
//            if(err){
//                console.log('Error updating wine:'+ err);
//                res.send({'error': 'an error has occured'});
//            } else {
//                console.log('' + result + ' document(s) updated');
//                res.send(result[0]);
//            }
//        });
//    });
//
//}

exports.deleteWine = function(req, res){
    var id = req.params.id;
    console.log('Deleting wine:'+ id);
    db.collection('wines', function(err, collection){
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result){
            if(err){
                res.send({'error': 'Delete Error -'+ err});
            } else {
                console.log(''+result+ ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
},

exports.localStrategy = function(username, password, done) {
    db.collection('users', function(err, collection){
        if(err){
            console.log('collection issue with the users collection'+username+password);
        } else {
            collection.findOne({ name: username }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (user.password != password) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    });

}

exports.newUser = function(req, res) {
    var name = req.body.name;
    var pass = req.body.pass;
    var user = new User({ 'name': 'Andrew', 'username': name, 'password': pass });
    user.save(function(err){
        if(!err){
            res.send('user saved');
        } else {
            res.send('user could not be saved'+ JSON.stringify(err));

        }
    });
}


var populateDB = function() {

    var words = [
        {
            name: "Orno",
            definitions: [
                {
                  'definition': 'The negative option as an alternative.',
                  'votes': 2
                },
                {
                    'definition': 'An antonym to Andyes.',
                    'votes': 1
                }
            ],
            examples: [
                {
                    'link': '',
                    'meta': {}
                }
            ]
        },
        {
            name: "Gorgeon",
            definitions: [
                {
                    'definition': 'Philosophy of eating that contains three principles: never stop, stuff face, and life is food.',
                    'votes': 4
                },
                {
                    'definition': 'Bacchus like deity, and father of Carbohydrates.',
                    'votes': 1
                }
            ],
            examples: [
                {
                    'link': '',
                    'meta': {}
                }
            ]
        }];

    db.collection('words', function(err, collection) {
        collection.insert(words, {safe:true}, function(err, result) {});
    });

};


var populateUser = function() {

    var users = [
        {
            name: "Merlandrew",
            password: "password"

        },
    ];

    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });

};

