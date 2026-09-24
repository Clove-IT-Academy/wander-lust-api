import transporter from "../config/mail.js";
import path from "path";
import fs from "fs";

const sendMail = async (to, subject, data) => {
    const templatePath = path.join(
        process.cwd(),
        "templates",
        "accept-invite.html"
    );

    let html = fs.readFileSync(templatePath, "utf8");

    html = html
        .replace("{{ link }}", data.link)
        .replace("{{ title }}", data.title)
        .replace("{{ startDate }}", data.startDate)
        .replace("{{ endDate }}", data.endDate)
        .replace("{{ userName }}", data.name);

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html
    });
}

export default sendMail;