const express = require("express");
const app = express();
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
const configuration = new Configuration({
  organization: "org-wEs6BSL4r4tPBMHGkxaQwSei",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
app.post("/", async (req, res) => {
  try {
    // const completion = await openai.createCompletion({
    //   model: "text-davinci-002",
    //   prompt: req.body.search,
    // });

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.search,
      temperature: 1,
      max_tokens: 1000,
    });

    return res.status(500).json({
      status: true,
      message: completion.data.choices[0].text,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error,
    });
  }
});
app.get("/", (req, res) => {
  try {
    return res.status(500).json({
      status: true,
      message: "OK",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error,
    });
  }
});

app.listen(8080, console.log("server is running 🤟🏻 "));
