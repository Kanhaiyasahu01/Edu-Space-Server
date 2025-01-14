const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
})

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
	// Create a transporter to send emails

	// Define the email options

	// Send the email
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

// Define a pre-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});


module.exports = mongoose.model("OTP",otpSchema);
