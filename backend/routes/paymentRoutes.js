const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/Payment");

const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_YourTestKey",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "YourTestSecret",
});

// Create Order Route
router.post("/create-order", async (req, res) => {
    try {
        const { amount, userId } = req.body;
        
        if (!amount || !userId) {
            return res.status(400).json({ error: "Amount and userId are required" });
        }

        // Check if user has already paid this month
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999);
        
        const existingPayment = await Payment.findOne({
            userId,
            status: "successful",
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        });

        if (existingPayment) {
            return res.status(400).json({ error: "You have already paid maintenance for this month." });
        }

        const options = {
            amount: amount * 100, // amount in the smallest currency unit (paise)
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        // Save order to database as created status
        const payment = new Payment({
            userId,
            razorpayOrderId: order.id,
            amount: amount,
            status: "created"
        });
        
        await payment.save();

        res.json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Something went wrong creating the order" });
    }
});

// Verify Payment Route
router.post("/verify-payment", async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "YourTestSecret")
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Update payment status to successful
            await Payment.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { 
                    status: "successful", 
                    razorpayPaymentId: razorpay_payment_id, 
                    razorpaySignature: razorpay_signature 
                }
            );
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            // Update payment status to failed
            await Payment.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: "failed" }
            );
            return res.status(400).json({ error: "Invalid signature" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ error: "Something went wrong verifying the payment" });
    }
});

// Get all payments (for Admin tracking)
router.get("/", async (req, res) => {
    try {
        const payments = await Payment.find().populate("userId", "name email").sort({ createdAt: -1 });
        res.json(payments);
    } catch (error) {
        console.error("Error fetching payments:", error);
        res.status(500).json({ error: "Something went wrong fetching payments" });
    }
});

// Check if user has paid for the current month
router.get("/status/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999);
        
        const existingPayment = await Payment.findOne({
            userId,
            status: "successful",
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        });

        res.json({ hasPaid: !!existingPayment });
    } catch (error) {
        console.error("Error checking payment status:", error);
        res.status(500).json({ error: "Something went wrong checking payment status" });
    }
});

module.exports = router;
