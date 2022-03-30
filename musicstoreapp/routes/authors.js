module.exports = function (app, MongoClient) {

    app.get("/authors", function (req, res) {
        let authors = [{
            "name":"Autor1",
            "group": "Grupo1",
            "rol": "Guitarrista"
        }, {
            "name":"Autor2",
            "group": "Grupo2",
            "rol": "Guitarrista"
        }, {
            "name":"Autor3",
            "group": "Grupo2",
            "rol": "Bajista"
        }];

        let response = {
            authors: authors
        };

        res.render("authors/authors.twig", response);
    });

    app.post('/authors/add', function(req, res){
        let response = 'Autor:';

        response += ' Nombre: '
        if(typeof req.body.name === undefined ||req.body.name === null || req.body.name.toString().trim().length == 0){
            response += 'No enviado en la petición';
        } else {
            response += req.body.name;
        }

        response += ' Grupo: '
        if(typeof req.body.group === undefined || req.body.group === null || req.body.group.toString().trim().length ==0){
            response += 'No enviado en la petición';
        } else {
            response += req.body.group;
        }

        response += ' Rol: '
        if(typeof req.body.rol != undefined || req.body.rol == null || req.body.rol.toString().trim().length ==0){
            response += 'No enviado en la petición';
        } else {
            response += req.body.rol;
        }

        res.send(response);
    });

    app.get('/authors/add', function(req, res){
        let roles = [{
            "value":"cantante",
            "text": "Cantante"
        }, {
            "value":"bateria",
            "text": "Batería"
        }, {
            "value":"guitarrista",
            "text": "Guitarrista"
        }, {
            "value":"bajista",
            "text": "Bajista"
        }, {
            "value":"teclista",
            "text": "Teclista"
        }];

        let response = {
            roles: roles
        };
        res.render("authors/add.twig", response);
    });

    app.get("/authors/*" , function (req, res) {
        res.redirect("/authors");
    });

};