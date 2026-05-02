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

const ADMIN_EMAIL = "buildcareerfoundation@gmail.com";
const BRAND_COLOR = "#23297A"; // Deep Indigo from BCF theme
const SECONDARY_COLOR = "#0ABAB5"; // Tiffany Blue from BCF theme

/**
 * Common Email Styles Wrapper
 */
const emailWrapper = (content) => `
  <div style="font-family: 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <div style="background-color: ${BRAND_COLOR}; padding: 32px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em;">BUILD CAREER FOUNDATION</h1>
    </div>
    <div style="padding: 40px 32px;">
      ${content}
    </div>
    <div style="background-color: #f9fafb; padding: 32px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; color: #6b7280; font-size: 14px;">&copy; ${new Date().getFullYear()} Build Career Foundation</p>
      <p style="margin: 4px 0 0; color: #9ca3af; font-size: 12px;">Empowering bright minds, building thriving futures.</p>
      <div style="margin-top: 16px;">
        <a href="mailto:buildcareerfoundation@gmail.com" style="color: ${BRAND_COLOR}; text-decoration: none; font-size: 14px; font-weight: 500;">buildcareerfoundation@gmail.com</a>
      </div>
    </div>
  </div>
`;

export const sendSubscriptionEmail = async (toEmail) => {
  const content = `
    <h2 style="color: ${BRAND_COLOR}; font-size: 28px; margin-top: 0; font-weight: 800;">Welcome to the Community! 🎉</h2>
    <p style="font-size: 16px; color: #4b5563;">Hello Trailblazer,</p>
    <p style="font-size: 16px; color: #4b5563;">Thank you for joining <strong>Build Career Foundation</strong>. Your subscription is more than just a signup—it's a step towards empowering the next generation of leaders.</p>
    
    <div style="background-color: #f0f7ff; border-left: 4px solid ${SECONDARY_COLOR}; padding: 24px; margin: 32px 0; border-radius: 8px;">
      <p style="font-style: italic; color: #1e3a8a; margin: 0; font-size: 16px;">
        “Build Career Foundation is not a charity you give money to, but rather an entity you give money through.”
      </p>
    </div>

    <p style="font-size: 16px; color: #4b5563;">Stay tuned for inspiring success stories, upcoming initiatives, and ways you can help us rewrite futures and restore hope.</p>
    <p style="margin-top: 40px; font-size: 16px; color: #111827;"><strong>With gratitude,</strong><br />Build Career Foundation Team</p>
  `;

  try {
    const mailOptions = {
      from: `"Build Career Foundation" <mhthodol@gmail.com>`,
      to: toEmail,
      subject: "Welcome to Build Career Foundation 💡",
      html: emailWrapper(content),
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error sending subscription email to ${toEmail}:`, error);
    throw new Error("Failed to send welcome email.");
  }
};

export const sendContactEmail = async (toEmail, fullName) => {
  const content = `
    <h2 style="color: ${BRAND_COLOR}; font-size: 28px; margin-top: 0; font-weight: 800;">We've Received Your Message ✉️</h2>
    <p style="font-size: 16px; color: #4b5563;">Hello ${fullName},</p>
    <p style="font-size: 16px; color: #4b5563;">Thank you for reaching out to <strong>Build Career Foundation</strong>. Our team has received your inquiry and is currently reviewing it with care.</p>
    <p style="font-size: 16px; color: #4b5563;">You can expect a professional response from our representatives within the next 24 to 48 business hours.</p>
    
    <div style="margin-top: 32px; padding-top: 32px; border-top: 1px solid #e5e7eb;">
      <p style="font-size: 14px; color: #6b7280; margin: 0;">Need urgent assistance? Reply directly to this email or visit our website to explore our frequently asked questions.</p>
    </div>
    
    <p style="margin-top: 40px; font-size: 16px; color: #111827;"><strong>Warm regards,</strong><br />Build Career Foundation Team</p>
  `;

  try {
    const mailOptions = {
      from: `"Build Career Foundation" <mhthodol@gmail.com>`,
      to: toEmail,
      subject: "Inquiry Received - Build Career Foundation",
      html: emailWrapper(content),
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error sending contact confirmation to ${toEmail}:`, error);
    // We don't necessarily want to throw here as the data is already saved, 
    // but logging is essential.
  }
};

