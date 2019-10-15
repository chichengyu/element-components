<template>
    <div class="editor">
        <div ref="toolbar" class="toolbar">
        </div>
        <div ref="editor" class="text" :style="style">
        </div>
    </div>
</template>

<script>
import E from 'wangeditor'

export default {
	name: "wangEditor",
	data () {
		return {
			editor:null,
			content:'',
			style:{
				height: this.height+'px'
			}
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
		isClear(val) {
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
	mounted () {
		this.setEditor();
		this.editor.txt.html(this.value)
	},
	methods:{
		setEditor () {
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
			this.editor.customConfig.uploadImgHooks = {
				fail: (xhr, editor, result) => {

				},
				success: (xhr, editor, result) => {

				},
				timeout: (xhr, editor) => {

				},
				error: (xhr, editor) => {

				},
				customInsert: (insertImg, result, editor) => {
					if (result.data && result.data.length) {
						for (let i = 0; i < result.data.length; i++) {
							var url = result.data[i].ivew_path;
							insertImg(url);
						}
					}else {
						insertImg(result.ivew_path);
					}
				}
			};
			this.editor.customConfig.onchange = (html) => {
				this.content = html;
				this.$emit('change', this.content)
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