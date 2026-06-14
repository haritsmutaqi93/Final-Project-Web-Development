const express = require("express");
const router = express.Router();

const db = require("../config/db");


// GET ALL EVENTS

router.get("/events",(req,res)=>{

    db.query(
        "SELECT * FROM events",
        (err,result)=>{

            if(err){
                console.log(err);

                return res.json({
                    success:false
                });
            }

            res.json(result);

        }
    );

});


// ADD EVENT

router.post("/events",(req,res)=>{

    const {
        event_name,
        description,
        event_date,
        registration_fee,
        event_status
    } = req.body;

    db.query(
        `
        INSERT INTO events
        (
            event_name,
            description,
            event_date,
            registration_fee,
            event_status
        )
        VALUES
        (?, ?, ?, ?, ?)
        `,
        [
            event_name,
            description,
            event_date,
            registration_fee,
            event_status
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


// DELETE EVENT

router.delete("/events/:id",(req,res)=>{

    const id = req.params.id;

    db.query(
        "DELETE FROM events WHERE event_id=?",
        [id],
        (err,result)=>{

            res.json({
                success:true
            });

        }
    );

});


// UPDATE EVENT

router.put("/events/:id",(req,res)=>{

    const id = req.params.id;

    const {
        event_name,
        description,
        event_date,
        registration_fee,
        event_status
    } = req.body;

    db.query(
        `
        UPDATE events
        SET
        event_name=?,
        description=?,
        event_date=?,
        registration_fee=?,
        event_status=?
        WHERE event_id=?
        `,
        [
            event_name,
            description,
            event_date,
            registration_fee,
            event_status,
            id
        ],
        (err,result)=>{

            res.json({
                success:true
            });

        }
    );

});

module.exports = router;