export const filterPaginationData= ({create_new_arr=false,state,data,data_to_send}) =>{
    let obj;
    if(state!=null && !create_new_arr){
        obj={...state,results:[...state.results,...data],page:page}
    }else{
        obj={results:data,page:0,total:150}
    }
    return obj;
}