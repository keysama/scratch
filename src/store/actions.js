import {
    PUT_GOOD,
    DELETE_GOOD,
    PUT_STAR,
    DELETE_STAR,
    LOADING_START,
    LOADING_END,
    PUT_VIEW
} from './mutation_types.js';

import {
    addStar,
    addGood,
    deleteStar,
    deleteGood,
    addView
} from '../api/production.js';

import {

} from '../api/account.js';
export default {
    async [PUT_GOOD](ctx,pro) {
        ctx.commit(LOADING_START);
        let res = await addGood(pro);
        if(res.data.state == 0){
            alert(res.data.text);
        }else{
            ctx.commit(PUT_GOOD,parseInt(pro))
        }
        ctx.commit(LOADING_END)
    },
    async [DELETE_GOOD](ctx,pro) {
        ctx.commit(LOADING_START);
        let res = await deleteGood(pro);
        if(res.data.state == 0){
            alert(res.data.text);
        }else{
            ctx.commit(DELETE_GOOD,parseInt(pro));
        }
        ctx.commit(LOADING_END)
    },
    async [PUT_STAR](ctx,pro) {
        ctx.commit(LOADING_START);
        let res = await addStar(pro);
        if(res.data.state == 0){
            alert(res.data.text);
        }else{
            ctx.commit(PUT_STAR,parseInt(pro));
        }
        ctx.commit(LOADING_END)
    },
    async [DELETE_STAR](ctx,pro) {
        ctx.commit(LOADING_START);
        let res = await deleteStar(pro);
        if(res.data.state == 0){
            alert(res.data.text);
        }else{
            ctx.commit(DELETE_STAR,parseInt(pro));
        }
        ctx.commit(LOADING_END)
    },
    async [PUT_VIEW](ctx,pro){
        if(ctx.state.view.indexOf(pro)<0){
            let res = await addView(pro);
            ctx.commit(PUT_VIEW,parseInt(pro));
        }
    }
}