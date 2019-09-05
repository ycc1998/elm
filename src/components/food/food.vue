<template>
	<transition name="move">
	  <div v-show="showFlag" class="food" ref="food">
	  	<div class="food-content">
	  		<div class="image-header">
	  			<img :src="food.image">
	  			<div class="back" @click="hide">
	  				<i class="icon-arrow_lift"></i>
	  			</div>
	  		</div>
	  		<div class="content">
	  			<h1 class="title">{{food.name}}</h1>
	  			<div class="detail">
	  				<span class="sell-count">月售{{food.sellCount}}份</span>
	  				<span class="rating">好评率{{food.rating}}%</span>
	  			</div>
	  			<div class="price">
	  				<span class="now">￥{{food.price}}</span>
	  				<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
	  			</div>
	  			<div class="cartcontrol-wrapper">
		  			<cartcontrol :food="food" />
		  		</div>
		  		<transition name="fade">
		  			<div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst" >加入购物车</div>
		  		</transition>
	  		</div>
	  		<split v-show="food.info"></split>
	  		<div class="info" v-show="food.info">
	  			<h1 class="title">商品介绍</h1>
	  			<p class="text">{{food.info}}</p>
	  		</div>
	  		<split></split>
	  		<div class="rating">
	  			<h1 class="title">商品评价</h1>
	  			<ratingselect @select="select" @toggle="toggle" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
	  			<div class="rating-wrapper">
	  				<ul v-show="food.ratings && food.ratings.length">
	  					<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
	  						<div class="username">
	  							<span class="time">{{format(rating.rateTime)}}</span>
	  							<span class="user">
	  								<span class="user-name">{{rating.username}}</span>
	  								<img class="avatar" :src="rating.avatar" width="12" height="12">
	  							</span>
	  						</div>
	  						<div class="rating-info">
	  							<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
	  							<span class="rating-text">{{rating.text}}</span>
	  						</div>

	  					</li>
	  				</ul>
	  				<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
	  			</div>
	  		</div>
	  		
	  	</div>
	  </div>  
	 </transition>

</template>

<script type="text/ecmascript-6">
import BScroll from '@better-scroll/core'
import Vue from 'vue'
import cartcontrol from '../cartcontrol/cartcontrol'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import moment from 'moment';
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
	data () {
		return {
			showFlag:false,
			selectType:ALL,
			onlyContent:true,
			desc:{
				all:'全部',
				positive:'推荐',
				negative:'吐槽'
			}
		}
	},
	props:{
		food: {
			type: Object,
			default(){
				ratings:[]
			}
		}
	},

	methods:{
		format(time){
			return moment(time).format('YYYY-MM-DD HH:mm:ss');
		},
		needShow(type,text){
			if (this.onlyContent && !text) {
				return false;
			}
			if (this.selectType == ALL) {
				return true;
			}
			return type === this.selectType;			
		},
		select(type){
			this.selectType = type
			this.$nextTick(() => {
				this.scroll.refresh();
			});
		},
		toggle(){
			this.onlyContent = !this.onlyContent
			this.$nextTick(() => {
				this.scroll.refresh();
			});
		},

		show(){
			this.showFlag = true
			this.selectType = ALL
			this.onlyContent = true
			this.$nextTick(() => {
	      	if (!this.scroll) {
		        this.scroll = new BScroll(this.$refs.food, {
		              click: true
		            });
	        } else {
		            this.scroll.refresh();
		          }
	        });
		},
		hide(){
			this.showFlag = false
		},
		addFirst(event){
			if (!event._constructed) {
	          return;
	        }
			if (!this.food.count) {
	          Vue.set(this.food, 'count', 1);
	        } else {
	          this.food.count++;
	        }			
		}
	},
	components:{
		cartcontrol,
		split,
		ratingselect
	}

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.food
	position:fixed
	left:0
	top:0
	bottom:48px
	z-index:30
	background:#fff
	width:100%
	transform: translate3d(0, 0, 0)
	&.move-enter-active, &.move-leave-active
		transition: all 0.2s linear 
	&.move-enter, &.move-leave-active
		transform: translate3d(100%, 0, 0)
	.image-header
		position: relative
		height: 0
		width: 100%
		padding-top: 100%
		img
			position:absolute
			top:0
			width:100%
			height:100%
		.back
			position: absolute
			top: 10px
			left: 0
			.icon-arrow_lift
				display: block
				padding: 10px
				font-size: 20px
				color: #fff
	.content
		position: relative;
		padding:18px
		.title
			line-height:14px
			margin-bottom:8px
			font-size:14px
			font-weight:700
			color:rgb(7,17,27)
		.detail
			margin-bottom:18px
			line-height:10px
			height:10px
			font-size:0
			.sell-count,.rating
				font-size:10px
				color:rgb(147,153,159)
			.sell-count
				margin-right:12px
		.price
			font-weight: 700
			line-height: 24px
		.now
			margin-right: 8px
			font-size: 14px
			color: rgb(240, 20, 20)
		.old
			text-decoration: line-through
			font-size: 10px
			color: rgb(147, 153, 159)
		.cartcontrol-wrapper
			position:absolute
			right:12px
			bottom:12px
		.buy
			position:absolute
			right:18px
			bottom:18px
			z-index:10
			height:24px
			line-height:24px
			padding:0 12px
			box-sizing:border-box
			font-size:10px
			border-radius:12px
			background:rgb(0,160,220)
			color:#fff
		.fade-enter-active, .fade-leave-active
			transition: all 0.2s
		.fade-enter, .fade-leave-active
			opacity: 0
	.info
		padding:18px
		.title
			font-size:14px
			color:rgb(7,17,27)
			font-weight:700
			line-height:14px
		.text
			padding:6px 8px
			font-size:12px
			font-weight:200
			color:rgb(77,85,93)
			line-height:24px
	.rating
		padding-top:18px
		.title
			font-size:14px
			color:rgb(7,17,27)
			font-weight:700
			line-height:14px
			padding-left:18px
		.rating-wrapper
			padding:0 18px
			.rating-item
				padding:16px 0
				border-1px(rgba(7, 17, 27, 0.1))
				.username
					display: flex
					justify-content: space-between
					padding-bottom:6px
					font-size:10px
					color:rgb(147,153,159)
					line-height:12px
					.user
						display: flex
						.user-name
							padding-right:6px
						.avatar
							border-radius:50%
				.rating-info
					font-size:12px
					line-height:24px
					.icon-thumb_up
						color:rgb(0,160,220)
					.icon-thumb_down
						color:rgb(147,153,159)
					.rating-text
						color:rgb(7,17,27)
						line-height:16px
						padding-left:4px
			.no-rating
				padding: 16px 0
				font-size: 12px
				color: rgb(147, 153, 159)







</style>