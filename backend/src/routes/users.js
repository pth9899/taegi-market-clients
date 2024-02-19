const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const Payment = require('../models/Payment');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const async = require('async');

router.get('/auth', auth, async (req, res, next) => {
    return res.json({
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    })
})

router.post('/register', async (req, res, next) => {
    try {
        const user = new User(req.body);
        await user.save();
        return res.sendStatus(200);
    } catch (error) {
        next(error)
    }
})


router.get('/find', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send('NoUser');
        }
        const userPassword = User.password;
        return res.status(200).json({
            password: userPassword
        })
    } catch (error) {
        next(error)
    }
})


router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send("Auth failed, email not found");
        }
        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            return res.status(400).send('Wrong password');
        }
        const payload = {
            userId: user._id.toHexString(),
        }
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
        return res.json({ user, accessToken })
    } catch (error) {
        next(error)
    }
})

router.post('/logout', auth, async (req, res, next) => {
    try {
        return res.sendStatus(200);
    } catch (error) {
        next(error)
    }
})

router.post('/cart', auth, async (req, res, next) => {
    try {
        const userInfo = await User.findOne({ _id: req.user._id })

        let duplicate = false;
        userInfo.cart.forEach((item) => {
            if (item.id === req.body.productId) {
                duplicate = true;
            }
        })
        if (duplicate) {
            const user = await User.findOneAndUpdate(
                { _id: req.user._id, "cart.id": req.body.productId },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true }
            )
            return res.status(201).send(user.cart);
        } else {
            const user = await User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        cart: {
                            id: req.body.productId,
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                }
                ,
                { new: true }
            )
            return res.status(201).send(user.cart);
        }

    } catch (error) {
        next(error)
    }
})

router.delete('/cart', auth, async (req, res, next) => {
    try {
        const userInfo = await User.findOneAndUpdate(
            { _id: req.user._id },
            {
                "$pull":
                {
                    "cart": {
                        "id": req.query.productId
                    }
                }
            },
            { new: true }
        )
        const cart = userInfo.cart;
        const array = cart.map(item => {
            return item.id
        })
        const productInfo = await Product
            .find({ _id: { $in: array } })
            .populate('writer');
        return res.json({
            productInfo,
            cart
        })
    } catch (error) {
        next(error);
    }
})

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


module.exports = router;