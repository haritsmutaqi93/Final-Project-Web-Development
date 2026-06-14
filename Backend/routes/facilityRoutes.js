const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.get("/facilities",(req,res)=>{

    const sql =
    "SELECT * FROM facilities";

    db.query(sql,(err,result)=>{

        if(err){
            return res.json({
                success:false
            });
        }

        res.json(result);

    });

});

router.delete(
"/facilities/:id",
(req,res)=>{

const id = req.params.id;

db.query(
"DELETE FROM facilities WHERE facility_id=?",
[id],
(err,result)=>{

res.json({
success:true
});

});

});

router.post("/facilities",(req,res)=>{

    const {
        facility_name,
        category,
        price_per_hour
    } = req.body;

    const sql = `
    INSERT INTO facilities
    (
        facility_name,
        category,
        price_per_hour,
        status
    )
    VALUES
    (?, ?, ?, 'Available')
    `;

    db.query(
        sql,
        [
            facility_name,
            category,
            price_per_hour
        ],
        (err,result)=>{

            if(err){

                console.log(err);

                return res.json({
                    success:false
                });

            }

            res.json({
                success:true
            });

        }
    );

});

router.get("/facilities/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "SELECT * FROM facilities WHERE facility_id = ?",
        [id],
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json(result[0]);

        }
    );

});

module.exports = router;


