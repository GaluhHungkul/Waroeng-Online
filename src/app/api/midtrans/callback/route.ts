import ConnectToDatabase from "@/lib/ConnectToDatabase";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto"
import Order from "@/models/Order";

export async function POST(req:NextRequest) {
    try {
        await ConnectToDatabase()
        const { order_id, status_code, gross_amount, signature_key, transaction_status, payment_type, fraud_status } = await req.json()
        
        const serverKey = process.env.MIDTRANS_SERVER_KEY
        const payload = order_id + status_code + gross_amount + serverKey
        const expectedSignature = crypto
            .createHash("sha512")
            .update(payload)
            .digest("hex")

        if (signature_key !== expectedSignature) {
            return NextResponse.json(
                { message: "Invalid signature" },
                { status: 403 }
            );
        }

        // 🔎 Cari order
        const order = await Order.findById(order_id);

        if (!order) {
            return NextResponse.json(
                { message: "Order not found" },
                { status: 404 }
            );
        }

        // 🧠 Mapping status Midtrans → App
        if (transaction_status === "settlement") {
            order.paymentStatus = "paid";
            order.orderStatus = "processing";
        }

        if (
            transaction_status === "expire" ||
            transaction_status === "cancel" ||
            transaction_status === "deny"
        ) {
            order.paymentStatus = "failed";
            order.orderStatus = "cancelled";
        }

        // 📝 Simpan detail midtrans
        order.midtrans.transactionStatus = transaction_status;
        order.midtrans.paymentType = payment_type;
        order.midtrans.fraudStatus = fraud_status;

        await order.save();
         console.log("lancar")
        console.log("********************************")
        return NextResponse.json({ message: "Callback handled" });
    } catch (error) {
        console.error("Midtrans callback error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
  }
}
