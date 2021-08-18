"use strict";
var db = require('../../server/db/database')
const router = require("express").Router();

router.get('/', async(req, res) => {
    var sql = "select * from cakes"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
})

router.post("/", async(req, res) => {
    var errors=[]
    const {body} = req
    if (!body.id){
        errors.push("Cake ID is required");
    }
    if (!body.name){
        errors.push("Cake Name is required");
    }
    if (body.name && body.name.length > 30){
        errors.push("Cake Name should not be longer than 30 characters");
    }
    if (!body.comment){
        errors.push("Comment is required");
    }
    if (body.comment && body.comment.length > 200){
        errors.push("Comment should not be longer than 200 characters");
    }
    if (!body.url){
        errors.push("Image URL is required");
    }
    if (!body.yumfactor){
        errors.push("Yum Factor is required");
    }
    if (body.yumfactor && (body.yumfactor < 1 || body.yumfactor > 5)){
        errors.push("Yum Factor should be between (1-5)");
    }
   
    if (errors.length){
        res.status(400).json({ error: errors.join(",") });
        return;
    }
    var sql ='INSERT INTO cakes (id, name, comment, url, yumfactor) VALUES (?,?,?,?,?)'
    var params =[body.id, body.name, body.comment, body.url, body.yumfactor]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        if (this.lastID) {
            db.all('select * from cakes', [], (err, rows) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                res.json({
                    "message": "Cake Created",
                    "data": rows
                })
            });
        }
    });
})

router.put("/:id", async(req, res) => {
    var errors=[]
    const idToEdit = req.params.id

    const {body} = req
    if (!idToEdit){
        res.status(400).json({ error: true, msg: "Invalid Request" });
        return;
    }
    if (!body.name){
        errors.push("Cake Name is required");
    }
    if (body.name && body.name.length > 30){
        errors.push("Cake Name should not be longer than 30 characters");
    }
    if (!body.comment){
        errors.push("Comment is required");
    }
    if (body.comment && body.comment.length > 200){
        errors.push("Comment should not be longer than 200 characters");
    }
    if (!body.url){
        errors.push("Image URL is required");
    }
    if (!body.yumfactor){
        errors.push("Yum Factor is required");
    }
    if (body.yumfactor && (body.yumfactor < 1 || body.yumfactor > 5)){
        errors.push("Yum Factor should be between (1-5)");
    }
   
    if (errors.length){
        res.status(400).json({ error: true, msg: errors.join(",") });
        return;
    }
    var sql = `UPDATE cakes set 
    name = COALESCE(?,name), 
    comment = COALESCE(?,comment), 
    url = ? ,
    yumfactor =  ?
    WHERE id = ?`
    var params =[body.name, body.comment, body.url, body.yumfactor, idToEdit]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        if (this.changes) {
            db.all('select * from cakes', [], (err, rows) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                res.json({
                    "message": "Cake Updated",
                    "data": rows
                })
            });
        }
    });
})

router.delete("/:id", async(req, res) => {
    const idToDelete = req.params.id
    if (!idToDelete){
        res.status(400).json({ error: true, msg: "Invalid Request" });
        return;
    }
    var sql = 'DELETE FROM cakes where id = ?'
    var params = [idToDelete]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        if (this.changes) {
            db.all('select * from cakes', [], (err, rows) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                res.json({
                    "message": "Cake Deleted",
                    "data": rows
                })
            });
        }
    });
})


module.exports = router;

