module.exports = function (app) {

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
        if(req.body.name != null && typeof req.body.name != undefined && req.body.name.trim().length !=0){
            response += req.body.name;
        } else {
            response += 'No enviado en la petición';
        }

        response += ' Grupo: '
        if(req.body.group != null && typeof req.body.group != undefined && req.body.group.trim().length !=0){
            response += req.body.group;
        } else {
            response += 'No enviado en la petición';
        }

        response += ' Rol: '
        if(req.body.rol != null && typeof req.body.rol != undefined && req.body.rol.trim().length !=0){
            response += req.body.rol;
        } else {
            response += 'No enviado en la petición';
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