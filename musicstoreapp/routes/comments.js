const {ObjectId} = require("mongodb");
module.exports = function (app, commentsRepository) {

    app.post("/comments/add/:songId", function (req, res) {
        if(req.body.text === 'undefined' || req.body.text.toString().trim().length == 0){
            res.send("Error al insertar el comentario: texto vacío.")
        }

        let comment = {
            author: req.session.user,
            text: req.body.text,
            song_id: ObjectId(req.params.songId)
        }

        commentsRepository.insertComment(comment, function(commentId){
            if(commentId==null){
                res.send("Error al insertar");
            } else {
                    res.send("Agregado el comentario con ID: " + commentId)
            }
        });
    });

}