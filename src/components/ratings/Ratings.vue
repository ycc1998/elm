<template>
	<div class="ratings" ref="ratingsed">
		<div class="ratings-item">
			<div class="pingfen">
				<div class="pingfen-left">
					<h1 class="score">{{seller.score}}</h1>
					<span class="text">综合评分</span>
					<span class="rank-rate">高于周边商家{{seller.rankRate}}%</span>
				</div>
				<div class="pingfen-right">
					<div class="service-score">
						<span class="block">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score-num">3.9</span>
					</div>
					<div class="food-score">
						<span class="block">食品质量</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score-num">4.0</span>
					</div>
					<div class="delivery-time">
						<span class="block">送达时间</span>
						<span class="time">44分钟</span>
					</div>				
				</div>
				
			</div>
			<split></split>
			<div class="rating">
	  			<ratingselect @select="select" @toggle="toggle" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
	  			<div class="rating-wrapper">
	  				<ul v-show="ratings && ratings.length">
	  					<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item border-1px">
	  						<img class="avatar" :src="rating.avatar" width="28p" height="28" />
	  						<div class="user-time">
	  							<span class="username">{{rating.username}}</span>
	  							<span class="time">{{format(rating.rateTime)}}</span>
	  						</div>
	  						<div class="score">
	  							<star :size="24" :score="rating.score"></star>
	  							<span class="delivery-time">{{rating.deliveryTime}}分钟送达</span>
	  						</div>
	  						<span class="text">{{rating.text}}</span>
	  						<div class="recommend">
	  							<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
	  							<ul class="recommend-list">
	  								<li class="item" v-for="rec in rating.recommend">{{rec}}</li>
	  							</ul>
	  						</div>  						

	  					</li>
	  				</ul>
	  				<div class="no-rating" v-show="!ratings || !ratings.length">暂无评价</div>
	  			</div>
	  		</div>
		</div>
	
	</div>
</template>

<script type="text/ecmascript-6">
 import axios from 'axios'
import BScroll from '@better-scroll/core'
import Vue from 'vue'
import star from '../star/star'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import moment from 'moment'

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

	export default{
		props: {
			seller: {
				type: Object
			}
		},
		created() {			
	      axios.get('/api/ratings').then((res) => {
	        var data = res.data;
	        if (data.errno == 0) {
	          this.ratings = data.data
	          this.$nextTick(() => {
			      	if (!this.scroll) {
				        this.scroll = new BScroll(this.$refs.ratingsed, {
		              click: true
		            });
			        } else {
		            this.scroll.refresh();
		          }
			      });
	        }	        
	      });
	    },
		data () {
			return {
				showFlag:false,
				selectType:ALL,
				onlyContent:true,
				desc:{
					all:'全部',
					positive:'推荐',
					negative:'吐槽'
				},
				ratings:[]
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
		},
		components:{
			star,
			split,
			ratingselect
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"

.ratings
	position: absolute
	top: 174px
	bottom: 0
	left: 0
	width: 100%
	overflow: hidden
	.ratings-item
		position: relative
		bottom:0
		left:0
		overflow: hidden
		.pingfen
			display: flex
			flex-direction: row
			padding:18px 24px
			
			.pingfen-left
				display: flex
				flex-direction: column
				text-align: center
				width:137.5px
				border-right: 1px solid rgb(147,153,159)
				.score
					font-size:24px
					color:rgb(255,153,0)
					line-height:28px
					padding-bottom:6px
				.text
					font-size:12px
					color:rgb(7,17,27)
					line-height:12px
					padding-bottom:8px
				.rank-rate
					font-size:10px
					color:rgb(147,153,159)
					line-height:10px
					padding-bottom:10px
			.pingfen-right
				padding-left:24px
				width:237px
				.service-score,.food-score
					padding-bottom:8px
					display:flex
				.score-num
					padding-left:12px
					font-size:12px
					color:rgb(255,153,0)
					line-height:18px
				.block
					font-size:12px
					color:rgb(7,17,27)
					line-height:18px
					padding-right:12px
				.time
					font-size:12px
					color:rgb(147,153,159)
					line-height:18px
		
		.rating-item
			border-bottom: 1px solid rgb(147,153,159)
			margin:18px 18px 0 18px
			padding-bottom: 18px
			padding-left:40px
			position: relative
			
			.avatar
				position: absolute
				top: 0
				left: 0
				border-radius: 50%
			.user-time
				display: flex
				justify-content: space-between
				font-size:10px
				line-height:12px
				padding-bottom:4px
				.username
					color:rgb(7,17,27)
				.time
					color:rgb(147,153,159)
			.score
				display: flex
				padding-bottom:6px
				.delivery-time
					padding-left:6px
					font-size:10px
					font-weight:200
					color:rgb(147,153,159)
					line-height:12px
			.text
				font-size:12px
				color:rgb(7,17,27)
				line-height:18px
			.recommend
				padding-top:8px
				display: flex
				.icon-thumb_up
					color:rgb(0,160,220)
				.icon-thumb_down
					color:rgb(147,153,159)
				.recommend-list
					padding-left:8px
					display: flex
					flex-wrap: wrap
					.item
						padding:0 6px
						border: 1px solid rgba(7,17,27,0.1)
						margin-left:8px
						margin-bottom:6px
						border-radius:2px
						background-color:rgb(255,255,255)
						font-size:9px
						color:rgb(147,153,159)
						line-height:16px
			
	
		


</style>