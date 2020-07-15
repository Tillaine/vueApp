


Vue.component('product', {
    
    template: `
    <div class="product">
    <div class="product-image">
    <img v-bind:src="image" >
    </div>
    <div class="product-info">
    <div :class="[!inStock ? noStockClass : '']">
    <h1>{{ title }}</h1>
    </div>
    <p v-if="inStock > 10">In Stock</p>
    <p v-else-if="inStock <= 10 && inStock > 0">Almost Sold Out</p>
    <p v-else>Out of Stock</p>
    <ul>
    <li v-for="detail in details" >{{ detail }}</li>
    </ul>
    <div v-for="(variant, index) in variants" 
    @mouseover="updateProduct(index)"
    :key="variant.variantID"
    class="color-box"
    :style="{ backgroundColor: variant.color }" >
    </div>
    <div class="onSale">
    <p v-show="onSale">{{onSale}}</p>
    </div>
    <button 
    v-on:click="addToCart"
    :disabled="!inStock"
    :class="{ disabledButton: !inStock }">
    Add to Cart
    </button>
    <p class='delete' @click="removeItem">Remove Item</p>
    
    <div class="cart">
    <p>Cart({{cart}})</p>
    </div>
    
    </div>
    <a :href="orgLink">Colorado Gives</a>
    </div>
    `, 
    data() {
        return { 
            product: "Sticker",
            brand: 'Colorado Gives Day',
            selectedVariant: 0,
            orgLink: "https://www.coloradogives.org/COGIVESDAY",
            noStockClass: 'noStock',
            details: ['Strong Adhesive', '3 inch X 3 inch', '6 Pack'], 
            variants: [
                {
                    variantID: 5280,
                    onSale: false,
                    quantity: 4,
                    color: 'Blue', 
                    image: 'https://i.imgur.com/UD2D59V.png'
                },
                {
                    variantID: 5281,
                    onSale: true,
                    color: 'Gold',
                    quantity: 100,
                    image: 'https://i.imgur.com/nD3xMgQ.png'
                }
            ],
            cart: 0
        }
    },
    methods: {
        addToCart () {
            this.cart ++;
        }, 
        removeItem() {
            if (this.cart) { this.cart -- }
        },
        updateProduct(index) {
            this.selectedVariant = index;
        }
    }, 
    computed: {
        title() {
            return this.brand + ' ' + this.product
        }, 
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        onSale() {
            return (
                this.variants[this.selectedVariant].onSale ?
                this.variants[this.selectedVariant].color  + ' ' + this.product + ' ' + 'is on sale!' 
                : '')
            }
        }
    });
    
const app = new Vue({
    el: '#app'
})
                                                                                                                                                                                                                                                        
const description = new Vue({
   el: '#description', 
   data: {
    description: "Support Colorado Gives Day"
    }
    })