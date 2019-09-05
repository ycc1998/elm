<template>
	<div class="ratingselect">
		<div class="rating-type border-1px">
			<span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
		</div>
		<div @click="toggleContent" class="switch">
	      <span  class="icon-check_circle" :class="{'active':onlyContent==true}"></span>
	      <span class="text">只看有内容的评价</span>
	    </div>
	</div>
</template>

<script type="text/ecmascript-6">
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default{
	props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;//js的filter函数会返回一个处理后的(为true)结果的结果数组
        });
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;//js的filter函数会返回一个处理后的(为true)结果的结果数组
        });
      }
    },
	methods:{
		select(type,event){
			if (!event._constructed) {
	          return;
	        }
	        this.$emit('select', type); //传值给父组件
		},
		toggleContent(){
			if (!event._constructed) {
	          return;
	        }
			this.$emit('toggle');//传值给父组件
		}
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"

.ratingselect
	.rating-type
		padding:18px 0
		margin:0 18px
		border-1px(rgba(7, 17, 27, 0.1))
		font-size:0
		.block
			display:inline-block
			padding:8px 12px
			margin-right:8px
			border-radius:1px
			font-size:12px
			color:rgb(77,85,93)
			line-height:18px
			&.active
				color:#fff
			.count
				font-size:8px
				margin-left:2px
			&.positive
				background:rgba(0,160,220,0.2)
				&.active
					background:rgb(0,160,220)
			&.negative
				background:rgba(77,85,93,0.2)
				&.active
					background:rgb(77,85,93)
	.switch
		display: flex;
		padding:12px 18px
		color:rgb(147,153,159)
		line-height:24px
		height:24px
		border-bottom: 1px solid rgba(7, 17, 27, 0.1)
		.icon-check_circle
			font-size:24px
			margin-right:4px
			&.active
				color:rgb(0,160,220)
		.text
			font-size:12px
			
			
				
</style>