import fs from "fs";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// message load
app.get("/messages", (req, res) => {
    try {
        const messages = fs.readFileSync("messages.txt", "utf-8");
        res.send({ success: true, messages });
    } catch (error) {
        console.error("Error reading messages:", error);
        res.status(500).send({ error: "メッセージの読み込みに失敗しました。" });
    }
});

// message send
app.post("/message", (req, res) => {
    const { name, msg } = req.body;
    if (!name || !msg) {
        return res.status(400).send({ error: "足りねえ項目あんねぇ！？！？" });
    }
    try {
        fs.appendFileSync("messages.txt", `${name}：${msg}\n`, "utf-8");
        res.send({ success: true, name, msg });
    } catch (error) {
        console.error("Error appending message:", error);
        res.status(500).send({ error: "メッセージの保存に失敗しました。" });
    }
});



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
