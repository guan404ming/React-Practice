import { Router } from "express";
import ScoreCard from "../models/ScoreCard";

const router = Router();
router.delete("/cards", (_, res) => {
    const deleteDB = async () => {
        try {
          await ScoreCard.deleteMany({});
          res.json({message: "Database cleared"})
        } catch (e) { res.json({message: `Error: can't clear the data`}) }
    };
    deleteDB();
});

router.post("/card", (req, res) => {
    const saveScoreCard = async(name, subject, score) => {
        const existing = await ScoreCard.findOne({ name, subject });
        if (existing) {
            const id = existing._id;
            try {
                res.json({ message: `Updating (${name}, ${subject}, ${score})` });
                return ScoreCard.updateOne({ _id: id }, { $set: { "score": score } });
            } catch (e) { res.json({message: `Error: can't update the data`}) }
        }
        else {
            try {
                const newScoreCard = new ScoreCard({ name, subject, score });
                res.json({ message: `Adding (${name}, ${subject}, ${score})` });
                return newScoreCard.save();
            } catch (e) { res.json({message: `Error: can't add the data`})}
        }
    }
    
    saveScoreCard(req.body.name, req.body.subject, req.body.score);
});

router.get("/cards", (req, res) => {
    async function getScoreCard(type, queryString) {
        const existing = (type == 'name') ? await ScoreCard.find({ name: queryString }) : await ScoreCard.find({ subject: queryString });
        if (existing.length == 0) {
            res.json({ message: `${type}`.charAt(0).toUpperCase() + `${type} (${queryString}) not found!`.slice(1) });
        }
        else {
            try {
                var msg = [];
                existing.map((card) => {
                    msg.push(`Found card with ${type}: (${card.name}, ${card.subject}, ${card.score})`);
                });
                res.json({ messages: msg });
            } catch (e) { res.json({ message: `Error: can't get the data` }); }
        }
    }
    
    getScoreCard(req.query.type, req.query.queryString)
});

export default router;
