export default function handler(req, res) {
  console.log("Test API called");
  res.status(200).json({
    message: "Hello from Vercel!",
    method: req.method,
    timestamp: new Date().toISOString(),
  });
}