export const notifyAdmin = async (type, data) => {
  const isSubscription = type === "SUBSCRIPTION";
  const title = isSubscription ? "New Newsletter Subscriber" : "New Contact Inquiry";
  
  const detailLines = isSubscription
    ? `<div style="background-color: #f9fafb; padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb;">
         <p style="margin: 0; font-size: 14px; color: #6b7280;">Email Address</p>
         <p style="margin: 4px 0 0; font-size: 18px; font-weight: 600; color: #111827;">${data.email}</p>
       </div>`
    : `
      <div style="display: grid; gap: 16px;">
        <div style="background-color: #f9fafb; padding: 16px; border-radius: 12px; border: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Full Name</p>
          <p style="margin: 4px 0 0; font-size: 16px; font-weight: 600; color: #111827;">${data.fullName}</p>
        </div>
        <div style="background-color: #f9fafb; padding: 16px; border-radius: 12px; border: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Contact Info</p>
          <p style="margin: 4px 0 0; font-size: 16px; font-weight: 600; color: #111827;">${data.email} | ${data.phoneNumber || "N/A"}</p>
        </div>
        <div style="background-color: #ffffff; padding: 16px; border-radius: 12px; border: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 12px; color: #84cc16; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Message</p>
          <p style="margin: 8px 0 0; font-size: 15px; color: #374151; white-space: pre-line; line-height: 1.6;">${data.message}</p>
        </div>
      </div>
    `;

  const content = `
    <h2 style="color: #111827; font-size: 24px; margin-top: 0; font-weight: 800;">${title}</h2>
    <p style="font-size: 15px; color: #4b5563; margin-bottom: 24px;">An automated alert for a recent activity on the Build Career Foundation website.</p>
    ${detailLines}
    <div style="margin-top: 32px; padding: 16px; background-color: #fffbeb; border-radius: 8px; border: 1px solid #fef3c7;">
      <p style="margin: 0; font-size: 13px; color: #92400e;">Please log in to the admin dashboard for full management and response tracking.</p>
    </div>
  `;

  try {
    const mailOptions = {
      from: `"BCF Website Alpha" <mhthodol@gmail.com>`,
      to: ADMIN_EMAIL,
      subject: `[ALERT] ${title} - ${new Date().toLocaleDateString()}`,
      html: emailWrapper(content),
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error notifying admin of ${type}:`, error);
  }
};
export const notifySubscribersOfNewPost = async (subscribers, postDetails) => {
  const { title, category, youtube_video_url, content } = postDetails;
  
  const isVideo = !!youtube_video_url;
  const ctaText = isVideo ? "Watch Video Now" : "Read Full Story";
  const ctaLink = youtube_video_url || "https://bcf-rwanda.org/ActivitiesPage"; // Fallback to activities page

  const contentHtml = `
    <h2 style="color: ${BRAND_COLOR}; font-size: 26px; margin-top: 0; font-weight: 800; line-height: 1.2;">New ${category} Released: ${title} 🚀</h2>
    <p style="font-size: 16px; color: #4b5563;">Hello BCF Community,</p>
    <p style="font-size: 16px; color: #4b5563;">We are excited to share a new update from the Build Career Foundation. Our latest <strong>${category}</strong> is now live and waiting for you.</p>
    
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; margin: 32px 0; border-radius: 12px; text-align: center;">
      <p style="color: #1e293b; font-weight: 700; font-size: 18px; margin-top: 0;">${title}</p>
      <p style="color: #64748b; font-size: 14px; margin-bottom: 24px;">${content.substring(0, 150)}...</p>
      <a href="${ctaLink}" style="display: inline-block; background-color: ${BRAND_COLOR}; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px; transition: background-color 0.3s ease;">
        ${ctaText}
      </a>
    </div>

    <p style="font-size: 15px; color: #64748b; font-style: italic;">Your support helps us build careers and transform futures. Thank you for being part of this journey.</p>
    <p style="margin-top: 40px; font-size: 16px; color: #111827;"><strong>Best regards,</strong><br />Build Career Foundation Team</p>
  `;

  const mailOptions = {
    from: `"Build Career Foundation" <mhthodol@gmail.com>`,
    subject: `New ${category} from BCF: ${title}`,
    html: emailWrapper(contentHtml),
  };

  // Send to multiple subscribers
  try {
    const sendPromises = subscribers.map(email => 
      transporter.sendMail({ ...mailOptions, to: email })
    );
    await Promise.all(sendPromises);
    console.log(`✅ New post notification sent to ${subscribers.length} subscribers.`);
  } catch (error) {
    console.error("❌ Subscriber broadcast failed:", error.message);
  }
};
