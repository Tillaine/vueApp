
Vue.component("product-review", {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
        <p>
            <lable for="name">Name:</lable>
            <input id="name" v-model="name">
        </p>

        <p>
            <lable for="review">Review:</lable>
            <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
            <lable for="rating">Rating:</lable>
            <select id="rating" v-model="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>

        <p>
            <input type='submit' value='Submit'>
        </p>

    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null
        }
    }, 
    methods: {
        onSubmit() {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            }
            this.$emit('review-submitted', productReview)
            this.name = null; 
            this.rating = null;
            this.review = null;
        }
    }
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
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
    <p v-if='premium'>Free Premium Shipping</p>
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
    <p class='delete' @click="removeItem">Remove Item</p>
    
    <button 
        v-on:click="addToCart"
        :disabled="!inStock"
        :class="{ disabledButton: !inStock }">
        Add to Cart
    </button>
    <div>
        <product-review @review-submitted="addReview"></product-review>
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
            reviews: [],
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
        }
    },
    methods: {
        addToCart () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantID)
        }, 
        removeItem() {
            this.$emit('remove-item', this.variants[this.selectedVariant].variantID)
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
        shipping() {
            return this.premium ? 'Free' : '$5.89';
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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
    el: '#app', 
    data: {
        premium: false,
        cart: []
    }, 
    methods: {
        updateCart(id) {
            this.cart.push(id);
        }, 
        removeItem(id) {
            const itemIndex = this.cart.indexOf(id);
            if (itemIndex > -1) {
                this.cart.splice(itemIndex, 1)
            }
        }
    }
})
                                                                                                                                                                                                                                                        
const description = new Vue({
   el: '#description', 
   data: {
    description: "Support Colorado Gives Day"
    }
    })

