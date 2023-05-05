import path from "path";
import fs from "fs";

function buildPath() {
  return path.join(
    process.cwd(),
    "data",
    "data.json"
  );
}

export default function handler(req, res) {
  const { email, eventID } = req.body;
  const filePath = buildPath();
  const jsonData = fs.readFileSync(filePath);
  const { events_categories, allEvents } =
    JSON.parse(jsonData);
  const newAllEvents = allEvents.map((ev) => {
    if (ev.id === eventID) {
      if (!ev.emails_registered.includes(email)) {
        return {
          ...ev,
          emails_registered: [
            ...ev.emails_registered,
            email,
          ],
        };
      } else {
        res.status(409).json({
          message: "email already registered",
        });
      }
    }
    return ev;
  });
  fs.writeFileSync(
    filePath,
    JSON.stringify({
      events_categories: events_categories,
      allEvents: newAllEvents,
    })
  );

  res.status(200).json({ message: "John Doe" });
}
