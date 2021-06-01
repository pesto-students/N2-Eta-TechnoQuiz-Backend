
var router = require('express').Router();
const Razorpay = require('razorpay')
const orderDetails =  require('../../models/order');
const userDetails = require('../../models/user');
const { nanoid } = require("nanoid");
const verifyUser = require('../auth/verifyToken');
// const { param } = require('../auth/auth');

let razorPayInstance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET
})

router.post('/order',verifyUser, function(req, res, next) {
	params = {
		amount: req.body.amount * 100,
		currency: "INR",
		receipt: nanoid(),
		payment_capture: "1"
	}
	razorPayInstance.orders.create(params).then(async (response) => {
		const order = new orderDetails({
			orderId   : response.id,
			receiptId : response.receipt,
			amount    : response.amount,
			currency  : response.currency,
			createdAt : response.created_at,
			status    : response.status,
			userID    : req.user.id,
			status 	  : "pending"
		})
		try {
			const details = await order.save();
			res.status(200).send(details);
		} catch (err) {
			if (err) throw err;
		}
	}).catch((err) => {
		if (err) throw err;
	})
});

router.post('/verify',verifyUser, async function(req, res, next) {
	body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
	let crypto = require("crypto");
	let expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest('hex');

	if(expectedSignature === req.body.razorpay_signature) {
		await orderDetails.findOneAndUpdate(
			{ orderId: req.body.razorpay_order_id },
			{
				paymentId: req.body.razorpay_payment_id,
				signature: req.body.razorpay_signature,
				status: "paid"
			},{ new: true },
			async function(err, details) {
				if(err) res.status(400).send(err);
				const days = (req.body.plan == "M" ? 30 : 365);
				await userDetails.findOneAndUpdate({_id : req.user.id},{expiry : new Date(new Date().setDate(new Date().getDate() - days))})
				res.status(200).send(details)
			}
		);
	} else {
		await userDetails.findOneAndUpdate({ _id: req.user.id},{status: "failed"},{ new: true })
		res.status(205).send("Payment Failed")
	}
});

module.exports = router;