// api/handler.js
let currentTransaction = { id: null, amount: 0, paid: false };

export default function handler(req, res) {
    if (req.method === 'GET') {
        return res.status(200).json(currentTransaction);
    }

    if (req.method === 'POST') {
        const { amount, action } = req.body;

        if (action === 'complete') {
            currentTransaction.paid = true;
            return res.status(200).json({ success: true });
        }

        if (amount) {
            currentTransaction = {
                id: "TX-" + Date.now(),
                amount: parseFloat(amount),
                paid: false
            };
            return res.status(200).json({ transaction: currentTransaction });
        }
    }

    if (req.method === 'DELETE') {
        currentTransaction = { id: null, amount: 0, paid: false };
        return res.status(200).json({ status: "reset" });
    }

    res.status(405).end();
}
