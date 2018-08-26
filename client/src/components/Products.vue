<template>
  <div>
      <Cards :products="products" />
           <p class="text-center mb-0">{{currentPage}} / {{ pages }}</p>
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{disabled: prevUrl === ''}">
                <button class="page-link" @click="checkPage(prevUrl)">Previous</button>
            </li>
            <li class="page-item" :class="{disabled: nextUrl === ''}">
                <button class="page-link" @click="checkPage(nextUrl)">Next</button>
            </li>
        </ul>
  </div>
</template>

<script>
import Api from '@/config/Api'
import Cards from './Cards';

export default {
    components: {
        Cards
    },
    data() {
        return {
            products: [],
            currentPage: '',
            pages: '',
            prevUrl: '',
            nextUrl: '',
            paginationUrl: '/products/api/pagination',
        }
    },
    created() {
        Api().get(this.paginationUrl).then(response => {
            this.products = response.data.products;
            this.currentPage = response.data.currentPage;
            this.pages = response.data.pages;
            this.nextUrl = this.paginationUrl + response.data.nextUrl;
            this.prevUrl = this.paginationUrl + response.data.prevUrl;
        });
    },
    methods: {
        checkPage(url) {
            Api().get(url).then(response => {
                this.products = response.data.products;
                this.currentPage = response.data.currentPage;
                this.pages = response.data.pages;
                this.nextUrl = this.paginationUrl + response.data.nextUrl;
                this.prevUrl = this.paginationUrl + response.data.prevUrl;
            })
        }
    }
}
</script>

<style scoped>
</style>
