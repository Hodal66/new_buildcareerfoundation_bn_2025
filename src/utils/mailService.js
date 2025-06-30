import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or any email provider like 'hotmail', 'outlook'
  auth: {
    // user: process.env.EMAIL_USER, // your email
    // pass: process.env.EMAIL_PASS, // app-specific password
    user: "mhthodol@gmail.com",
    pass: "swfu kzjy vauo hsbt", // app-specific password
  },
});

export const sendSubscriptionEmail = async (toEmail) => {
  const mailOptions = {
  from: `"Build Career Foundation" <${process.env.EMAIL_USER}>`,
  to: toEmail,
  subject: "Welcome to Build Career Foundation 💡",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
      <h2 style="color: #1766EF;">You're Officially In! 🎉</h2>
      <p>Hello Trailblazer,</p>

      <p>Thank you for subscribing to <strong>Build Career Foundation</strong>! Your support fuels our mission to build careers and create a brighter future for Rwanda and beyond.</p>

      <p>Every time someone like you joins our journey, we get closer to our vision — empowering bright, determined students from disadvantaged backgrounds with mentorship, guidance, and the resources they need to thrive.</p>

      <blockquote style="font-style: italic; color: #555; margin: 15px 0;">
        “Build Career Foundation is not a charity you give money to, but rather an entity you give money through.”
      </blockquote>

      <p>With approximately 90% of ordinary level students lacking career guidance and 13.5% of high schoolers dropping out due to financial limitations, your engagement truly makes a difference. Together, we’re rewriting futures and restoring hope.</p>

      <p>Stay tuned for updates, success stories, and ways you can further make an impact. We’re thrilled to have you in our community!</p>

      <p style="margin-top: 30px;">With gratitude,<br />
      <strong>Build Career Foundation Team</strong></p>
    </div>
  `
};



  await transporter.sendMail(mailOptions);
};
