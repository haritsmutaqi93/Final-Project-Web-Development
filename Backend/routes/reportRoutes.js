const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/reports",(req,res)=>{

    const report = {};

    db.query(
        "SELECT COUNT(*) AS totalUsers FROM users",
        (err,users)=>{

            report.totalUsers = users[0].totalUsers;

            db.query(
                "SELECT COUNT(*) AS totalBookings FROM bookings",
                (err,bookings)=>{

                    report.totalBookings =
                    bookings[0].totalBookings;

                    db.query(
                        `
                        SELECT
                        IFNULL(SUM(total_price),0)
                        AS totalRevenue
                        FROM bookings
                        `,
                        (err,revenue)=>{

                            report.totalRevenue =
                            revenue[0].totalRevenue;

                            db.query(
                                `
                                SELECT
                                ROUND(
                                (
                                COUNT(*) /
                                (
                                SELECT COUNT(*)
                                FROM bookings
                                )
                                )*100
                                )
                                AS utilization
                                FROM bookings
                                `,
                                (err,util)=>{

                                    report.utilization =
                                    util[0].utilization;

                                    res.json(report);

                                }
                            );
                        }
                    );
                }
            );
        }
    );

});

module.exports = router;