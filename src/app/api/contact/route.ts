import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
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

// Initialize Resend client
const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

/**
 * POST /api/contact
 * 
 * Handles contact form submissions.
 * Recipient email is fetched from Sanity siteSettings.
 * Email is sent via Resend if RESEND_API_KEY is configured.
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
            return NextResponse.json(
                { success: false, error: "Contact email not configured. Please contact support." },
                { status: 500 }
            );
        }

        // Log submission
        console.log("\n═══════════════════════════════════════════════════════");
        console.log("📬 NEW CONTACT FORM SUBMISSION");
        console.log("═══════════════════════════════════════════════════════");
        console.log(`Recipient:  ${recipientEmail}`);
        console.log(`Name:       ${body.name}`);
        console.log(`Email:      ${body.email}`);
        console.log(`Company:    ${body.company || "Not provided"}`);
        console.log(`Tier:       ${body.selectedBudgetTier} (${body.selectedBudgetRange})`);
        console.log(`Details:    ${body.projectDetails}`);
        console.log(`Timestamp:  ${body.timestamp}`);
        console.log(`Page URL:   ${body.pageUrl}`);
        console.log(`User Agent: ${body.userAgent}`);
        console.log("═══════════════════════════════════════════════════════\n");

        // Send email via Resend
        if (resend) {
            try {
                await resend.emails.send({
                    from: "Contact Form <onboarding@resend.dev>",
                    to: [recipientEmail],
                    replyTo: body.email,
                    subject: `New inquiry from ${body.name} - ${body.selectedBudgetTier}`,
                    html: `
                        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #1a1a1a; border-bottom: 2px solid #f43f5e; padding-bottom: 10px;">
                                New Contact Form Submission
                            </h2>
                            
                            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Name</td>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;">
                                        <a href="mailto:${body.email}" style="color: #f43f5e;">${body.email}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Company</td>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.company || "Not provided"}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Budget Tier</td>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;">
                                        <span style="background: #fce7f3; color: #be185d; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
                                            ${body.selectedBudgetTier}
                                        </span>
                                        <span style="color: #666; margin-left: 8px;">${body.selectedBudgetRange}</span>
                                    </td>
                                </tr>
                            </table>
                            
                            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                <h3 style="margin: 0 0 10px 0; color: #1a1a1a;">Project Details</h3>
                                <p style="margin: 0; color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${body.projectDetails}</p>
                            </div>
                            
                            <div style="border-top: 1px solid #eee; padding-top: 15px; margin-top: 20px;">
                                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                                    Submitted at ${body.timestamp}<br>
                                    From: ${body.pageUrl}
                                </p>
                            </div>
                        </div>
                    `,
                });
                console.log("✅ Email sent successfully to:", recipientEmail);
            } catch (emailError) {
                console.error("❌ Failed to send email:", emailError);
                // Still return success to user - form was received, just email failed
                // You may want to change this behavior based on your needs
            }
        } else {
            console.warn("⚠️ RESEND_API_KEY not configured - email not sent");
        }

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
