<template>
	<div>
		<div class="seller" ref="seller">
			<div class="content">
				<div class="seller-info">
					<div class="top border-1px">
						<div class="left">
							<h1 class="title">{{seller.name}}</h1>
							<span class="order">
								<star :size="36" :score="seller.score"></star>
								<span class="num">({{seller.ratingCount}})</span>
								<span class="order-num">月售{{seller.sellCount}}单</span>
							</span>
						</div>
						<div class="right">
							<span class="icon-favorite"></span>
							<span class="text">收藏</span>
						</div>
					</div>
					<div class="bottom">
						<ul class="remark">
		          <li class="block">
		            <h2>起送价</h2>
		            <div class="content">
		              <span class="stress">{{seller.minPrice}}</span>元
		            </div>
		          </li>
		          <li class="block">
		            <h2>商家配送</h2>
		            <div class="content">
		              <span class="stress">{{seller.deliveryPrice}}</span>元
		            </div>
		          </li>
		          <li class="block">
		            <h2>平均配送时间</h2>
		            <div class="content">
		              <span class="stress">{{seller.deliveryTime}}</span>分钟
		            </div>
		          </li>
		        </ul>
					</div>
				</div>

				<split></split>

				<div class="bulletin">
					<h1 class="title">公告活动</h1>
					<span class="content">{{seller.bulletin}}</span>
					<ul v-if="seller.supports" class="supports">
	          <li class="support-item border-1px" v-for="(item,index) in seller.supports">
	            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
	            <span class="text">{{seller.supports[index].description}}</span>
	          </li>
	        </ul>
				</div>

				<split></split>

				<div class="pics">
					<h1 class="title">商家实景</h1>

					<!--<div class="pic-wrapper" ref="picWrapper">
	          <ul class="pic-list" ref="picList">
	            <li class="pic-item" v-for="pic in seller.pics">
	              <img :src="pic" width="120" height="90">
	            </li>
	          </ul>
	        </div>-->

	        <div class="scroll-wrapper" ref="picWrapper">
			      <div class="scroll-content">
			        <div class="scroll-item" v-for="pic in seller.pics"><img :src="pic" width="120" height="90"></div>
			      </div>
			    </div>

				</div>

				<split></split>
	      <div class="info">
	        <h1 class="title">商家信息</h1>
	        <ul>
	          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
	        </ul>
	      </div>
	      

			</div>
		</div>
		<shopcart class="bottom-food" ref="shopcart" :selectFoods="selectFoods"  :deliveryPrice="seller.deliveryPrice"
                :minPrice="seller.minPrice"></shopcart>
	</div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star'
import split from '../split/split'
import BScroll from '@better-scroll/core'
import shopcart from '../shopcart/shopcart'

import Bus  from '@/common/js/eventBus.js'

	export default{
		props: {
      seller: {
        type: Object
      }
    },
    data(){
    	return {
    		selectFoods:[]
    	}
    },
    //html加载完成之前执行
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    //html加载完成后执行
    mounted(){
			Bus.$on('foods', (data) => {
	      this.selectFoods = data		        
	    })
    },
		methods:{
			_initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
          this.scroll = new BScroll(this.$refs.picWrapper, {
          	scrollX: true,
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
		},
		watch: {
      'seller'() {
        this.$nextTick(() => {
          this._initScroll();
        });
      }
    },
		components:{
			star,
			split,
			shopcart
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.seller
	position: absolute
	top: 174px
	bottom: 0
	left: 0
	width: 100%
	overflow: hidden
	.content
		position: relative
		bottom:0
		left:0
		overflow: hidden
		.seller-info
			padding: 18px
			font-size:10px
			.top
				padding-bottom:18px
				display:flex
				justify-content: space-between
				align-items: center
				border-1px(rgba(7,17,27,0.1))
				.left
					flex:1
					.title
						font-size:14px
						color:rgb(7,17,27)
						line-height:14px
						padding-bottom:8px
					.order
						display:flex
						color:rgb(77,85,93)
						line-height:18px
						.num
							padding-left:8px
							padding-right:14px
							
				.right
					display: flex
					flex-direction: column
					align-items: center
					.icon-favorite
						font-size:24px
						color:rgb(240,20,20)
						line-height:24px
						padding-bottom:4px
					.text
						color:rgb(77,85,93)
						line-height:10px
			.bottom
				padding-top:18px
				.remark
					display:flex
					justify-content:space-around
					.block
						flex: 1
						text-align: center
						border-right: 1px solid rgba(7,17,27,0.1)
						&:last-child
							border: none
						h2
							color:rgb(147,153,159)
							line-height:10px
							padding-bottom:4px
						.content
							font-weight:200
							color:rgb(7,17,27)
							line-height:10px
							.stress
								font-size:24px
								line-height:24px
		.bulletin
			padding: 18px 18px 0 18px
			.title
				font-size:14px
				color:rgb(7,17,27)
				line-height:14px
				padding-bottom:8px
			.content
				padding: 8px 12px 16px 12px
				display: block
				font-size:12px
				font-weight:200
				color:rgb(240,20,20)
				line-height:24px
			.support-item
				padding:16px 12px 16px 12px
				border-top:1px solid rgba(7,17,27,0.1)
				.icon
					padding-right:6px
					display: inline-block
					vertical-align: top
					width: 16px
					height: 16px
					background-size: 16px 16px
					background-repeat: no-repeat
					&.decrease
						bg-image('decrease_4')
					&.discount
						bg-image('discount_4')
					&.guarantee
						bg-image('guarantee_4')
					&.invoice
						bg-image('invoice_4')
					&.special
						bg-image('special_4')
				.text
					font-size:12px
					font-weight:200
					color:rgb(7,17,27)
					line-height:16px
		.pics
			padding:18px
			.title
				font-size:14px
				color:rgb(7,17,27)
				line-height:14px
				padding-bottom:12px
			.scroll-wrapper
				width 100%
				white-space nowrap
				overflow hidden
				.scroll-content
					display inline-block
				.scroll-item
					display:inline-block
					padding-right:6px
		.info
			padding:18px 18px 46px 18px
			.title
				font-size:14px
				color:rgb(7,17,27)
				line-height:14px
				padding-bottom:12px
			.info-item
				padding:16px 12px
				border-top:1px solid rgba(7,17,27,0.1)
				font-size:12px
				font-weight:200
				color:rgb(7,17,27)
				line-height:16px
.bottom-food
	position: fixed
	bottom: 0
	left: 0
				
			
						

						
		
</style>