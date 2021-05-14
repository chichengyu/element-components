<template>
    <div ref="editor" class="editor"></div>
</template>

<script>
import E from 'wangeditor'

export default {
	name: "wangEditor",
	data:function() {
		return {
			editor:null,
		}
	},
	props:{
		value: {
			type: String,
			default: ''
		},
		height:{
			type:Number,
			default:300
		},
		isClear: {
			type: Boolean,
			default: false
		},
		disabled:{
			type: Boolean,
			default: false
		},
        customUploadImg:{
            type:Function,
            defailt:function () { return function () {};}
        },
        showLinkImg:{
            type:Boolean,
            default: true
        },
        uploadFileName:{
            type:String,
            default: 'file'
        },
        uploadImgServer:{
            type:String,
            default: ''
        },
        uploadImgMaxSize:{
            type:Number,
            default:2 * 1024 * 1024
        },
        uploadImgAccept:{
            type:Array,
            default:function () {return ['jpg', 'jpeg', 'png', 'gif', 'bmp'];}
        },
        uploadImgMaxLength:{
            type:Number,
            default:5
        },
        uploadImgParams:{
            type:Object,
            defailt:function () {return {};}
        },
        uploadImgParamsWithUrl:{
            type:Boolean,
            default: false
        },
        uploadImgHeaders:{
		  type:Object,
          defailt:function () {return {};}
        },
        uploadImgTimeout:{
		    type:Number,
            default:5 * 1000
        },
        customUploadVideo:{
            type:Function,
            defailt:function () { return function () {};}
        },
        customInsertVideo:{
            type:Function,
            defailt:function () { return function () {};}
        },
        showLinkVideo:{
            type: Boolean,
            default: true
        },
        uploadVideoServer:{
            type:String,
            default: ''
        },
        uploadVideoName:{
            type:String,
            default: 'file'
        },
        uploadVideoHeaders:{
            type:Object,
            default: function () {return {};}
        },
        uploadVideoParams:{
		  type:Object,
          defailt:function () {return {};}
        },
        uploadVideoParamsWithUrl:{
            type: Boolean,
            default: false
        },
        uploadVideoSize:{
            type:Number,
            default:1 * 1024 * 1024 * 1024
        },
        uploadVideoTimeout:{
            type:Number,
            default:1000 * 60 * 5
        },
        uploadVideoAccept:{
            type:Array,
            default:function () {return ['mp4'];}
        },
        pasteTextHandle:{
            type:Function,
            defailt:function () { return function () {};}
        },
        emotions:{
            type:Array,
            default:function () {return [];}
        },
        lineHeights:{
            type:Array,
            default:function () {return [];}
        },
        colors:{
            type:Array,
            default:function () {return [];}
        },
        fontNames:{
            type:Array,
            default:function () {return [];}
        },
        fontSizes:{
            type:Object,
            default:function () {return {};}
        },
        highlight:{
            type:Object,
            default:function () {return {};}
        },
        showFullScreen:{
			type:Boolean,
			default: true
		},
        menus:{
            type:Array,
            default:function () {return [];}
        },
        params:{
            type:Object,
            default:function () {return {};}
        },
        debug:{
			type:Boolean,
			default: false
		},
	},
	watch: {
		isClear:function(val) {
			if (val) {
				this.editor.txt.clear();
			}
		},
		value: function(value) {
			if (value !== this.editor.txt.html()) {
				this.editor.txt.html(this.value)
			}
		},
        disabled: {
            immediate:true,
            deep:true,
            handler:function(val){this.editor && this.editor.$textElem.attr('contenteditable', !val);}
        }
	},
	mounted:function() {
		this.setEditor();
		this.editor.txt.html(this.value)
	},
	methods:{
		setEditor:function() {
			//this.editor = new E(this.$refs.toolbar, this.$refs.editor);
            this.editor = new E(this.$refs.editor);
			this.editor.config.zIndex = 0;
            this.editor.config.height = this.height;
            this.editor.config.menus = this.menus.length<=0?[
                'head',
                'bold',
                'fontSize',
                'fontName',
                'italic',
                'underline',
                'strikeThrough',
                'indent',
                'lineHeight',
                'foreColor',
                'backColor',
                'link',
                'list',
                'todo',
                'justify',
                'quote',
                'emoticon',
                'image',
                'video',
                'table',
                'code',
                'splitLine',
                'undo',
                'redo',
			]:this.menus;
            this.emotions.length>0 && (this.editor.config.emotions = this.emotions);
            this.lineHeights.length>0 && (this.editor.config.lineHeights = this.lineHeights);
            this.fontNames.length>0 && (this.editor.config.fontNames = this.fontNames);
            this.colors.length>0 && (this.editor.config.colors = this.colors);
            JSON.stringify(this.fontSizes) != "{}" && (this.editor.config.fontSizes = this.fontSizes);
            JSON.stringify(this.highlight) != "{}" && (this.editor.config.highlight = this.highlight);
            this.editor.config.showFullScreen = this.showFullScreen;
            this.editor.config.uploadFileName = this.uploadFileName;
            this.editor.config.onchangeTimeout = 1;
            this.editor.config.withCredentials = true;
            this.editor.config.showLinkImg = this.showLinkImg;
            this.editor.config.uploadImgMaxLength = this.uploadImgMaxLength;
            this.editor.config.uploadImgMaxSize = this.uploadImgMaxSize;
            this.editor.config.uploadImgAccept = this.uploadImgAccept;
            this.editor.config.uploadImgParams = this.uploadImgParams;
            this.editor.config.uploadImgTimeout = this.uploadImgTimeout;
            this.editor.config.uploadImgHeaders = this.uploadImgHeaders;
            this.editor.config.uploadImgParamsWithUrl = this.uploadImgParamsWithUrl;
			if (this.uploadImgServer !== '') {
                this.editor.config.uploadImgServer = this.uploadImgServer;
			}else {
                this.editor.config.uploadImgShowBase64 = true;
			}
            var _this = this;
			this.editor.config.uploadImgHooks = {
                before: function(xhr){
                    return _this.$emit('before', xhr,{prevent:true,msg:'需要提示给用户的错误信息'},_this.editor,_this.$refs.editor);
                },
				fail: function(xhr, editor, result){
                    _this.$emit('fail', xhr, editor, result,_this.params,_this.editor,_this.$refs.editor);
				},
				success: function(xhr){
                    _this.$emit('success', xhr,_this.params,_this.editor,_this.$refs.editor);
				},
				timeout: function(xhr){
                    _this.$emit('timeout', xhr,_this.params,_this.editor,_this.$refs.editor);
				},
				error: function(xhr, editor,result){
                    _this.$emit('error', xhr, editor,result,_this.params,_this.editor,_this.$refs.editor);
				},
                customInsert: function(insertImg, result){
                    _this.$emit('customInsert', insertImg, result,_this.params,_this.editor,_this.$refs.editor);
                }
			};
            if (this.customUploadImg){
                this.editor.config.customUploadImg = function (resultFiles, insertImgFn) {
                    _this.customUploadImg(insertImgFn, resultFiles,_this.params,_this.editor,_this.$refs.editor);
                }
            }
            this.editor.config.withVideoCredentials = true;
            this.editor.config.showLinkVideo = this.showLinkVideo;
            this.editor.config.uploadVideoName = this.uploadVideoName;
            this.editor.config.uploadVideoParams = this.uploadVideoParams;
            this.editor.config.uploadVideoAccept = this.uploadVideoAccept;
            this.editor.config.uploadVideoMaxSize = this.uploadVideoSize;
            this.editor.config.uploadVideoHeaders = this.uploadVideoHeaders;
            this.editor.config.uploadVideoTimeout =  this.uploadVideoTimeout;
            this.editor.config.uploadVideoParamsWithUrl = this.uploadVideoParamsWithUrl;
            if (this.uploadVideoServer !== '') {
                this.editor.config.uploadVideoServer = this.uploadVideoServer;
            }
            this.editor.config.uploadVideoHooks = {
                before: function(xhr){
                    return _this.$emit('beforeVideo', xhr,{prevent:true,msg:'需要提示给用户的错误信息'},_this.params,_this.editor,_this.$refs.editor);
                },
                fail: function(xhr, editor, result){
                    _this.$emit('failVideo', xhr, editor, result,_this.params,_this.editor,_this.$refs.editor);
                },
                success: function(xhr){
                    _this.$emit('successVideo', xhr,_this.params,_this.editor,_this.$refs.editor);
                },
                timeout: function(xhr){
                    _this.$emit('timeoutVideo', xhr,_this.params,_this.editor,_this.$refs.editor);
                },
                error: function(xhr, editor, result){
                    _this.$emit('errorVideo', xhr, editor,result,_this.params,_this.editor,_this.$refs.editor);
                },
                customInsert: function(insertVideoFn, result){
                    _this.$emit('customInsertVideo', insertVideoFn, result,_this.params,_this.editor,_this.$refs.editor);
                }
            };
            if (this.customUploadVideo){
                this.editor.config.customUploadVideo = function (resultFiles, insertVideoFn) {
                    _this.customUploadVideo(insertVideoFn, resultFiles,_this.params,_this.editor,_this.$refs.editor);
                }
            }
            if (this.customInsertVideo){
                this.editor.config.customInsertVideo = function (resultFiles, insertVideoFn) {
                    _this.customInsertVideo(insertVideoFn, resultFiles,_this.params,_this.editor,_this.$refs.editor);
                }
            }
            if (this.pasteTextHandle){
                this.editor.config.pasteTextHandle = function (pasteStr) {
                    _this.pasteTextHandle(pasteStr,_this.params,_this.editor,_this.$refs.editor);
                }
            }
			this.editor.config.onchange = function(html){
                _this.$emit('change',html,_this.params,_this.editor,_this.$refs.editor);
			}
			if (this.debug){
				this.editor.config.debug = location.href.indexOf('wangeditor_debug_mode=1');
			}
            this.editor && this.editor.create();
            this.editor && this.editor.$textElem.attr('contenteditable', !this.disabled);
		}
	}
}
</script>

<style lang="css" scoped>

</style>