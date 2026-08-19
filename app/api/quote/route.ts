import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO_EMAIL = "karamengineeringservices@gmail.com";
// Resend's shared testing domain — works immediately with no DNS setup.
// Once the karamengineeringservices.com domain is verified in Resend, swap
// this for something like "KARAM Website <quotes@karamengineeringservices.com>".
const FROM_EMAIL = "KARAM Website <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Email service is not configured yet." },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const services = typeof body.services === "string" ? body.services.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  // Basic honeypot: silently accept but drop obvious bot submissions.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and project details are required." },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const html = `
    <div style="font-family: Arial, sans-serif; color: #0A1428; max-width: 560px;">
      <h2 style="margin: 0 0 16px;">New quote request — KARAM website</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 6px 0; color: #6B7482; width: 140px;">Name</td><td style="padding: 6px 0;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 6px 0; color: #6B7482;">Company</td><td style="padding: 6px 0;">${escapeHtml(company || "-")}</td></tr>
        <tr><td style="padding: 6px 0; color: #6B7482;">Email</td><td style="padding: 6px 0;">${escapeHtml(email)}</td></tr>
        <tr><td style="padding: 6px 0; color: #6B7482;">Phone</td><td style="padding: 6px 0;">${escapeHtml(phone || "-")}</td></tr>
        <tr><td style="padding: 6px 0; color: #6B7482;">Services</td><td style="padding: 6px 0;">${escapeHtml(services || "-")}</td></tr>
      </table>
      <p style="margin: 20px 0 6px; color: #6B7482; font-size: 14px;">Project details</p>
      <p style="white-space: pre-wrap; font-size: 14px; line-height: 1.5;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Quote request from ${name}${company ? ` (${company})` : ""}`,
      html
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Quote form send failed:", err);
    return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }
}
