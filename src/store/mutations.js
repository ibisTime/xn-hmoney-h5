import * as types from './mutation-types';
import User from 'common/bean/user';

const mutations = {
  [types.MARKET_NOTICE](state) {
    state.isUpdateMarket = !state.isUpdateMarket;
  },
  [types.SIMUORDER_NOTICE](state) {
    state.isUpdateSimuorder = !state.isUpdateSimuorder;
  },
  [types.ACCOUNT_NOTICE](state) {
    state.isUpdateAccount = !state.isUpdateAccount;
  },
  [types.HANDICAP_NOTICE](state) {
    state.isUpdateHandicap = !state.isUpdateHandicap;
  },
  [types.SIMUORDERDETAIL_NOTICE](state) {
    state.isUpdateSimuorderdetail = !state.isUpdateSimuorderdetail;
  }
};

export default mutations;
