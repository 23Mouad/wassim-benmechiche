import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
})

export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  const mailOptions = {
    from: `"Wassime Benmachich" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent successfully:", info.messageId)
    return info
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}

export const sendAdminNotification = async (name: string, email: string, message: string) => {
  const subject = `New Contact Form Submission from ${name}`
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">New Contact Form Submission</h1>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    </div>
  `
  return sendEmail(process.env.ADMIN_EMAIL!, subject, message, html)
}

export const sendUserConfirmation = async (name: string, email: string) => {
  const subject = "Thank you for contacting Wassime Benmachich"
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Thank you for your message, ${name}!</h1>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
        <p>I have received your inquiry and will get back to you as soon as possible.</p>
        <p>Best regards,</p>
        <p><strong>Wassime Benmachich</strong></p>
      </div>
    </div>
  `
  return sendEmail(email, subject, "Thank you for your message. I will respond as soon as possible.", html)
}

