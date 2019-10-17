<template>
    <div class="editor" style="background-color:#fff;">
        <div ref="toolbar" class="toolbar">
        </div>
        <div ref="editor" class="text" :style="{height:height+'px'}">
        </div>
    </div>
</template>

<script>
import E from 'wangeditor'

export default {
	name: "wangEditor",
	data:function() {
		return {
			editor:null,
			content:''
		}
	},
	props:{
		uploadUrl:{
			type:String,
			default: ''
		},
		value: {
			type: String,
			default: ''
		},
		height:{
			type:Number,
			default:200
		},
		isClear: {
			type: Boolean,
			default: false
		},
		isdisable:{
			type: Boolean,
			default: true
		},
        headers:{
		  type:Object,
          defailt:function () {return {};}
        },
		debug:{
			type:Boolean,
			default: false
		}
	},
	watch: {
		isClear:function(val) {
			if (val) {
				this.editor.txt.clear();
				this.content = null;
			}
		},
		value: function(value) {
			if (value !== this.editor.txt.html()) {
				this.editor.txt.html(this.value)
			}
		}
	},
	mounted:function() {
		this.setEditor();
		this.editor.txt.html(this.value)
	},
	methods:{
		setEditor:function() {
			this.editor = new E(this.$refs.toolbar, this.$refs.editor);
			this.editor.customConfig.zIndex = 0;
			this.editor.customConfig.uploadFileName = 'file';
			this.editor.customConfig.onchangeTimeout = 1;
			this.editor.customConfig.uploadImgMaxLength = 5;
			this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024;
			this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000;
			this.editor.customConfig.uploadImgHeaders  = this.headers;
			this.editor.customConfig.menus = [
				'head',
				'bold',
				'fontSize',
				'fontName',
				'italic',
				'underline',
				'strikeThrough',
				'foreColor',
				'backColor',
				'link',
				'list',
				'justify',
				'quote',
				'emoticon',
				'image',
				'table',
				'video',
				'code',
				'undo',
				'redo',
				'fullscreen'
			];

			if (this.uploadUrl !== '') {
				this.editor.customConfig.uploadImgServer = this.uploadUrl;
			}else {
				this.editor.customConfig.uploadImgShowBase64 = true;
			}
            var _this = this;
			this.editor.customConfig.uploadImgHooks = {
				fail: function(xhr, editor, result){
                    _this.$emit('fail', xhr, editor, result);
				},
				success: function(xhr, editor, result){
                    _this.$emit('success', xhr, editor, result);
				},
				timeout: function(xhr, editor){
                    _this.$emit('timeout', xhr, editor);
				},
				error: function(xhr, editor){
                    _this.$emit('error', xhr, editor);
				},
				customInsert: function(insertImg, result, editor){
					if (result.data && result.data.length) {
						for (var i = 0; i < result.data.length; i++) {
							var url = result.data[i].ivew_path;
							insertImg(url);
						}
					}else {
						insertImg(result.ivew_path);
					}
				}
			};
			this.editor.customConfig.onchange = function(html){
                _this.content = html;
                _this.$emit('change', _this.content);
			}
			if (this.debug){
				this.editor.customConfig.debug = location.href.indexOf('wangeditor_debug_mode=1');
			}
			this.editor.create();
			this.editor.$textElem.attr('contenteditable', this.isdisable);
		}
	}
}
</script>

<style lang="css" scoped>
.editor {
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 0;
}
.toolbar {
    flex-wrap: wrap;
    border: 1px solid #ccc;
}
.text {
    border: 1px solid #ccc;
}
</style>