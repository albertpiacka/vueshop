export default {
    methods: {
        addToCart(item){
            var existing = localStorage.getItem('basket')

            existing = existing ? existing.split(',') : []

            let obj = {
                id: (Math.random()*1000).toFixed(0),
                name: item.name,
                quantity: 1,
                package: `${item.selected * 1000}gr`,
                price: ((item.price * Number(item.selected)) * 1).toFixed(2)
            }

            existing.push(JSON.stringify([obj]));

            localStorage.setItem('basket', existing.toString())

            item.selected = '0.25'

            this.$root.$emit('flash', 'Item added to cart')
        },

        setPrice(item){
            item.selectedPrice = item.price * item.selected

            let el = document.getElementById(`price-${item.id}`)

            el.textContent = `€ ${item.selectedPrice.toFixed(2)}`
        },

        setItem(item){
            let data = {
                obj: item,
                type: 'coffee'
            }

            this.$root.$emit('quickview', data)
        }
    },
}