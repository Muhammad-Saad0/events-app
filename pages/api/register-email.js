export default function handler(req, res) {
  const { email } = req.body;
  console.log(email);

  res.status(200).json({ name: "John Doe" });
}
