const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/users",(req,res)=>{

    db.query(

        `
        SELECT *
        FROM users
        ORDER BY user_id DESC
        `,

        (err,result)=>{

            if(err){

                return res
                .status(500)
                .json(err);

            }

            res.json(result);

        }

    );

});

router.post("/users",(req,res)=>{

    const {
        full_name,
        email,
        password,
        phone_number
    } = req.body;

    db.query(

        `
        INSERT INTO users
        (
            full_name,
            email,
            password,
            phone_number,
            role
        )

        VALUES
        (?,?,?,?,?)
        `,

        [
            full_name,
            email,
            password,
            phone_number,
            "user"
        ],

        (err,result)=>{

            if(err){

                return res
                .status(500)
                .json(err);

            }

            res.json({
                success:true
            });

        }

    );

});

router.put("/users/:id",(req,res)=>{

    const id =
    req.params.id;

    const {
        full_name
    } = req.body;

    db.query(

        `
        UPDATE users
        SET full_name=?
        WHERE user_id=?
        `,

        [
            full_name,
            id
        ],

        (err,result)=>{

            if(err){

                return res
                .status(500)
                .json(err);

            }

            res.json({
                success:true
            });

        }

    );

});

router.delete("/users/:id",(req,res)=>{

    const id = req.params.id;

    db.query(

        "DELETE FROM bookings WHERE user_id=?",

        [id],

        (err)=>{

            if(err){
                return res.status(500).json(err);
            }

            db.query(

                "DELETE FROM users WHERE user_id=?",

                [id],

                (err,result)=>{

                    if(err){
                        return res.status(500).json(err);
                    }

                    res.json({
                        success:true
                    });

                }

            );

        }

    );

});

module.exports = router;