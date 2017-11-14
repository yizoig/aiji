
public static class Api{

  static class user{


    public static add(params,){
      request('/user/add','get',params)
    }
    public static del(params){
      request('/user/del','delete',params)
    }
      public static update(params){
      request('/user/update','post',params)
    }
  }
}
Api.user.add()
request(path){

  url = hostname+
}