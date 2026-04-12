// Server-side only-API key is never sent to the browser.
// $env/static/private is a SvelteKit virtual module; do not convert to import.meta.env.
import { WAITLIST_API_KEY } from "$env/static/private"
import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export const POST: RequestHandler = async ({ request }) => {
  const { email, is_company, company_name } = await request.json()

  if (!email || typeof email !== "string") {
    return json({ success: false, error: "Email is required." }, { status: 400 })
  }

  const customerName = is_company && company_name ? String(company_name).trim() : ""
  const message = is_company && customerName ? `Waitlist signup-company: ${customerName}` : "Waitlist signup-individual"

  const payload = {
    api_key: WAITLIST_API_KEY,
    message,
    email_subject: "Nomox Waitlist-New Signup",
    customer_email: email.trim(),
    customer_phone: "",
    customer_name: customerName,
    time_to_contact: "",
  }

  try {
    const res = await fetch("https://api.annakmentova.cz/v1/send-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      return json({ success: false, error: "Failed to submit. Please try again." }, { status: 502 })
    }

    return json({ success: true })
  } catch {
    return json({ success: false, error: "Network error. Please try again." }, { status: 502 })
  }
}
