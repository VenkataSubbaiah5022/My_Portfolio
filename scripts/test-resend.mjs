import fs from "fs";

const envText = fs.readFileSync(".env.local", "utf8");
for (const line of envText.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  const key = trimmed.slice(0, eq);
  let value = trimmed.slice(eq + 1).trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  process.env[key] = value;
}

const apiKey = process.env.RESEND_API_KEY;
const from =
  process.env.RESEND_FROM?.trim() ||
  '"Aitha Venkata Subbaiah" <onboarding@resend.dev>';
const to = process.argv[2] || "test@example.com";

const response = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from,
    to: [to],
    subject: "Ack test",
    html: "<p>test</p>",
  }),
});

const body = await response.text();
console.log("status:", response.status);
console.log("from:", from);
console.log("to:", to);
console.log("body:", body);
