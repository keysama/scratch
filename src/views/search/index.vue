<template>
    <div class="container-fluid">
        <div class="row" style="margin-top:20px">
            <div class="col-10 offset-1">
                <main class="main-wrap">
                    <div class="search_fix" >
                        <button id="btn-search-close" class="bbtn btn--search-close" aria-label="Close search_fix form"><svg class="icon icon--cross"><use xlink:href="#icon-cross"></use></svg></button>
                        <div class="search__form_fix" action="" @click.stop>
                            <input id="search-input" class="search__input_fix" name="search_fix" placeholder="" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" v-model="input" />
                            <button class="bbtn btn--search" @click="search">
                                <i class="iconfont icon-search" style="font-size:2rem"></i>
                            </button>
                            <div>
                                <div class="text-center" style="font-size:18px;color:#9d9d9d">
                                    搜索关键词或游戏id
                                </div>
                            </div>
                        </div>
                    </div><!-- /search -->
                </main>
            </div>
            <div class="col-12" style="border-top:1px solid #ececec;min-height:200px">
                <!-- <titleRow border="true">
                    <div slot="left">
                        <i class="iconfont icon-41"></i>{{keyword}}
                    </div>
                    <div slot="right"></div>
                </titleRow> -->
                <div class="playGround-rank container-fluid">
                    <multifunctionalCard v-for="(item,key) in pros" :key="key" class="item"
                    :sign="item.id"
                    slot="item"
                    :img="coverUrl+item.cover" 
                    :title="item.title" 
                    :views="item.clickNum" 
                    :good="'hide'"
                    :haveGood="$store.state.good.indexOf(item.id)>=0"
                    :userHead="userheadUrl+item.userhead" 
                    :userName="item.nickname"
                    @view="goView"
                    @share="goShare"
                    @good="goGood"
                    >
                    </multifunctionalCard> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {LOADING_START,LOADING_END} from '../../store/mutation_types.js';
import {searchPro} from '../../api/production.js';
import {coverUrl,userheadUrl} from '../../config/env.js';
import titleRow from '../../components/titleRow';
import multifunctionalCard from '../../components/multifunctionalCard.vue';
export default {
  created(){
    this.init();
  },
  data(){
    return {
        coverUrl : '',
        userheadUrl : '',
        keyword : '',
        input : '',
        pros : []
    }
  },
  methods:{
    async init(){
        this.coverUrl = coverUrl;
        this.userheadUrl = userheadUrl;
        this.keyword = this.$route.params.key;
        this.input = this.$route.params.key;
        this.$store.commit(LOADING_START)
        let res = await searchPro(this.$route.params.key);
        this.$store.commit(LOADING_END)

        if(res.data.state != 1){return};

        this.pros = res.data.body;
    },
    search(){
        this.$router.push('/search/'+this.input);
        this.init();
        document.querySelector('.search_fix').classList.remove('search--open');
        searchContainer.querySelector('.search__input_fix').blur();
    },
    goView(sign){
        this.$router.push('/play/'+sign)
    },
    goShare(){

    },
    goGood(){

    }
  },
  components:{
      multifunctionalCard,titleRow
  },
  mounted(){
	var closeCtrl = document.getElementById('btn-search-close'),
		searchContainer = document.querySelector('.search_fix'),
		inputSearch = searchContainer.querySelector('.search__input_fix');

	function init() {
		initEvents();	
	}

	function initEvents() {
		inputSearch.addEventListener('focus', openSearch);
		closeCtrl.addEventListener('click', closeSearch);
		document.addEventListener('keyup', function(ev) {
			// escape key.
			if( ev.keyCode == 27 ) {
				closeSearch();
			}
		});
	}

	function openSearch() {
		searchContainer.classList.add('search--open');
		inputSearch.focus();
	}

	function closeSearch() {
		searchContainer.classList.remove('search--open');
		inputSearch.blur();
    }
    $(document).click(closeSearch);

	init();
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/css/demo.css';
@import '../../assets/css/style2.css';
.playGround-rank{
  text-align: center;
  width: 90%;
  padding:10px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .item{
    width: 17%;
    margin-top:20px;
    display:inline-block;
    margin:0 auto;
    margin-bottom:20px;
  }
}
@media (max-width: 767px) {
  .playGround-rank{
    .item{
      width: 45%;
    }
  }
}
</style>

