const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/bookings", (req,res)=>{

    const {

        user_id,
        facility_id,
        booking_date,
        start_time,
        end_time,
        total_price,
        booking_status

    } = req.body;

    const checkSql = `

    SELECT *
    FROM bookings

    WHERE facility_id = ?
    AND booking_date = ?

    AND (
        (? < end_time)
        AND
        (? > start_time)
    )

    `;

    const sql = `
        INSERT INTO bookings
        (
            user_id,
            facility_id,
            booking_date,
            start_time,
            end_time,
            total_price,
            booking_status
        )
        VALUES (?,?,?,?,?,?,?)
    `;

    db.query(

    checkSql,

    [
        facility_id,
        booking_date,
        start_time,
        end_time
    ],

    (err, existingBookings)=>{

        if(err){

            console.log(err);

            return res.status(500).json({
                success:false,
                message:"Server Error"
            });

        }

        if(existingBookings.length > 0){

            return res.status(400).json({
                success:false,
                message:
                "This facility is already booked at that time"
            });

        }

        db.query(

            sql,

            [
                user_id,
                facility_id,
                booking_date,
                start_time,
                end_time,
                total_price,
                booking_status
            ],

            (err,result)=>{

                if(err){

                    console.log(err);

                    return res.status(500).json({
                        success:false,
                        message:"Booking Failed"
                    });

                }

                res.json({
                    success:true,
                    message:"Booking Successful"
                });

            }

        );

    }

    );

});

router.get("/my-bookings/:userId", (req, res) => {

    const userId = req.params.userId;

    const sql = `
        SELECT
            b.*,
            f.facility_name
        FROM bookings b
        JOIN facilities f
            ON b.facility_id = f.facility_id
        WHERE b.user_id = ?
        ORDER BY b.booking_date DESC
    `;

    db.query(sql, [userId], (err, results) => {

        if(err){
            console.log(err);

            return res.status(500).json({
                success:false,
                message:"Server Error"
            });
        }

        res.json(results);

    });

});

router.get("/bookings", (req,res)=>{

    const sql = `

        SELECT
        b.*,
        u.full_name,
        f.facility_name

        FROM bookings b

        LEFT JOIN users u
        ON b.user_id = u.user_id

        LEFT JOIN facilities f
        ON b.facility_id = f.facility_id

        ORDER BY b.booking_id DESC

    `;

    db.query(sql,(err,result)=>{

        if(err){

            console.log(err);

            return res.status(500).json({
                success:false
            });

        }

        res.json(result);

    });

});

router.put("/bookings/:id",(req,res)=>{

    const id = req.params.id;

    const {
        booking_status
    } = req.body;

    db.query(

        `
        UPDATE bookings
        SET booking_status=?
        WHERE booking_id=?
        `,

        [
            booking_status,
            id
        ],

        (err,result)=>{

            if(err){

                console.log(err);

                return res.status(500).json({
                    success:false
                });

            }

            res.json({
                success:true
            });

        }

    );

});

router.delete("/bookings/:id",(req,res)=>{

    const id = req.params.id;

    db.query(

        `
        DELETE FROM bookings
        WHERE booking_id=?
        `,

        [id],

        (err,result)=>{

            if(err){

                console.log(err);

                return res.status(500).json({
                    success:false
                });

            }

            res.json({
                success:true
            });

        }

    );

});

module.exports = router;