

const app = new Vue({
    el: '#app', 
    data: {
        product: "Sticker",
        image: "https://i.imgur.com/nD3xMgQ.png", 
        orgLink: "https://www.coloradogives.org/COGIVESDAY",
        inventory: 100, 
        onSale: false, 
        inStock: true,
        noStockClass: 'noStock',
        details: ['Strong Adhesive', '3 inch X 3 inch', '6 Pack'], 
        variants: [
            {
                variantID: 5280,
                color: 'Blue', 
                image: 'https://i.imgur.com/UD2D59V.png'
            },
            {
                variantID: 5281,
                color: 'Gold',
                image: 'https://i.imgur.com/nD3xMgQ.png'
            }
        ],
        cart: 0
    },
    methods: {
        addToCart: () => {
            console.log('clicked')
            app.cart ++;
        }, 
        removeItem: () => {
            if (app.cart) { app.cart -- }
        },
        updateProduct: (variantImage) => {
            app.image = variantImage;
        } 
    }
})

const description = new Vue({
    el: '#description', 
    data: {
        description: "Support Colorado Gives Day"
    }
})

