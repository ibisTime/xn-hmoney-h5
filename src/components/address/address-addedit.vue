<template>
  <transition name="slide">
    <div class="addr-add-edit-wrapper full-screen-wrapper">
      <div class="form-wrapper">
        <div class="form-item border-bottom-1px">
          <div class="item-label">收货人</div>
          <div class="item-input-wrapper">
            <input type="text" class="item-input" v-model="name" name="name" v-validate="'required'" placeholder="请输入姓名">
            <span v-show="errors.has('name')" class="error-tip">{{errors.first('name')}}</span>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-label">电话</div>
          <div class="item-input-wrapper">
            <input type="tel" class="item-input" v-model="mobile" name="mobile" v-validate="'required|phone'" placeholder="请输入联系方式">
            <span v-show="errors.has('mobile')" class="error-tip">{{errors.first('mobile')}}</span>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-label">地址</div>
          <div class="item-input-wrapper">
            <template v-if="code && province || !code">
              <city-picker 
                class="item-input"
                :province="province"
                :city="city"
                :district="district"
                @change="cityChange"
              >
              </city-picker>
            </template>
            <span v-show="provErr" class="error-tip">{{provErr}}</span>
          </div>
        </div>
        <div class="form-item is-textarea border-bottom-1px">
          <div class="item-label">详细地址</div>
          <div class="item-input-wrapper">
            <input v-model="address" v-validate="'required'" name="address" class="item-input" placeholder="请输入详细地址">
            <span v-show="errors.has('address')" class="error-tip">{{errors.first('address')}}</span>
          </div>
        </div>

        <div class="form-btn">
          <button :disabled="setting" @click="saveAddress">确定</button>
        </div>
        <full-loading v-show="showLoading"></full-loading>
        <toast ref="toast" :text="toastText"></toast>
      </div>
    </div>
  </transition>
</template>
<script>
  import {addAddress, editAddress, getAddressList} from 'api/user';
  import CityPicker from 'base/city-picker/city-picker';
  import FullLoading from 'base/full-loading/full-loading';
  import Toast from 'base/toast/toast';

  export default {
    data() {
      return {
        setting: false,
        name: '',
        mobile: '',
        province: '',
        city: '',
        district: '',
        provErr: '',
        address: '',
        addressErr: '',
        isDefault: '0',
        showLoading: true,
        isAlert: true,
        toastText: '',
        headerTitle: '新增收货地址',
        code: ''
      };
    },
    created() {
      this.code = this.$route.query.ressCode;
      if (this.code) {
        this.headerTitle = '修改收货地址';
      }
      this._getAddressList();
    },
    methods: {
      getAddress() {
        let index = this.addressList.findIndex((item) => {
          return item.code === this.code;
        });
        if (!~index) {
          this._getAddressList();
        } else {
          this._initPageData(this.addressList[index]);
        }
      },
      _getAddressList() {
        getAddressList().then((data) => {
          if (this.code) {
            let index = data.findIndex((item) => {
              return item.code === this.code;
            });
            if (!~index) {
              this.toastText = '地址编号错误';
              this.$refs.toast.show();
            } else {
              this._initPageData(data[index]);
            }
          } else {
            this.showLoading = false;
          }
        }).catch(() => {
          this.showLoading = false;
        });
      },
      _initPageData(addr) {
        this.showLoading = false;
        this.name = addr.addressee;
        this.mobile = addr.mobile;
        this.address = addr.detailAddress;
        this.isDefault = addr.isDefault;
        this.province = addr.province;
        this.city = addr.city;
        this.district = addr.district;
      },
      cityChange(prov, city, district) {
        this.province = prov;
        this.city = city;
        this.district = district;
      },
      saveAddress() {
        this.$validator.validateAll().then((result) => {
          if(result && this.province && this.city && this.district) {
            this.setting = true;
            let param = {
              addressee: this.name,
              mobile: this.mobile,
              province: this.province,
              city: this.city,
              district: this.district,
              detailAddress: this.address
            };
            if (this.code) {
              param.code = this.code;
              param.isDefault = this.isDefault;
              this._editAddress(param);
            } else {
              this._addAddress(param);
            }
          } else {
            if(this.result && !this.province) {
              this.toastText = '请选择省市区';
            } else {
              this.toastText = '请填写完整信息';
            }
            this.$refs.toast.show();
          }
        });
      },
      _editAddress(param) {
        if(this.errors.items.length === 0) {
          editAddress(param).then(() => {
            this.setting = false;
            this.toastText = '修改成功';
            this.$refs.toast.show();
            setTimeout(() => {
              this.$router.back();
            }, 1000);
          }).catch(() => {
            this.setting = false;
          });
        }
      },
      _addAddress(param) {
        addAddress(param).then(() => {
          this.setting = false;
          this.toastText = '新增成功';
          this.$refs.toast.show();
          setTimeout(() => {
            this.$router.back();
          }, 1000);
        }).catch(() => {
          this.setting = false;
        });
      }
    },
    components: {
      CityPicker,
      FullLoading,
      Toast
    }
  };
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import "~common/scss/variable";

  .addr-add-edit-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;;
    .form-wrapper {
      padding: 0.28rem 0.3rem;
      .form-item {
        .item.label {
          flex: 0 0 1.2rem;
        }
        .item-label {
          padding: 0;
        }
        .item-input-wrapper {
          padding-right: 0;
          height: 1.1rem;
        }
      }
      .form-btn {
        padding: 0;
        button {
          border-radius: 0.08rem;
        }
      }
    }
  }
  input::-webkit-input-placeholder,textarea::-webkit-input-placeholder {
    color: #999;
  }
</style>
