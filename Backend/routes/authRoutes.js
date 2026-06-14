const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.post("/register", (req, res) => {

    const {
        full_name,
        email,
        password,
        phone_number
    } = req.body;

    const sql = `
        INSERT INTO users
        (full_name,email,password,phone_number)
        VALUES (?,?,?,?)
    `;

    db.query(
    sql,
    [full_name,email,password,phone_number],
    (err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        const getUserSql = `
            SELECT *
            FROM users
            WHERE user_id = ?
        `;

        db.query(
            getUserSql,
            [result.insertId],
            (err,userResult)=>{

                if(err){
                    return res.status(500).json(err);
                }

                res.json({
                    success:true,
                    message:"User registered successfully",
                    user:userResult[0]
                });

            }
        );

    }
);

});

router.post("/login",(req,res)=>{

    const {email,password} = req.body;

    const sql = `
        SELECT *
        FROM users
        WHERE email = ?
        AND password = ?
    `;

    db.query(
        sql,
        [email,password],
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }

            if(result.length === 0){

                return res.status(401).json({
                    success:false,
                    message:"Invalid email or password"
                });

            }

            res.json({
                success:true,
                user:result[0]
            });

        }
    );

});

module.exports = router;