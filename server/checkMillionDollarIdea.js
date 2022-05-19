const checkMillionDollarIdea = (req, res, next) => {
    const totalWorth = req.body.numWeeks * req.body.weeklyRevenue;
    if (totalWorth >= 1000000) {
        next();
    } else {
        res.status(400).send("Bad Request");
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
