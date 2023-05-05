const APIEndPoints = {
  GetAllUser: {
    url: '/api/Home/GetAllUser',
    method: 'get',
    methodname: 'GetAllUser',
  },
  GetUserById: {
    url: '/api/Home/GetUserById',
    method: 'get',
    methodname: 'GetUserById',
  },
  GetAllQuizList: {
    url: '/api/Home/GetAllQuizList',
    method: 'get',
    methodname: 'GetAllQuizList',
  },
  GetByIdQuizList: {
    url: '/api/Home/GetByIdQuizList',
    method: 'get',
    methodname: 'GetByIdQuizList',
  },
  InsertQuizList: {
    url: '/api/Home/InsertQuizList',
    method: 'post',
    methodname: 'InsertQuizList',
  },
  UpdateByIdQuizList: {
    url: '/api/Home/UpdateByIdQuizList',
    method: 'patch',
    methodname: 'UpdateByIdQuizList',
  },
  DeleteByIdQuizList: {
    url: '/api/Home/DeleteByIdQuizList',
    method: 'delete',
    methodname: 'DeleteByIdQuizList',
  },
}

export default APIEndPoints
