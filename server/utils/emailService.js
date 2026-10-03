import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

let transporter = null;

if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

export const sendEnquiryEmails = async (enquiryData) => {
  if (!transporter) {
    console.log('ℹ️ SMTP settings not fully configured in .env. Skipping email dispatch.');
    return false;
  }

  const { fullName, phone, email, organisation, uniformType, approxQuantity, message, productName } = enquiryData;
  const ownerEmail = process.env.OWNER_EMAIL || process.env.SMTP_USER;

  // 1. Owner Alert Email
  const ownerMailOptions = {
    from: `"Apex Craft Uniforms" <${process.env.SMTP_USER}>`,
    to: ownerEmail,
    subject: `🚨 New Uniform Enquiry: ${fullName} (${organisation || 'Individual'})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #C9A24B; border-radius: 10px; background-color: #FAF7F2;">
        <h2 style="color: #0B1B33; border-bottom: 2px solid #C9A24B; padding-bottom: 10px;">New Uniform Enquiry Received</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Phone / WhatsApp:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organisation:</strong> ${organisation || 'N/A'}</p>
        <p><strong>Uniform Category:</strong> ${uniformType}</p>
        <p><strong>Approx Quantity:</strong> ${approxQuantity || 'N/A'}</p>
        ${productName ? `<p><strong>Product Interest:</strong> ${productName}</p>` : ''}
        <p><strong>Message / Notes:</strong></p>
        <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; border-left: 4px solid #C9A24B;">
          ${message || 'No additional notes specified.'}
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #5A6270;">Apex Craft Uniforms Automated Notification</p>
      </div>
    `
  };

  // 2. Customer Auto-Reply Email
  const customerMailOptions = {
    from: `"Apex Craft Uniforms" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Thank you for contacting Apex Craft Uniforms`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #0B1B33; border-radius: 10px; background-color: #ffffff;">
        <div style="background-color: #0B1B33; color: #ffffff; padding: 15px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: #C9A24B; margin: 0; font-size: 22px;">APEX CRAFT UNIFORMS</h1>
          <p style="margin: 5px 0 0 0; font-size: 12px; letter-spacing: 2px;">TAILORED TO REPRESENT EXCELLENCE</p>
        </div>
        <div style="padding: 20px; color: #1B1F24;">
          <p>Dear <strong>${fullName}</strong>,</p>
          <p>Thank you for reaching out to Apex Craft Uniforms. We have successfully received your enquiry regarding <strong>${uniformType}</strong>.</p>
          <p>Our senior uniform tailoring team is currently reviewing your specifications. A dedicated specialist will contact you within <strong>2 business hours</strong> to provide custom fabric recommendations, size drive details, and a formal institutional quote.</p>
          <hr style="border: none; border-top: 1px solid #FAF7F2; margin: 20px 0;" />
          <p style="font-size: 13px; color: #5A6270;">Need immediate assistance? Connect directly on WhatsApp: <a href="https://wa.me/919876543210" style="color: #25D366; font-weight: bold;">Chat with Us</a></p>
          <p style="margin-top: 30px; font-size: 12px; color: #888888;">Warm regards,<br /><strong>Apex Craft Uniforms Team</strong><br />Peenya Industrial Area, Bangalore, Karnataka</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(customerMailOptions);
    console.log('✅ Enquiry emails sent successfully.');
    return true;
  } catch (error) {
    console.error('⚠️ Error sending enquiry emails:', error.message);
    return false;
  }
};
