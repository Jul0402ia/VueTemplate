const { createApp } = Vue;

createApp({

    data() {
        return {
            items: [],

            error: null,

            baseUrl: "https://localhost:7100/api/template",

            searchText: "",

            newProperty1: "",
            newProperty2: "",
            newNumberProperty: 0
        };
    },

    computed: {
        filteredItems() {
            return this.items.filter(item =>
                item.property1 &&
                item.property1
                    .toLowerCase()
                    .includes(this.searchText.toLowerCase())
            );
        }
    },

    methods: {
        async getAllItems() {
            try {
                const response =
                    await axios.get(this.baseUrl);

                this.items = response.data;

                this.error = null;
            }
            catch (error) {
                this.error = error;
                console.log(error);
            }
        },

        async createItem() {
            try {
                const itemData = {
                    property1: this.newProperty1,
                    property2: this.newProperty2,
                    numberProperty: this.newNumberProperty
                };

                await axios.post(this.baseUrl, itemData);

                await this.getAllItems();

                this.newProperty1 = "";
                this.newProperty2 = "";
                this.newNumberProperty = 0;

                this.error = null;
            }
            catch (error) {
                this.error = error;
                console.log(error);
            }
        },

        async deleteItem(id) {
            try {
                await axios.delete(`${this.baseUrl}/${id}`);

                await this.getAllItems();

                this.error = null;
            }
            catch (error) {
                this.error = error;
                console.log(error);
            }
        },

        async updateItem(item) {
            try {
                await axios.put(
                    `${this.baseUrl}/${item.id}`,
                    item
                );

                await this.getAllItems();

                this.error = null;
            }
            catch (error) {
                this.error = error;
                console.log(error);
            }
        },

        sortItems() {
            this.items.sort(
                (a, b) => a.property1.localeCompare(b.property1)
            );
        }
    }

}).mount("#app");