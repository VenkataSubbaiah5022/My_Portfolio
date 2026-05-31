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

const to = process.argv[2] || "test@example.com";
const nodemailer = await import("nodemailer");
const user = process.env.GMAIL_USER?.trim();
const pass = process.env.GMAIL_APP_PASSWORD?.trim();

if (!user || !pass) {
  console.log("Gmail env missing");
  process.exit(1);
}

const transporter = nodemailer.default.createTransport({
  service: "gmail",
  auth: { user, pass },
});

try {
  const info = await transporter.sendMail({
    from: `"Portfolio Test" <${user}>`,
    to,
    subject: "Gmail ack test",
    text: "test",
  });
  console.log("gmail ok:", info.messageId);
} catch (error) {
  console.log("gmail error:", error instanceof Error ? error.message : error);
}
