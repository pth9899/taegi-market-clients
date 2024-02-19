const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const Payment = require('../models/Payment');
const router = express.Router();
const auth = require('../middleware/auth');
const async = require('async');

router.post('/payment', auth, async (req, res) => {
    let history = [];
    let transactionData = {};

    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase: new Date().toISOString(),
            name: item.title,
            id: item.id,
            price: item.price,
            quantity: item.quantity,
            paymentId: crypto.randomUUID()
        })
    })
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    transactionData.product = history;

    await User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: { $each: history } }, $set: { cart: [] } }
    )

    const payment = new Payment(transactionData);
    const paymentDoc = await payment.save();
    console.log(paymentDoc);

    let products = [];
    paymentDoc.product.forEach(item => {
        products.push({ id: item.id, quantity: item.quantity })
    })

    async.eachSeries(products, async (item) => {
        await Product.updateOne(
            { _id: item._id },
            {
                $inc: {
                    "sold": item.quantity
                }
            }
        )
    },
        (err) => {
            if (err) return res.status(500).send(err);
            return res.sendStatus(200);
        }
    )
})

router.post('/successBuy', auth, async (req, res, next) => {
    let history = [];
    let transactionData = {};

    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase : Date.now(),
            name : item.title,
            id : item._id,
            price : item.price,
            quantity : item.quantity,
            paymentId: crypto.randomUUID()
        })
    })
    transactionData.user= {
        id : req.user._id,
        name : req.user.name,
        email : req.user.email
    }
    transactionData.data = req.body.paymentData
    transactionData.product = history

    User.findOneAndUpdate(
        {_id : req.user._id},
        {$push : {history : history},$set:{cart : []}},
        {new : true},
        (err, user) => {
            if(err) return res.json({success: false, err})
            const payment = new Payment(transactionData);
            payment.save((err, doc) =>{
                if(err)return res.json({success:false, err})
                let products = [];
                doc.product.forEach(item => {
                    products.push({id : item.id, quantity:item.quantity})
                })
                async.eachSeries(products, (item, callback) => {
                    Product.update(
                        {_id : item.id},
                        {
                            $inc: {
                                "sold" : item.quantity
                            }
                        },
                        {new : false},
                        callback
                    )
                },(err) => {
                    if(err){
                        return res.status(400).json({success:false, err})
                    }
                    res.status(200).json({
                        success:true,
                        cart : user.cart,
                        cartDetail : []
                    })
                })
            })
        }
    )
})

module.exports = router;