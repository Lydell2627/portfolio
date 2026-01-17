import { NextRequest, NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/sanity";

/**
 * Contact Form Submission Payload
 */
interface ContactSubmission {
    name: string;
    email: string;
    company?: string;
    selectedBudgetTier: string;
    selectedBudgetRange: string;
    projectDetails: string;
    timestamp: string;
    pageUrl: string;
    userAgent: string;
}

/**
 * POST /api/contact
 * 
 * Handles contact form submissions.
 * Recipient email is fetched from Sanity siteSettings.
 * 
 * To enable email delivery:
 * 1. Install: pnpm add resend
 * 2. Add RESEND_API_KEY to .env.local
 * 3. Uncomment the Resend integration below
 */
export async function POST(request: NextRequest) {
    try {
        const body: ContactSubmission = await request.json();

        // Validate required fields
        const requiredFields = ["name", "email", "selectedBudgetTier", "selectedBudgetRange", "projectDetails"];
        for (const field of requiredFields) {
            if (!body[field as keyof ContactSubmission]) {
                return NextResponse.json(
                    { success: false, error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Fetch recipient email from Sanity siteSettings
        const siteSettings = await getSiteSettings();
        const recipientEmail = siteSettings?.contactEmail;

        if (!recipientEmail) {
            console.warn("⚠️ No contactEmail configured in Sanity siteSettings");
        }

        // Log submission (replace with email/database in production)
        console.log("\n═══════════════════════════════════════════════════════");
        console.log("📬 NEW CONTACT FORM SUBMISSION");
        console.log("═══════════════════════════════════════════════════════");
        console.log(`Recipient:  ${recipientEmail || "NOT CONFIGURED"}`);
        console.log(`Name:       ${body.name}`);
        console.log(`Email:      ${body.email}`);
        console.log(`Company:    ${body.company || "Not provided"}`);
        console.log(`Tier:       ${body.selectedBudgetTier} (${body.selectedBudgetRange})`);
        console.log(`Details:    ${body.projectDetails}`);
        console.log(`Timestamp:  ${body.timestamp}`);
        console.log(`Page URL:   ${body.pageUrl}`);
        console.log(`User Agent: ${body.userAgent}`);
        console.log("═══════════════════════════════════════════════════════\n");

        // ─────────────────────────────────────────────────────────────────────
        // OPTIONAL: Email via Resend (uncomment when ready)
        // ─────────────────────────────────────────────────────────────────────
        // import { Resend } from 'resend';
        // const resend = new Resend(process.env.RESEND_API_KEY);
        // 
        // if (recipientEmail) {
        //   await resend.emails.send({
        //     from: 'Contact Form <noreply@yourdomain.com>',
        //     to: [recipientEmail],
        //     subject: `New inquiry from ${body.name} - ${body.selectedBudgetTier}`,
        //     html: `
        //       <h2>New Contact Form Submission</h2>
        //       <p><strong>Name:</strong> ${body.name}</p>
        //       <p><strong>Email:</strong> ${body.email}</p>
        //       <p><strong>Company:</strong> ${body.company || 'Not provided'}</p>
        //       <p><strong>Budget:</strong> ${body.selectedBudgetTier} (${body.selectedBudgetRange})</p>
        //       <p><strong>Project Details:</strong></p>
        //       <p>${body.projectDetails.replace(/\n/g, '<br>')}</p>
        //       <hr>
        //       <p><small>Submitted at ${body.timestamp} from ${body.pageUrl}</small></p>
        //     `,
        //   });
        // }
        // ─────────────────────────────────────────────────────────────────────

        return NextResponse.json({
            success: true,
            message: "Message sent — we'll reply within 24–48 hours.",
            timestamp: body.timestamp,
        });
    } catch (error) {
        console.error("Contact form submission error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to process submission. Please try again." },
            { status: 500 }
        );
    }
}
