<template>
  <div class="file-list">
    <van-button type="primary" @click="chooseFile">选择文件</van-button>
    <div class="input-lists" ref="input">
      <input type="file" class="file" multiple hidden>
    </div>
    <ul class="file-lists">
        <li class="file-list" v-for="(item,index) in fileList">
          <span>{{item.name}}</span>
          <van-icon name="cross"  @click="deleteFile(index)"></van-icon>
        </li>
        <li class="file-list" v-for="(item,index) in existFile" :key="item.id">
          <span>{{item.attName}}</span>
          <van-icon name="cross"  @click="deleteExistFile(item.id,index)"></van-icon>
        </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                fileList: [],
            }
        },
        props: {
            attList: {
                type: Array,
                default: ()=>[]
            }
        },
        computed: {
            existFile() {
                return this.attList
            },
            fileLength() {
                return this.fileList.length + this.attList.length;
            }
        },
        methods: {
            init() {
                this.fileList = [];
            },
            chooseFile() {
                // console.log(this.$refs.input);
                var inputBox = this.$refs.input;
                inputBox.lastElementChild.click();
            },
            deleteFile(index) {
                this.fileList.splice(index, 1)
            },
            getFileList() {
                return {
                    fileList: this.fileList,
                    attId: this.existFile
                }
            },
            deleteExistFile(id, index) {
                this.existFile.splice(index, 1)
            }
        },
        created() {
            // console.log(this.attList );
        },
        mounted() {
            var self = this;
            document.addEventListener('change', function (e) {
                if (e.target.className === 'file') { //是选择文件的触发了change;
                    console.log(e);
                    var file = e.target.files;
                    for (let i = 0; i < file.length; i++) {
                        self.fileList.push(file[i])
                    }
                    let newInput = document.createElement('input');
                    newInput.type = 'file';
                    newInput.hidden = true;
                    newInput.className = 'file';
                    newInput.multiple = 'multiple';
                    self.$refs.input.appendChild(newInput);
                } else {

                }
            })
        }
    }
</script>
<style scoped lang="scss">
  .file-list {
    .file-lists {
      max-height: 200px;
      /*overflow: auto;*/
      .file-list {
        padding: 3px 5px;
        border-radius: 3px;
        transition: all .2s ease;
        line-height: normal;
        cursor: default;

        &:hover {
          background: #f1f1f1;

          i {
            background: #d1d1d1;
          }
        }

        i {
          float: right;
          border-radius: 50%;
          cursor: pointer;
          margin-top: 3px;
          margin-right: 10px;
        }
      }
    }
  }

  .over {
    height: 200px!important;
  }

  .contain {
    min-height: 30px;
  }
</style>
