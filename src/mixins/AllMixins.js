export default {
    methods: {
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